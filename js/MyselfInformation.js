$(document.body).ready(function () {
    let nowform;
    function toOpation(){
        $('#OpationInformation>ul>li:first-child').removeClass('active');
        $('#OpationInformation>ul>li:nth-child(2)').addClass('active');
        for (let i=0;i<$('input').length;i++){
            if (document.getElementsByTagName('input')[i].name=='mail'){
                continue;
            }
            document.getElementsByTagName('input')[i].style.border='1px solid #c0c0c0';
        }
        document.getElementsByTagName('textarea')[0].style.border='1px solid #c0c0c0';
        $('#PutInformation')[0].style.display='block';
    }

    $('.Mybody>div')[0].style.height="900px";
    $('#HeadImg>div')[0].style.left="0px";
    $('#HeadImg>div')[0].style.opacity="1";
    $('#HeadImg>div')[1].style.left="0px";
    $('#HeadImg>div')[1].style.opacity="1";
    for (let i=1;i<$('.Mybody>div>div').length;i++){
        $('.Mybody>div>div')[i].style.left="0px";
        $('.Mybody>div>div')[i].style.opacity="1";
    }

    $('input').click(function () {
        if (event.target.name=='mail'){
            alert('本项不允许修改');
            console.log(event);
        }else {
            toOpation();
        }

    })
    $('textarea').click(function () {
        toOpation();
    })
    $('#OpationInformation>ul>li:last-child').click(function () {
        toOpation();
    })
    $('#HeadImg>div:last-child').click(function () {
        if (nowform){
            $('body')[0].removeChild(nowform);
        }
        toOpation();
        let form=document.createElement('form');
        let input=document.createElement('input');
        input.type="file";
        form.appendChild(input);
        form.style.display='none';
        $('body')[0].appendChild(form);
        form.addEventListener('change',function () {
            function checkFileExt(ext) {
                if (!ext.match(/.jpg|.gif|.png|.bmp/i)) {
                    return false;
                }
                return true;
            }
            var filePath = input.value;
            var fileExt = filePath.substring(filePath.lastIndexOf("."))
                .toLowerCase();

            if (!checkFileExt(fileExt)) {
                alert("您上传的文件不是图片,请重新上传！");
                $('#HeadImg>div>img')[0].src = "";
                return;
            }else {

                $('#HeadImg>div>img').attr("src",URL.createObjectURL($(this)[0].lastChild.files[0]));
            }
        })
        input.click();
        nowform=form;

    })

    $.ajax({
        type: 'POST',
        url: Path+"/user/getUserInfo",
        dataType: 'json',
        async: true,
        data: {
        },
        //阻止深度序列化，向后台传送数组
        traditional: true,
        success: function (result) {
            $.ajax({
                type: 'GET',
                url: Path+"/authUserInfo/get",
                dataType: 'json',
                async: true,
                data: {
                    userId:result.data.userId
                },
                //阻止深度序列化，向后台传送数组
                traditional: true,
                success: function (result2) {
                    if (result2.data){
                        document.getElementsByName('nickName')[0].value=result2.data.nickName;
                        document.getElementsByName('phone')[0].value=result2.data.phone;
                        document.getElementsByName('profile')[0].value=result2.data.profile;
                        document.getElementsByName('mail')[0].value=result.data.userEmail;
                        document.getElementById('HeadImg').getElementsByTagName('img')[0].src='http://47.106.247.251:8003/admin/authUserInfo/getImage?url='+encodeURIComponent(result2.data.headPicture)

                    } else {
                        document.getElementsByName('mail')[0].value=result.data.userEmail;
                        alert('您的信息未填写，将进入信息填写页');
                        toOpation();
                    }

                }
            })
            $('#PutInformation').click(function () {
                let information={
                    headPicture:'',
                    id:result.data.userId,
                    nickName:document.getElementsByName('nickName')[0].value,
                    phone:document.getElementsByName('phone')[0].value,
                    profile:document.getElementsByName('profile')[0].value,
                }
                if (document.getElementsByTagName('form')[0]){
                    let formData=new FormData;
                    formData.append('file',document.getElementsByTagName('form')[0].firstElementChild.files[0]);
                    $.ajax({
                        type: 'POST',
                        url: Path+"/authUserInfo/uploadImg",
                        dataType: 'json',
                        async:true,
                        contentType:false,
                        processData:false,
                        data:formData,
                        //阻止深度序列化，向后台传送数组
                        traditional: true,
                        success: function (result) {
                            alert('图片上传成功');
                            console.log(result);
                            information.headPicture=result;
                            $.ajax({
                                type: 'PUT',
                                url: Path+"/authUserInfo/saveOrUpdate",
                                dataType: 'json',
                                async: true,
                                contentType:'application/json',
                                data: JSON.stringify(information),
                                //阻止深度序列化，向后台传送数组
                                traditional: true,
                                success: function (result2) {

                                    alert('保存成功');
                                    location.href='MyselfInformation.html';

                                }
                            })

                        },
                        error:function (result) {
                            console.log(result);
                            information.headPicture=result.responseText;
                            $.ajax({
                                type: 'PUT',
                                url: Path+"/authUserInfo/saveOrUpdate",
                                dataType: 'json',
                                async: true,
                                contentType:'application/json',
                                data: JSON.stringify(information),
                                //阻止深度序列化，向后台传送数组
                                traditional: true,
                                success: function (result2) {

                                    alert('保存成功');
                                    // location.href='MyselfInformation.html';

                                }
                            })
                        }
                    })
                } else {
                    $.ajax({
                        type: 'PUT',
                        url: Path+"/authUserInfo/saveOrUpdate",
                        dataType: 'json',
                        async: true,
                        contentType:'application/json',
                        data: JSON.stringify(information),
                        //阻止深度序列化，向后台传送数组
                        traditional: true,
                        success: function (result2) {

                            alert('保存成功');
                            // location.href='MyselfInformation.html';

                        }
                    })
                }
                // let headImg=new FileReader();
                // headImg.readAsBinaryString(document.getElementsByTagName('form')[0].firstElementChild.files[0],'binary')
                // headImg.onload=function(){
                //     console.log(this.result);





            })
        }
    })
})