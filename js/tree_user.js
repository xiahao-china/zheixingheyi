let Path='http://47.106.247.251:8004/treeKnow';//服务器地址
let information={
    outname:'',
    rootid:getCookie('rootId'),
    theme:getCookie('theme'),
    classId:getCookie('classId'),
    classname:getCookie('classname'),
    treecreat:getCookie('treecreat'),
    NowTreenodeId:'',
}
let tree_data;
// kmsjsmap.init({
//     container: "tree_container",
//     data: [
//         { "id": "root", "isroot": true, "topic": "华北大魏有限公司" },
//         { "id": "sub1", "parentid": "root", "topic": "君主", "badge":'难', "direction": "left" },
//         { "id": "sub12", "parentid": "sub1", "topic": "曹操", "badge": 30 },
//         {id: "9748dafc793c52ed", topic: "嘿嘿嘿", expanded: true, parentid: "sub12", badge: 0},
//         { "id": "sub121", "parentid": "sub1", "topic": "曹丕", "badge": 44 },
//         { "id": "sub122", "parentid": "sub1", "topic": "曹叡", "badge": 44 },
//         { "id": "sub123", "parentid": "sub1", "topic": "曹芳", "badge": 44 },
//
//         { "id": "sub2", "parentid": "root", "topic": "军师", "badge": 66, "direction": "right" },
//         { "id": "sub21", "parentid": "sub2", "topic": "郭嘉",  },
//         { "id": "sub22", "parentid": "sub2", "topic": "荀彧", "badge": 9 },
//         { "id": "sub23", "parentid": "sub2", "topic": "司马懿", "badge": 7, "isLink": true },
//         { "id": "sub24", "parentid": "sub2", "topic": "贾诩", "badge": 77 },
//
//         { "id": "sub3", "parentid": "root", "topic": "大将", "badge": 45, "direction": "right" },
//         { "id": "sub31", "parentid": "sub3", "topic": "典韦", "badge": 1 },
//         { "id": "sub32", "parentid": "sub3", "topic": "夏侯惇", "badge": 2 },
//         { "id": "sub33", "parentid": "sub3", "topic": "于禁", "badge": 3 },
//         { "id": "sub34", "parentid": "sub3", "topic": "许褚", "badge": 4, "expanded": false },
//
//         { "id": "sub341", "parentid": "sub34", "topic": "士兵甲"},
//         { "id": "sub342", "parentid": "sub34", "topic": "士兵乙"}
//     ],
//     editable: false,
//     onRelation: function(item) {
//         console.log('当前选择中的是', item)
//         kmsjsmap.setLinkStatus({
//             id: item.id,
//             isLink: item.data.isLink === true ? false : true
//         })
//     }
// });
function Managementtree(rootid){                       //管理树
    $.ajax({
        type: 'POST',
        url: Path+"/treeNodeManager/list",
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
            treeRootId:rootid,
        },
        success: function (result) {
            information.outname='Managementtree';
            if (document.title=="管理树-教师") {
                $('#state').addClass('label-success');
                $('#msg').addClass('label-primary');
                document.getElementById('msg_information').innerHTML = '成功'
            };
            if(result){
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
function get_cookie(Name) {
    var search = Name + "="//查询检索的值
    var returnvalue = "";//返回值
    if (document.cookie.length > 0) {
        sd = document.cookie.indexOf(search);
        if (sd!= -1) {
            sd += search.length;
            end = document.cookie.indexOf(";", sd);
            if (end == -1)
                end = document.cookie.length;
            //unescape() 函数可对通过 escape() 编码的字符串进行解码。
            returnvalue=unescape(document.cookie.substring(sd, end))
        }
    }
    return returnvalue;
}
treeRootId=get_cookie('treeRootId');
function getTree(){
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8099/treeKnow/treeNodeManager/list',
        dataType: 'json',
        async: true,
        data: {
            "treeRootId":treeRootId
        },
        //阻止深度序列化，向后台传送数组
        traditional: true,
        success: function (result) {
            console.log('isroot' in result.data[0] &&  result.data[0].isroot);

            kmsjsmap.init({
                container: "tree_containe",
                data: result.data,
                editable: false,
                onRelation: function (item) {
                    console.log('当前选择中的是', item)
                    kmsjsmap.setLinkStatus({
                        id: item.id,
                        isLink: item.data.isLink === true ? false : true
                    })
                }
            });
            startDrag(document.getElementsByTagName("jmnode")[0], $("#jsmind_container")[0]);
        }
    })
}
function changetheme(theme) {
    kmsjsmap.resettheme(theme);
    $('select').value=theme;
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
        editable: false,
        theme:"primary",
        onRelation: function(item) {
            kmsjsmap.setLinkStatus({
                id: item.id,
                isLink: item.data.isLink === true ? false : true
            })
        }
    });
    changetheme(get_cookie('theme'));
    $('jmnode').click(function () {
       PlayVideo(kmsjsmap.getnodeinformation());

    })
}
function savetree() {
    kmsjsmap.save(function(data) {
        console.log('啦啦啦啦', data)
    })
}
function changetheme(theme) {
    kmsjsmap.resettheme(theme);
}
function PlayVideo(node){
    DynamicBackground.StopCreat();
    $.ajax({
        type: 'POST',
        url: Path+'/homeCourseManager/listByStudent',
        dataType: 'json',
        async: true,
        data: {
            treeNodeId:node.id,
            courseId:get_cookie("classId"),
        },
        //阻止深度序列化，向后台传送数组
        traditional: true,
        success: function (result) {
            if (result.code=='200') {
                document.getElementsByTagName('source')[0].src = Path+'/homeCourseManager/getCourseResource?treeNodeId='+node.id+'&courseId='+get_cookie("classId");
                document.getElementsByTagName('video')[0].load();
                $('#PlayVideo').modal('show');
            }else {
                alert('暂无此视频，敬请期待');
            }
        }
    })

}
let DynamicBackground={
    color:["#FFFFCC","#CCFFFF","#FFCCCC","#FFFF99","#0099CC"],
    SpeedX:1,
    MaxSpeedY:1,
    MinSpeedY:0.125,
    ferquency:1500,
    MaxDegSpeed:1.5,
    MinDegSpeed:0.25,
    getnumber:/[0-9]/g,
    AllId:0,
    RandomColor:function(){
        return this.color[parseInt(this.color.length*Math.random())];
    },
    SetSpeedY:function (){
        return this.MinSpeedY+(this.MaxSpeedY-this.MinSpeedY)*(Math.random()-0.5);
    },
    SetSpeedDeg:function (){
        return this.MinDegSpeed+(this.MaxDegSpeed-this.MinDegSpeed)*(Math.random()-0.5);
    },
    CreatDynamicDiv:function () {
        let element=document.createElement('div');
        let ESpeedY=this.SetSpeedY();
        let ESpeedDeg=this.SetSpeedDeg();
        let nowdeg=0;
        document.getElementsByClassName('DynamicBackground')[0].appendChild(element);
        element.style.borderLeftColor=this.RandomColor();
        element.style.bottom="0px";
        element.style.left="0px";
        element.style.transform="rotate(0deg)";
        let IntervalId=(setInterval(function () {
            element.style.bottom=parseFloat(element.style.bottom.toString(this.getnumber))+ESpeedY+"px";
            element.style.left=parseFloat(element.style.left.toString(this.getnumber))+DynamicBackground.SpeedX+"px";
            if(nowdeg>360||nowdeg<-360){
                nowdeg=0;
            }
            else {
                nowdeg=nowdeg+ESpeedDeg;
                element.style.transform="rotate("+nowdeg+"deg)";
            }
            if (parseInt(element.style.left.toString(this.getnumber))>document.body.clientWidth){
                clearInterval(IntervalId);
                document.getElementsByClassName('DynamicBackground')[0].removeChild(element);
            }
        },18))
    },
    StartCreat:function () {
        this.AllId=(setInterval(function () {
                DynamicBackground.CreatDynamicDiv();
        },this.ferquency));
    },
    StopCreat:function () {
        if (this.AllId){
            clearInterval(this.AllId);
            this.AllId=0;
        }
    }
}
$(document).ready(function () {

    DynamicBackground.StartCreat();
        Managementtree(getCookie('rootId'));
        $.ajax({
        type: 'POST',
        url: "http://47.106.247.251:8003/admin/user/getUserInfo",
        dataType: 'json',
        async: true,
        data: {
        },
        //阻止深度序列化，向后台传送数组
        traditional: true,
        success: function (result) {
            if(result.code=='200') {
                document.getElementsByClassName('logined')[0].innerHTML = "<td>\n" +
                    "                            <embed src=\"svg/student-b.svg\">\n" +
                    "                        </td>\n" +
                    "                        <td>\n" +
                    "                            <div class=\"dropdown\">\n" +
                    "                                <button class=\"btn dropdown-toggle\" data-toggle=\"collapse\" data-target=\"#MyselfInformation\">欢迎您:" + result.data.userName + "<span class=\"glyphicon caret\"></span></button>\n" +
                    "                                <ul id=\"MyselfInformation\" class=\"collapse list-group\">\n" +
                    "                                    <li class=\"list-group-item\">个人空间<span class=\"badge\">0</span></li>\n" +
                    "                                    <li class=\"list-group-item\">学习计划</li>\n" +
                    "                                </ul>\n" +
                    "                            </div>\n" +
                    "                        </td>";
            }

        }
    })
    
})

// _________________________________________________________________________________________________
// JavaScript Document
var oDiv=document.getElementById('box');
var oSpan=oDiv.getElementsByTagName('span');
var oUl=document.getElementById('list')
var aLi=oUl.getElementsByTagName('li');

for(var i=0;i<aLi.length;i++)
{
    aLi[i].index=i;
    aLi[i].onclick=function()
    {

        // for(var j=aLi.length;j>this.index+1;j--)
        //{
        // aLi[j].className='box_1';
        //  }
        if(this.className=='box_1')
        {
            for(let j=0;j<this.index+1;j++)
            {

                aLi[j].className='box_2';
            }
        }
        else
        {
            for(let j=this.index+1;j<5;j++) {
                aLi[j].className='box_1';
                // this.className = 'box_1';
            }
        }
    }
}

