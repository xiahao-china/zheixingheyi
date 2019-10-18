


var dir=document.getElementsByClassName('a-one');
var ass=document.getElementsByClassName('a-two');
console.log(dir);

var cate=[];


$(document.body).ready(function () {
    fow();
    aa();
})
function aa(){
    alert("111");
    let inputText;
    if($.cookie('FindInformation'))
    {
        inputText=$.cookie('FindInformation');
    }else {
        inputText =$("#find").val();
    }
    console.log(inputText);
    $.ajax({
        type: 'post',
        url: Path + '/homeCourse/listLikeName',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
            courseName:inputText
        },
        success: function (result) {
            //$(".couse").html("");
            alert("获取信息成功");
            var tmp=result.data;
            var str="";
            for (var i=0;i<result.data.length;i++)
            {

                str+="<div class=\"col-md-3 col-sm-3 col-xs-3\">"+
                    "<img class=\"img\" "+"src="+"http://47.106.247.251:8003/admin/homeCourse/getImage?url="+ tmp[i].titleImg +"/>"+" <a class="+"img-font>"+tmp[i].title+"</a>"
                    +"<p class="+"img-det>"+tmp[i].briefIntroduction +" </p>"+"</div>"
            }
            console.log(str);
            $(".couse").html(str);
        },
    });
}
function fow() {



    var field=[];
//获取所有方向
    $.ajax({
        type: 'get',
        url: Path + '/homeField',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {},
        success: function (result) {

            if (result.code == '200') {

                var tmp=result.data;
                // console.log(tmp);
                for (var i=0;i<result.data.length;i++)
                {
                    //console.log(tmp[i].fieldName);
                    dir[i+1].innerHTML=tmp[i].fieldName;
                    field[i]=tmp[i].id;
                    console.log(field);
                }

            //获取选中方向的id
            for(let x=0;x<dir.length;x++)
            {
                dir[x].onclick=function(){
                  //  alert("点击成功");
                    var cField;
                    cField=field[x-1];
                    console.log(cField);
                    $.ajax({
                        type: 'get',
                        url: Path + '/homeCategory/userGetCategory',
                        contentType: 'application/x-www-form-urlencoded',
                        dataType: 'json',
                        async: true,
                        data: {
                            fieldId:cField
                        },
                        success: function (result) {
                            var tmp=result.data;
                            for (var i=0;i<result.data.length;i++)
                            {
                                ass[i].innerHTML=tmp[i].categoryName;
                                cate[i]=tmp[i].id;
                            }
                            //console.log(cate);
                            for(let y=0;y<ass.length;y++)
                            {
                                ass[y].onclick=function(){
                                    //  alert("点击成功");
                                    var GetCate;
                                    GetCate=cate[x-1];
                                    console.log(GetCate);
                                    $.ajax({
                                        type: 'post',
                                        url: Path + '/homeCourse/list',
                                        contentType: 'application/x-www-form-urlencoded',
                                        dataType: 'json',
                                        async: true,
                                        data: {
                                            categoryId:GetCate
                                        },
                                        success: function (result) {
                                            $(".couse").html("");
                                            alert("获取信息成功");
                                            var tmp=result.data;
                                            var str="";
                                            for (var i=0;i<result.data.length;i++)
                                            {

                                                str+="<div class=\"col-md-3 col-sm-3 col-xs-3\">"+
                                            "<img class=\"img\" "+"src="+"http://47.106.247.251:8003/admin/homeCourse/getImage?url="+ tmp[i].titleImg +"/>"+" <a class="+"img-font>"+tmp[i].title+"</a>"
                                                +"<p class="+"img-det>"+tmp[i].briefIntroduction +" </p>"+"</div>"
                                            }
                                            console.log(str);
                                            $(".couse").html(str);
                                        },
                                    });
                                }
                            }
                        },
                    });
                }
            }
            }
        },
    });


//获取所有分类
/*
$.ajax({
    type: 'get',
    url: Path + '/homeCategory/userGetCategory',
    contentType: 'application/x-www-form-urlencoded',
    dataType: 'json',
    async: true,
    data: {},
    success: function (result) {
        var tmp=result.data;
        for (var i=0;i<result.data.length;i++)
        {
            ass[i+1].innerHTML=tmp[i].categoryName;
            cate[i]=tmp[i].id;
        }
        console.log(cate);

    },
});
*/

}