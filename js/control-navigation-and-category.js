let Path='http://47.106.247.251:8003/admin';//服务器地址
let information={
    outname:'',
}
let tree_data;

function resettohome(){
    $('#tohome').click(function () {
        window.location.href='index.html';
    })
}
function hiddenall(){
    for (let i=0;i<$('.sethidden').length;i++) {
        $('.sethidden')[i].style.display='none';
    }
}
//—————————————————————输出处理(输出内容控制)—————————————————————————————
function outGetCategory(data) { 
    let str='';
    for (let i=0;i<data.length;i++){
        str+="<tr>" +
            "<td>"+(i+1)+"</td>" +
            "<td>"+data[i].id+"</td>" +
            "<td>"+data[i].categoryName+"</td>" +
            " <td>"+data[i].status+"</td>" +
            "</tr>"
    }
    document.getElementById('tbody').innerHTML=str;
    document.getElementsByClassName('table_thead')[0].style.display='table-header-group';
}

function outAllHomeNavigations(data) {
    let str='';
    for (let i=0;i<data.length;i++){
        str+="<tr>" +
            "<td>"+(i+1)+"</td>" +
            "<td>"+data[i].id+"</td>" +
            "<td>"+data[i].account+"</td>" +
            " <td>"+data[i].status+"</td>"+
            " <td class=\"line_detail\">查看审核文件<div>" +
            "<table>" +
            "<thead>" +
            "<tr>" +
            "<th>链接id</th>" +
            "<th>链接名称</th>" +
            "<th>状态</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" ;
        for(let j=0;j<data[i].homeFieldList.length;j++){
            str+="<tr>"+
                "<td>"+data[i].homeFieldList[j].id+"</td>" +
                "<td>"+data[i].homeFieldList[j].fieldName+"</td>" +
                "<td>"+data[i].homeFieldList[j].status+"</td>" +
                "</tr>";
        }
        str+="</tbody>" + "</table>" + "</div></td>"+"</tr>"
        console.log(str);
    }
    document.getElementById('tbody').innerHTML=str;
    document.getElementsByClassName('table_thead')[1].style.display='table-header-group';
}

function CourseAudity(data) {
    let str='';
    for (let i=0;i<data.length;i++){
        str+="<tr>" +
            "<td>"+(i+1)+"</td>" +
            "<td>"+data[i].id+"</td>" +
            "<td>"+data[i].classname+"</td>" +
            " <td>"+data[i].status+"</td>"+
            " <td class=\"line_detail\">查看详情<div>" +
            "<table>" +
            "<thead>" +
            "<tr>" +
            "<th>链接id</th>" +
            "<th>链接名称</th>" +
            "<th>状态</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" ;
        for(let j=0;j<data[i].homeFieldList.length;j++){
            str+="<tr>"+
                "<td>"+data[i].homeFieldList[j].id+"</td>" +
                "<td>"+data[i].homeFieldList[j].fieldName+"</td>" +
                "<td>"+data[i].homeFieldList[j].status+"</td>" +
                "</tr>";
        }
        str+="</tbody>" + "</table>" + "</div></td>"+"</tr>"
        console.log(str);
    }
    document.getElementById('tbody').innerHTML=str;
    document.getElementsByClassName('table_thead')[1].style.display='table-header-group';
}

function outtree(data) {                                                        //输出树
    data= JSON.parse(JSON.stringify(data).replace(/nodeName/g,"topic"));
    data= JSON.parse(JSON.stringify(data).replace(/details/g,"direction"));
    data= JSON.parse(JSON.stringify(data).replace(/status/g,"badge"));
    data= JSON.parse(JSON.stringify(data).replace(/parentId/g,"parentid"));
    console.log(data);
    tree_data=data.data;
    kmsjsmap.init({
        container: "tree_container",
        data: data.data,
        editable: true,
        theme:"primary",
        onRelation: function(item) {
            console.log('当前选择中的是', item)
            kmsjsmap.setLinkStatus({
                id: item.id,
                isLink: item.data.isLink === true ? false : true
            })
        }
    });
}


//—————————————————————输出处理(输出内容控制)—————————————————————————————


//—————————————————————知识树功能(树创建与保存)—————————————————————————————

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
    kmsjsmap.change(theme);
}

//—————————————————————知识树功能(树创建与保存)—————————————————————————————

//—————————————————————结果处理（变更基础信息）—————————————————————————————
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
    if(result.data){
    console.log(information.outname);
        switch (information.outname) {
            case 'adminGetCategory':outGetCategory(result.data);break;
            case 'getAllHomeNavigations':outAllHomeNavigations(result.data);break
            case 'CourseAudity':outCourseAudity(result.data);break
            case 'Teacheraudit':outTeacheraudit(result.data);break
            case 'Managementtree':outManagementtree(result.data);break
        }
    }

}
//—————————————————————结果处理—————————————————————————————

