// JavaScript Document

$(document).ready(function(){
    var aLi=document.getElementsByClassName('lia');
    //console.log(aLi[1]);
    fow();

    function pageTurning(pagnum) {
        var ids=[];
        $.ajax({
            type: 'post',
            url: Path + '/homeCourse/listByUser',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: true,
            data: {
                pageNum:pagnum,
                pageSize:2
            },
            success: function (result) {
                //console.log(tmp);
                var tmp=result.data;
                var str = '';
                for (var j = 0; j < result.data.length; j++) {
                    // var ids = result.data[i]._id;//先把这一整行data存起来
                    console.log(tmp[j].briefIntroduction);
                    ids[j] = tmp[j].id;
                    str += '<tr class="hide-tr">' + '<td>' + tmp[j].title + '</td>' + '<td>' + tmp[j].briefIntroduction + '</td>' + '<td>' + tmp[j].homeCategoryDTO.categoryName + '</td>' + '<td>' +
                        '<div class="hidebtn">' + '<button class="btn button4 btn-mo styBtn">' + '<a href="Add Course.html">' + '课程编写' + '</a>' + '</button>'
                        + '<div class="hide-btn">' + '<button type="button" class="btn button1 styBtn">' + '课程树编写' + '</button>' + '<button type="button" class="btn button3 styBtn">删除</button>'
                        + '<button type="button" class="btn button2 styBtn">' + '发布' + '</button>' + '</div>' + '</div>' + '</td>' + '</tr>';
                    // console.log(str);
                }

                $('#tbody').html(str);
                oBtn = $('.button1');
                oBtn1 = $('.button2');
                oBtn2 = $('.button3');
                oBtn3 = $(".button4")
                console.log(oBtn1);
                $(".hide-btn").hide();
                $(".hide-tr>td:nth-child(4)").mouseover(function () {
                    console.log(event);
                    if (event.path[0].innerText == "课程编写") {
                        $(event.path[0].nextSibling).show(100, "linear");
                    }
                    else {
                        $(event.path[0].firstChild.lastChild).show(100, "linear");
                    }

                });
                $(".hide-tr>td:nth-child(4)").mouseleave(function () {
                    console.log(event);
                    if (event.path[0].innerText == "课程编写") {
                        $('.hide-btn').hide(100, "linear");
                    }
                    else {
                        $(event.path[0].firstChild.lastChild).hide(100, "linear");
                    }
                });
                for (let x = 0; x < oBtn.length; x++) {  //console.log(ids);

                    oBtn[x].onclick = function () {
                        var id;
                        id = ids[x];
                        $.ajax({
                            type: 'post',
                            url: 'http://47.106.247.251:8004/treeKnow/treeNodeManager/getTreeHeadInfo',
                            contentType: 'application/x-www-form-urlencoded',
                            dataType: 'text',
                            async: true,
                            data: {
                                courseId: id
                            },
                            success: function (result) {
                                var tmp = result.data;
                                alert('获取信息成功');
                                if (tmp == "") {
                                    $.cookie('classId', id, {path: '/', secure: false, raw: false});
                                } else {
                                    $.cookie('rootId', tmp.treeRootId, {path: '/', secure: false, raw: false});
                                    $.cookie('treecreat', tmp.createDate, {path: '/', secure: false, raw: false});
                                    $.cookie('theme', tmp.theme, {path: '/', secure: false, raw: false});
                                    $.cookie('classId', tmp.courseId, {path: '/', secure: false, raw: false});
                                }
                                // location.href='treeTeacher.html';
                            }
                        });
                    };
                    //发布课程
                    oBtn1[x].onclick = function () {
                        var id;
                        id = ids[x];
                        $.ajax({
                            type: 'post',
                            url: Path + '/homeCourse/publishForCheck',
                            contentType: 'application/x-www-form-urlencoded',
                            dataType: 'json',
                            async: true,
                            data: {
                                courseId: id
                            },
                            success: function (result) {
                                alert('发布课程成功');
                            }
                        });
                    };
                    //删除课程
                    oBtn2[x].onclick = function () {
                        var id;
                        id = ids[x];
                        $.ajax({
                            type: 'DELETE',
                            url: Path + '/homeCourse/remove?id=' + id,
                            contentType: 'application/json',
                            dataType: 'json',
                            async: true,
                            // data:{ id: id},
                            success: function (result) {

                                location.href = 'manage.html';

                            }
                        });
                    };
                    oBtn3[x].onclick = function () {
                        var id;
                        id = ids[x];
                        $.cookie('Id', id, {path: '/', secure: false, raw: false});
                    }
                }
            },
        })
    }
//console.log(num);
function fow() {

     let oBtn,oBtn1,oBtn2 ,oBtn3;
     //获取分页
    $.ajax({
        type: 'post',
        url:Path+'/homeCourse/listByUser',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {},
        success: function (result) {
            $("#tbody").html("");
            $(".foot-pag").html("");
            var pag1="<li>"+"<a href=\"#\" class=\"lia\">"+"&laquo;"+"</a>"+"</li>";
            var pag2= "<li>"+"<a href=\"#\" class=\"lia\">"+"&raquo;"+"</a>"+"</li>";
            var pag3="";
            for (let i=0;i<result.data.length/2;i++) {
                var  num=i+1;
                pag3+="<li><a href=\"#\" class=\"lia\">"+num+"</a></li>";
            }
            $(".foot-pag").html(pag1+pag3+pag2);

            pageTurning(1);
           var pagnum=1;
  $(".lia").click(function(){
      console.log(num);
      switch (event.target.innerText) {
          case "«":
          if (pagnum<=0){
              pagnum=num;
          } else pagnum--;break;
          case  "»":
              if (pagnum>=num){
                  pagnum=1;
              }else pagnum++;break;
          default:pagnum=event.target.innerText;

      }

      pageTurning(pagnum);
            });

        },
    });


}
    $('.middle-btn').click(function () {
        $.cookie('Id','',{path:'/',secure:false,raw:false});
    })
});
