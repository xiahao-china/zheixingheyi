let Path='http://47.106.247.251:8003/admin';
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
}
function open_left () {
    var mobileMenu = $("#mobile-menu");
    if (mobileMenu.hasClass("show-nav")) {
        setTimeout(function () {
            mobileMenu.addClass("hide-nav").removeClass("show-nav");
        }, 100)
    }
    else {
        setTimeout(function () {
            mobileMenu.addClass("show-nav").removeClass("hide-nav");
        }, 100)
    }
}
function tomorecourse() {
    let FindInformation=document.getElementById('find').value;
    setCookie('FindInformation',FindInformation,1);
    location.href='Detlie.html';

}
//____________________________________________左侧控制______________________________________________
function clear_text(theid) {
    document.getElementById(theid).value = "";
    if (theid == "login_account_key")
    {
        document.getElementById(theid).type = "password";
    }
}
//____________________________________________搜索框效果及登陆检测______________________________________________
function clear_span(ID) {
    $("#" + ID).removeClass("glyphicon glyphicon-ok");
    document.getElementById(ID).innerHTML = "";
    document.getElementById(ID).style.color = "#000000";
}
function check_account(name,end) {
    var getvalue = $("input[name='"+name+"']").val();
    var objecter = $("#" + end);
    var special = /[^a-zA-Z0-9]/ig;
    if (getvalue == "") {
        clear_span(end);
    }
    else {
    if (getvalue.length >= 6 && getvalue.length <= 18) {
        if (special.test(getvalue) == true) {
            clear_span(end);
            document.getElementById(end).style.color = "#e34141";
            document.getElementById(end).innerHTML = "不能使用特殊字符";
            return 0;
        }
        else {
            clear_span(end);
            $("#" + end).addClass("glyphicon glyphicon-ok");
            document.getElementById(end).style.color = "green";
            return 1;
        }
    }
    else {
        clear_span(end);
        document.getElementById(end).style.color = "#e34141";
        document.getElementById(end).innerHTML = "账号错误";
        return 0;
    }
    }
}

function check_account_key(name, end) {
    var getvalue = $("input[name='" + name + "']").val();
    var objecter = $("#" + end);
    if (getvalue == "") {
        clear_span(end);
    }
    else {
        if (getvalue.length >= 6 && getvalue.length <= 18) {
            clear_span(end);
            $("#" + end).addClass("glyphicon glyphicon-ok");
            document.getElementById(end).style.color = "green";
            return 1;
        }
        else {
            clear_span(end);
            document.getElementById(end).style.color = "#e34141";
            document.getElementById(end).innerHTML = "密码错误";
            return 0;
        }
    }
}
function check_Verification_code(name, end) {
    var value = $("input[name='" + name + "']").val();
    value = value.toLowerCase();
    check = check.toLowerCase();
    if (value == "") {
        clear_span(end);
    }
    else {
        if (value == check) {
            document.getElementById(end).innerHTML = "";
            $("#" + end).addClass("glyphicon glyphicon-ok");
            $('#verification_check_end').css('color', 'green');
            return 1;
        }
        else {
            $("#" + end).removeClass("glyphicon glyphicon-ok");
            document.getElementById(end).style.color = "#e34141";
            document.getElementById(end).innerHTML = "验证码错误";
            return 0;
        }
    }
}
//____________________________________________验证码图片______________________________________________
// function randomNum(min, max) {
//     return Math.floor(Math.random() * (max - min) + min);
// }
// function randomColor(min, max) {
//     var r = randomNum(min, max);
//     var g = randomNum(min, max);
//     var b = randomNum(min, max);
//     return "rgb(" + r + "," + g + "," + b + ")";
// }
// var check = "";
// function drawPic() {
//     var canvas = document.getElementById("canvase");
//     var width = canvas.width;
//     var height = canvas.height;
//     var ctx = canvas.getContext("2d");
//     check = "";
//     ctx.textBaseline = 'bottom';
//     ctx.fillStyle = randomColor(180, 240);
//     ctx.fillRect(0, 0, width, height);
//     var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
//     for (var i = 0; i < 4; i++) {
//         var txt = str[randomNum(0, str.length)];
//         check = check + txt;
//         ctx.fillStyle = randomColor(50, 160);
//         ctx.font = randomNum(15, 40) + 'px SimHei';
//         var x = 10 + i * 25;
//         var y = randomNum(25, 45);
//         var deg = randomNum(-45, 45);
//         ctx.translate(x, y);
//         ctx.rotate(deg * Math.PI / 180);
//         ctx.fillText(txt, 0, 0);
//         ctx.rotate(-deg * Math.PI / 180);
//         ctx.translate(-x, -y);
//     }
//     for (var i = 0; i < 8; i++) {
//         ctx.strokeStyle = randomColor(40, 180);
//         ctx.beginPath();
//         ctx.moveTo(randomNum(0, width), randomNum(0, height));
//         ctx.lineTo(randomNum(0, width), randomNum(0, height));
//         ctx.stroke();
//     }
//     for (var i = 0; i < 100; i++) {
//         ctx.fillStyle = randomColor(0, 255);
//         ctx.beginPath();
//         ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
//         ctx.fill();
//     }
// }
//____________________________________________登陆交互______________________________________________

