let Path='http://47.106.247.251:8004/treeKnow';//服务器地址
let information={
    outname:'',
    rootid:getCookie('rootId'),
    theme:getCookie('theme'),
    classId:getCookie('classId'),
    classname:getCookie('classname'),
    treecreat:getCookie('treecreat'),
    NowTreenodeId:'',
    lengthComputable:''
}
let tree_data;

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
}
function change_information(result){
    $('#state').removeClass('label-success');
    $('#state').removeClass('label-danger');
    $('#msg').removeClass('label-success');
    $('#msg').removeClass('label-primary');
    $('#msg').removeClass('label-danger');
    $('#msg').removeClass('change_information_lotmsg');
    for (let i=0;i<$('.table_thead').length;i++) {
        $('.table_thead')[i].style.display='none';
    }
    document.getElementById('state_information').innerHTML=result.code;
    if (result.code=='200'){
        $('#state').addClass('label-success');
        $('#msg').addClass('label-primary');
        document.getElementById('msg_information').innerHTML='成功';
        alert('操作成功');
    }
    else {
        $('#state').addClass('label-danger');
        if (result.msg.length>100) {
            $('#msg').removeClass('label');
            $('#msg').addClass('change_information_lotmsg');
            document.getElementById('msg_information').innerHTML=result.msg
        }
        else {
            $('#msg').addClass('label-danger');
            document.getElementById('msg_information').innerHTML=result.msg;
        }
    }
    if(result.data){
        switch (information.outname) {
            case 'adminGetCategory':outGetCategory(result.data);break;
            case 'getAllHomeNavigations':outAllHomeNavigations(result.data);break
            case 'CourseAudity':outCourseAudity(result.data);break
            case 'Teacheraudit':outTeacheraudit(result.data);break
            case 'Managementtree':outManagementtree(result.data);break
        }
    }

}
function outtree(data) {                                                        //输出树
    data= JSON.parse(JSON.stringify(data).replace(/nodeName/g,"topic"));
    data= JSON.parse(JSON.stringify(data).replace(/details/g,"direction"));
    data= JSON.parse(JSON.stringify(data).replace(/status/g,"badge"));
    data= JSON.parse(JSON.stringify(data).replace(/parentId/g,"parentid"));
    tree_data=data.data;
    kmsjsmap.init({
        container: "tree_container",
        data: data.data,
        editable: true,
        theme:"primary",
        onRelation: function(item) {
            kmsjsmap.setLinkStatus({
                id: item.id,
                isLink: item.data.isLink === true ? false : true
            })
        }
    });
    changetheme(information.theme);
}

function createTree(){
    var id = jsMind.util.uuid.newid();
    var treeknow = {"id": id, "isroot": true, "topic": "root"};
    kmsjsmap.init({
        container: "tree_container",
        data: [
            treeknow
        ],
        editable: true,
        onRelation: function (item) {
            console.log('当前选择中的是', item)
            kmsjsmap.setLinkStatus({
                id: item.id,
                isLink: item.data.isLink === true ? false : true
            })
        }
    });
    startDrag(document.getElementsByTagName("jmnode")[0], $("#tree_container")[0]);
}
function changetheme(theme) {
    kmsjsmap.resettheme(theme);
    $('select').value=theme;
}
function saveTree(){
    kmsjsmap.save(function (data) {
        information.rootid=data[0].id;
        data= JSON.parse(JSON.stringify(data).replace(/topic/g,"nodeName"));
        data= JSON.parse(JSON.stringify(data).replace(/direction/g,"details"));
        data= JSON.parse(JSON.stringify(data).replace(/badge/g,"status"));
        data= JSON.parse(JSON.stringify(data).replace(/parentid/g,"parentId"));
        let x={
            list:data,
            theme:information.theme,
            courseId:parseInt(information.classId),
        }
        $.ajax({
            type: 'POST',
            url:Path+'/treeNodeManager/saveTreeNodeList',
            contentType: 'application/json',
            dataType: 'json',
            async: true,
            data:JSON.stringify(x),
            //阻止深度序列化，向后台传送数组
            traditional: true,
            success: function (result) {
                console.log(result);
            }
        })
    })
}
function Managementtree(rootid){                       //管理树
    $.ajax({
        type: 'POST',
        url: Path+"/treeNodeManager/list",
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
            treeRootId:document.getElementsByClassName('treename')[0].value||rootid,
        },
        success: function (result) {
            information.outname='Managementtree';
            if (document.title=="管理树-教师") {
                $('#state').addClass('label-success');
                $('#msg').addClass('label-primary');
                document.getElementById('msg_information').innerHTML = '成功'
            };
            if(result){
                alert('操作成功');
                outtree(result);
            }
            else {
                alert('查询成功，无此树');
            }

        },
        error: function () {
            alert('对服务器发送信息出现问题');
            $('#state').addClass('label-danger');
            console.log(result.msg.length);
            if (result.msg.length>100) {
                $('#msg').removeClass('label');
                $('#msg').addClass('change_information_lotmsg');
                document.getElementById('msg_information').innerHTML=result.msg
            }
            else {
                $('#msg').addClass('label-danger');
                document.getElementById('msg_information').innerHTML=result.msg;
            }
        }
    });
}
function classIdGetTree(classId){                       //使用cookie进行树搜索
    $.ajax({
        type: 'POST',
        url: Path+"/treeNodeManager/getTreeHeadInfo",
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
            courseId:classId,
        },
        success: function (result) {
            result.code=200;
            result.msg='';
            change_information(result);
            outClassAboutTree(result.data);
            information.treeRootId=result.data.treeRootId;
            if (information.treeRootId){
            Managementtree(information.treeRootId);
            }

        },
        error: function () {
            alert('对服务器发送信息出现问题');
        }
    });
}

