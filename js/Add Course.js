// JavaScript Document
let num,sum;

//获取分类id
$.ajax({
    type: 'get',
    url: Path+'/homeField',
    contentType: 'application/x-www-form-urlencoded',
    dataType: 'json',
    async: true,
    data: {},
    success: function (result) {
       // alert("成功获取信息");
        $('#select1').html("");
            var tmp=result.data;
            // console.log(tmp);
        var str= '';
            for (var i=0;i<result.data.length;i++)
            {
                //console.log(tmp[i].fieldName);
                var opids = tmp[i].id;
               // console.log(opids);
                str += '<option value='+'"'+ opids+'"'+'>' + tmp[i].fieldName+ '</option>';

            }
        $('#select1').append(str);
        num = $('#select1')[0].value;
      //  console.log(num);
    },
});


$.ajax({
   type: 'get',
    url: Path+'/homeCategory/userGetCategory',
     contentType: 'application/x-www-form-urlencoded',
    dataType: 'json',
    async: true,
     data:{},
    success: function (result) {
        // alert("成功获取信息");
         $('#select2').html("");
        var tmp=result.data;
        // console.log(tmp);
         var str= '';
        for (var i=0;i<result.data.length;i++)
         {
             //console.log(tmp[i].fieldName);
             var opids = tmp[i].id;
            str += '<option value='+'"'+ opids+'"'+'>' + tmp[i].categoryName+ '</option>';

        }
        $('#select2').append(str);
        sum = $('#select2')[0].value;
     },
 });

var imgurl;
//图片上传
$('#btnSubmit').click(function() {
    var formData=new FormData();
    formData.append('file',document.getElementById('img-file').files[0]);
    formData.append("type","1");
  //  console.log(formData.get('file'));
  //  console.log(formData.get('type'));
    $.ajax({
        type: 'post',
        url:Path+ '/homeCourse/uploadImg',
       // cache: false,
        processData: false,
        contentType:false,
        async: true,
        dataType : "json",
        enctype:"multipart/form-data",
        data:formData,
        success: function (result) {
            alert('上传成功');
           // console.log(result.data);
         //document.getElementById("imgup").src="http://47.106.247.251:8003/admin/homeCourse/getImage?url="+result;
        },
        error:function (result) {
            //salert("上传失败");
            console.log(result.responseText);
            imgurl=result.responseText;
            document.getElementById("imgup").src="http://47.106.247.251:8003/admin/homeCourse/getImage?url="+result.responseText;
        },
    });
});
//新增课程
$('#confirm').click(function() {
    var Ctitle = document.getElementById("cTile").value,
        Cbrief = $("#cBiref").val(),
        Cintion = editor.txt.text(),
        couseId=$.cookie('Id');
    //console.log( $("#cBiref").val());
    alert(couseId);
    $.ajax({
        type: 'post',
        url:Path+ '/homeCourse/saveOrUpdate',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
            title: Ctitle,
            briefIntroduction: Cbrief,
            introduction: Cintion,
            categoryId: sum,
            titleImg:imgurl,
            id:couseId
        },
        success: function (result) {
            alert("新增课程成功");
            location.href='manage.html';
        },
    });
});