function login() {
    var bllon = check_account('login_account', 'login_account_check_end') & check_account('login_account_key', 'login_account_key_end') & check_Verification_code('login_check', 'verification_check_end');
    if (bllon == 1) {
        $.post("http://127.0.0.1:8080/Heaven/server/authentication/form", {
            "username": $("input[name='username']").val(),
            "password": $("input[name='password']").val(),
        }, alert("成功发送"))

    }
    else {
        alert("您输入的信息有误");
    }

}

//____________________________________________执行______________________________________________

var Drag_switch_first_data;

function Drag_switch_first() {
    Drag_switch_first_data = event.touches[0].clientX;
}
function Drag_switch_second() {
    var Drag_switch_second_data = event.touches[0].clientX;
        if ((Drag_switch_second_data - Drag_switch_first_data) > 50) {
            $('#tree_carousel').carousel('next');
        }
}

//___________________________________________拖动切换______________________________________________
function Navigation_bar_information() {


    $.ajax({
        type: 'get',
        url: Path + '/homeNavigation/getHomeNavigations',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
        },
        success: function (result) {
            let stringing;
            if(result.code=='200'){
                for (let i=0,str='';i<result.data.length;i++,stringing+=str) {
                        str='<li>' +
                        '<div class=\"left_type_moreinformation\">' +
                        '<div class=\"small_top_type col-lg-11 text-primary\">'+result.data[i].navigationName+'</div>';
                        for (let n=0;n<result.data[i].homeFieldList.length;n++) {
                            str+='<div class=\"small_type col-lg-3\">'+result.data[i].homeFieldList[n].fieldName+'</div>';
                        }
                        str+='</div>'+'<a class=\"type_a\" href=\"#\">'+result.data[i].navigationName+'</a>'+'</li>';
                    
                }
                $('#tbody1').html(stringing);
                $('#tbody1').find('li').hover(function () {
                        let typ=event.target.innerHTML;
                        let mobileMenu = event.path[1];
                        mobileMenu.firstElementChild.style.display='block';
                        mobileMenu.firstElementChild.lastElementChild.style.display='block';
                    },function () {
                        event.path[1].firstElementChild.style.display='none';
                        event.path[1].firstElementChild.lastElementChild.style.display='none';
                        console.log(event.path[1].firstElementChild)
                    })
                $('.small_type').click(function () {
                    setCookie('Navigations',this.innerText,1);
                    tomorecourse();
                })
                // $('.type_a').mouseover(function () {
                //     let typ=event.target.innerHTML;
                //     let mobileMenu = event.path[1];
                //     mobileMenu.firstElementChild.style.display='block';
                //     mobileMenu.firstElementChild.lastElementChild.style.display='block';
                // })
                // $('#tbody1').find('li').mouseout(function () {
                //     event.path[1].firstElementChild.style.display='none';
                //     event.path[1].firstElementChild.lastElementChild.style.display='none';
                //     console.log(event.path[1].firstElementChild)
                // })
                // $('.type_a').mouseout(function () {
                //     let typ=event.target.innerHTML;
                //     let mobileMenu = event.path[1].firstElementChild;
                //
                //     mobileMenu.addEventListener('mouseout',function () {
                //         console.log(mobileMenu)
                //         mobileMenu.style.display='none';
                //     })
                //
                // })
            }
            else alert(result.msg);
        },
        error: function () {
            alert('查询发生错误');
        }
    })

}
//___________________________________________获取左侧导航栏信息______________________________________________
// function login() {
// //
// //
// //     $.ajax({
// //         type: 'post',
// //         url: Path + '/server/authentication/form',
// //         contentType: 'application/x-www-form-urlencoded',
// //         dataType: 'json',
// //         async: true,
// //         data: {
// //             username:document.getElementById('regist_account').value,
// //             password:document.getElementById('regist_account_frist_key').value,
// //             imageCode:document.getElementById('regist_mail').value
// //         },
// //         success: function (result) {
// //             if(result.code=='200'){
// //                 alert('登陆成功');
// //                 window.location='index.html'
// //             }
// //             else alert(result.msg);
// //         },
// //         error: function () {
// //             alert('服务器响应失败');
// //         }
// //     })
// //
// // }
function tologin(){
    window.location.href='login.html'
}