function outClassAboutTree(data) {
    let str='';
    information.theme=function () {
        if (data.theme){return''}else {
            return data.theme;
        }
    }
    for (let i=0;i<data.length;i++){
        str+="<tr>" +
            "<td>"+(i+1)+"</td>" +
            "<td>"+data.courseName+"</td>" +
            "<td>"+data.treeRootId+"</td>" +
            " <td>"+data.theme+"</td>" +
            " <td>"+data.updateDatetheme+"</td>" +
            "</tr>"
    }
    document.getElementById('tbody').innerHTML=str;
    document.getElementsByClassName('table_thead')[2].style.display='table-header-group';
}
function progressHandlingFunction(e) {
    if (e.lengthComputable) {
        $('#progress').attr({value : e.loaded, max : e.total}); //更新数据到进度条
        var percent = e.loaded/e.total*100;
        $('#progress').html(e.loaded + "/" + e.total+" bytes. " + percent.toFixed(2) + "%");
        $('#progress').css('width', ((50+percent/2).toFixed(2)) + "%");
        }
    }
function uploadVedio(){                       //上传文件
    if ($('#uploadfile>input:nth-child(2)')[0].files[0]) {
        let formData=new FormData;
        formData.append('uploadFile',$('#uploadfile>input:nth-child(2)')[0].files[0]);
        formData.append('courseId',information.classId);
        formData.append('treeNodeId',information.NowTreenodeId);
        $.ajax({
        type: 'POST',
        url: Path+"/homeCourseManager/uploadCourseOfView",
        dataType: 'json',
        async:true,
        contentType:false,
        processData:false,
        data:formData,
        xhr: function(){ //获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数
                myXhr = $.ajaxSettings.xhr();
                if(myXhr.upload){ //检查upload属性是否存在
                    //绑定progress事件的回调函数
                    myXhr.upload.addEventListener('progress',progressHandlingFunction, false);
                }else {
                    console.log('无upload函数');
                }
                return myXhr; //xhr对象返回给jQuery使用
            },
        //阻止深度序列化，向后台传送数组
        traditional: true,
        success: function (result) {
            alert('视频上传成功');
            console.log(result);
            information.headPicture=result;
        },
        error:function (result) {
            alert('服务器出现错误，请重试');
        }
    })
    }
    else{
        alert('请选择相应文件');
    }
    // if ($('#uploadfile>input:nth-child(2)')[0].files[0]) {
    //     $('#uploadfile>input:nth-child(4)')[0].value=information.NowTreenodeId;
    //     $('#uploadfile>input:nth-child(3)')[0].value=information.classId;
    //     $('#uploadfile>input:nth-child(5)')[0].click();
    //     information.lengthComputable=event.lengthComputable;
    //     console.log(event);
    //     let id=setInterval(function () {
    //         console.log(event,event.lengthComputable)
    //         if (information.lengthComputable==event.lengthComputable){
    //             clearInterval(id);
    //         }
    //     },100);
    //
    // }
    // else{
    //     alert('请选择相应文件');
    // }
}
function RuturnLoginResult(){

    $('#uploadfile').ajaxSubmit(function(message){

        alert(message.msg);//message是后台处理数据的返回值

    })

    return false;//这里必须要返回false，不然依然会跳转。

}
// let file=new FileReader();
// file.readAsBinaryString(document.getElementById('uploadfile').files[0]);
// file.onload=function () {
//     console.log(file.result);
//     $.ajax({
//         type: 'POST',
//         url: Path+"/homeCourseManager/uploadCourseOfView",
//         contentType:'multipart/form-data',
//         dataType: 'json',
//         async: true,
//         data: {
//             uploadFile:file.result,
//             courseId:information.classId,
//             treeNodeId:information.NowTreenodeId,
//         },
//         success: function (result) {
//             result.code=200;
//             result.msg='';
//             change_information(result);
//             outClassAboutTree(result.data);
//             information.treeRootId=result.data.treeRootId;
//             if (information.treeRootId){
//                 Managementtree(information.treeRootId);
//             }
//
//         },
//         error: function () {
//             alert('对服务器发送信息出现问题');
//         }
//     });

$(document).ready(function () {

    if (document.title=="管理树-教师") {

    document.getElementById('Managementtree').style.display='block';
    document.getElementsByClassName('tree_body')[0].style.display='block';
    document.getElementById('submission').innerHTML='搜索树';
    $("select").click(function () {
        kmsjsmap.resettheme(this.value);
        information.theme=this.value;

    })

    if (getCookie('rootId')){
        Managementtree(getCookie('rootId'));
    }else {
        alert('未获取到树的id,将对课程树进行初始化');
        createTree();
        information.rootid=kmsjsmap.save((data)=>data[0].id);
        saveTree();
    }
    document.getElementById('submission').onclick=function(){
        Managementtree();
    }
    }
})