//—————————————————————交互进行—————————————————————————————
function getAllHomeNavigations(){                       //获取导航栏
    $.ajax({
        type: 'get',
        url: Path + '/homeNavigation/getAllHomeNavigations',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
        },
        success: function (result) {
            information.outname='getAllHomeNavigations'
            change_information(result);
        },
        error: function () {
            alert('对服务器发送信息出现问题');
        }
    });
}

function insertHomeNavigation(){                       //新增导航栏
    $.ajax({
        type: 'put',
        url: Path + '/homeNavigation/insertHomeNavigation',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
            navigationName:document.getElementsByName('navigationName')[0].value,
            status:document.getElementsByName('status')[0].value
        },
        success: function (result) {
            change_information(result);
        },
        error: function () {
            alert('对服务器发送信息出现问题');
        }
    });
}

function updateHomeNavigation(){                       //基本信息修改
    $.ajax({
        type: 'post',
        url: Path + '/homeNavigation/updateHomeNavigation',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
            id:document.getElementsByName('id')[1].value,
            navigationName:document.getElementsByName('navigationName')[1].value,
            status:document.getElementsByName('status')[1].value
        },
        success: function (result) {
            change_information(result);
        },
        error: function () {
            alert('对服务器发送信息出现问题');
        }
    });
}

function updateRelation(){                       //更新链接表
    $.ajax({
        type: 'post',
        url: Path + '/homeNavigation/updateRelation',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
            'homeFieldList[0].id':document.getElementsByName('homeFieldList[0].id')[0].value,
            'homeFieldList[0].fieldName':document.getElementsByName('homeFieldList[0].fieldName')[0].value,
            'homeFieldList[0].status':document.getElementsByName('homeFieldList[0].status')[0].value,
            id:document.getElementsByName('id')[1].value,
            navigationName:document.getElementsByName('navigationName')[1].value,
            status:document.getElementsByName('status')[1].value
        },
        success: function (result) {
            change_information(result);
        },
        error: function () {
            alert('对服务器发送信息出现问题');
        }
    });
}

function deleteHomeNavigation(){                       //删除存储表关系(物理删除)
    $.ajax({
        type: 'delete',
        url: Path + '/homeNavigation/deleteHomeNavigation',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
            id:document.getElementsByName('id')[0].value,
        },
        success: function (result) {
            change_information(result);
        },
        error: function () {
            alert('对服务器发送信息出现问题');
        }
    });
}

function deleteHomeNavigationRelation(){                       //删除存储表关系(逻辑删除)
    $.ajax({
        type: 'delete',
        url: Path + '/homeNavigation/deleteHomeNavigationRelation',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
            id:document.getElementsByName('id')[0].value,
        },
        success: function (result) {
            change_information(result);
        },
        error: function () {
            alert('对服务器发送信息出现问题');
        }
    });
}

function adminGetCategory(){                       //获取领域
    $.ajax({
        type: 'get',
        url: Path + '/homeCategory/adminGetCategory',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
        },
        success: function (result) {
            information.outname='adminGetCategory';
            change_information(result);
        },
        error: function () {
            alert('对服务器发送信息出现问题');
        }
    });
}

function deleteCategory(){                       //删除领域
    $.ajax({
        type: 'delete',
        url: Path + '/homeCategory/deleteCategory',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
            id:document.getElementsByName('id')[5].value,
        },
        success: function (result) {
            change_information(result);
        },
        error: function () {
            alert('对服务器发送信息出现问题');
        }
    });
}

function insertCategory(){                       //新增领域
    $.ajax({
        type: 'put',
        url: Path + '/homeCategory/insertCategory',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
            categoryName:document.getElementsByName('categoryName')[1].value,
            status:document.getElementsByName('status')[1].value,
        },
        success: function (result) {
            change_information(result);
        },
        error: function () {
            alert('对服务器发送信息出现问题');
        }
    });
}

function updateCategory(){                       //更新领域
    $.ajax({
        type: 'post',
        url: Path + '/homeCategory/updateCategory',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
            id:document.getElementsByName('id')[3].value,
            categoryName:document.getElementsByName('categoryName')[1].value,
            status:document.getElementsByName('status')[1].value,
        },
        success: function (result) {
            change_information(result);
        },
        error: function () {
            alert('对服务器发送信息出现问题');
        }
    });
}