function setCookie(c_name,value,expiredays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function login(){
    $.ajax({
        type: 'POST',
        url: "/server/authentication/form",
        dataType: 'json',
        async: true,
        data: {
            username:document.getElementById('login_account'),
            password:document.getElementById('login_key'),
            imageCode:document.getElementById('login_check'),
        },
        //阻止深度序列化，向后台传送数组
        traditional: true,
        success: function (result) {
            location.href='index.html';

        }
    })
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

//___________________________________________前往登陆交互______________________________________________
$(document).ready(function () {
    if(document.getElementsByTagName('title')[0].innerHTML=='"知行合一"智能助学'){
        // drawPic();
        Navigation_bar_information()
        document.getElementById("main_middle").addEventListener("touchstart", Drag_switch_first);
        document.getElementById("main_middle").addEventListener('touchmove', Drag_switch_second);
    }
    $('body').click(function () {
        $('#MyselfInformation').collapse('hide');
    })
    $('#carousel_Curtain>div>div').click(tomorecourse)

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
            if(result.code=='200') {
                document.getElementsByClassName('logined')[0].innerHTML = "<td>\n" +
                    "                            <embed src=\"svg/student-b.svg\">\n" +
                    "                        </td>\n" +
                    "                        <td>\n" +
                    "                            <div class=\"dropdown\">\n" +
                    "                                <button class=\"btn dropdown-toggle\" data-toggle=\"collapse\" data-target=\"#MyselfInformation\">欢迎您:" + result.data.userName + "<span class=\"glyphicon caret\"></span></button>\n" +
                    "                                <ul id=\"MyselfInformation\" class=\"collapse list-group\">\n" +
                    "                                    <li class=\"list-group-item btn \" onclick=\"window.location.href='MyselfInformation.html'\">个人信息<span class=\"badge\">0</span></li>\n" +
                    "                                    <li class=\"list-group-item btn \">我的空间<span class=\"badge\">0</span></li>\n" +
                    "                                    <li class=\"list-group-item btn \" onclick=\"window.location.href='manage.html'\">课程管理</li>\n" +
                    "                                    <li class=\"list-group-item btn list-group-item-warning\" onclick=\"window.location.href='login.html'\">登出</li>\n" +
                    "                                </ul>\n" +
                    "                            </div>\n" +
                    "                        </td>";
            }

        }
    })
})