function deleteCategoryRelation(){                       //删除领域以及方向链接
    $.ajax({
        type: 'delete',
        url: Path + '/homeCategory/deleteCategoryRelation',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
            id:document.getElementsByName('id')[4].value,
        },
        success: function (result) {
            change_information(result);
        },
        error: function () {
            alert('对服务器发送信息出现问题');
        }
    });
}


function CourseAudity(){                       //教师审核
    $.ajax({
        type: 'get',
        url: Path + '/homeCategory/CourseAudity',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
        },
        success: function (result) {
            information.outname='CourseAudity';
            change_information(result);
        },
        error: function () {
            alert('对服务器发送信息出现问题');
        }
    });
}

function Teacheraudit(){                       //课程审核
    $.ajax({
        type: 'get',
        url: Path + '/homeCategory/Teacheraudit',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
        },
        success: function (result) {
            information.outname='Teacheraudit';
            change_information(result);
        },
        error: function () {
            alert('对服务器发送信息出现问题');
        }
    });
}


//—————————————————————交互进行—————————————————————————————
$(document).ready(function () {
    $('#welcome').modal('show');
    $('.right_bottom_gear').mouseover(function () {
        setTimeout(resettohome,1000);
    })
    $(document.body).click(function () {
        $('.panel-body').collapse('hide');
    })
    $("select").click(function () {
        kmsjsmap.resettheme(this.value);

    })
    $("[href='#']").click(function () {
        document.getElementById('name').innerHTML=event.target.innerText+"<span class=\"text-muted small\">"+" "+event.path[3].firstElementChild.innerText+"</span>";
        document.getElementById('submission').innerHTML='提交信息';
        switch (event.target.innerText) {
            case "获取导航栏":hiddenall();
            document.getElementById('submission').onclick=function(){
                getAllHomeNavigations();
            }
                console.log($('#submission'));break;

            case "新增导航栏":hiddenall();
            document.getElementById('insertHomeNavigation').style.display='block';
            document.getElementById('submission').onclick=function(){
                insertHomeNavigation();
            }
            console.log($('#submission'));break;

            case "基本信息修改":hiddenall();
            document.getElementById('updateHomeNavigation').style.display='block';
                document.getElementById('submission').onclick=function(){
                    updateHomeNavigation();
                };
                break;
            case "更新链接表":hiddenall();
            document.getElementById('updateRelation').style.display='block';
                document.getElementById('submission').onclick=function(){
                    updateRelation();
                }
            break;
            case "删除存储表关系(物理删除)":hiddenall();
            document.getElementById('getAllHomeNavigations').style.display='block';
                document.getElementById('submission').onclick=function(){
                    deleteHomeNavigation();
                }
            break;
            case "删除存储表关系(逻辑删除)":hiddenall();
            document.getElementById('getAllHomeNavigations').style.display='block';
                document.getElementById('submission').onclick=function(){
                    deleteHomeNavigationRelation();
                }
            break;
            case "获取领域":hiddenall();
                document.getElementById('submission').onclick=function(){
                    adminGetCategory();
                }
                break;
            case "删除领域":hiddenall();
                document.getElementById('deleteCategory').style.display='block';
                document.getElementById('submission').onclick=function(){
                    deleteCategory();
                }
                break;
            case "新增领域":hiddenall();
                document.getElementById('insertCategory').style.display='block';
                document.getElementById('submission').onclick=function(){
                    insertCategory();
                }
                break;
            case "更新领域":hiddenall();
                document.getElementById('updateCategory').style.display='block';
                document.getElementById('submission').onclick=function(){
                    updateCategory();
                }
                break;
            case "删除领域及方向链接":hiddenall();
                document.getElementById('deleteCategoryRelation').style.display='block';
                document.getElementById('submission').onclick=function(){
                    deleteCategoryRelation();
                }
                break;
            case "教师审核":hiddenall();
                document.getElementById('CourseAudity').style.display='block';
                document.getElementById('submission').onclick=function(){
                    CourseAudity();
                }
                document.getElementById('submission').innerHTML='搜索教师';
                break;
            case "课程审核":hiddenall();
                document.getElementById('Teacheraudit').style.display='block';
                document.getElementById('submission').onclick=function(){
                    Teacheraudit();
                }
                document.getElementById('submission').innerHTML='搜索课程';
                break;
            case "管理树":hiddenall();
                document.getElementById('Managementtree').style.display='block';
                document.getElementsByClassName('tree_body')[0].style.display='block';
                document.getElementById('submission').onclick=function(){
                    Managementtree();
                }
                document.getElementById('submission').innerHTML='搜索树';
                break;
        }
    })
})