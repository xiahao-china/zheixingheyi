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
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function randomColor(min, max) {
    var r = randomNum(min, max);
    var g = randomNum(min, max);
    var b = randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
}
var check = "";
function drawPic() {
    var canvas = document.getElementById("canvase");
    var width = canvas.width;
    var height = canvas.height;
    var ctx = canvas.getContext("2d");
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = randomColor(180, 240);
    ctx.fillRect(0, 0, width, height);
    var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
    for (var i = 0; i < 4; i++) {
        var txt = str[randomNum(0, str.length)];
        check = check + txt;
        ctx.fillStyle = randomColor(50, 160); 
        ctx.font = randomNum(15, 40) + 'px SimHei';
        var x = 10 + i * 25;
        var y = randomNum(25, 45);
        var deg = randomNum(-45, 45);
        ctx.translate(x, y);
        ctx.rotate(deg * Math.PI / 180);
        ctx.fillText(txt, 0, 0);
        ctx.rotate(-deg * Math.PI / 180);
        ctx.translate(-x, -y);
    }
    for (var i = 0; i < 8; i++) {
        ctx.strokeStyle = randomColor(40, 180);
        ctx.beginPath();
        ctx.moveTo(randomNum(0, width), randomNum(0, height));
        ctx.lineTo(randomNum(0, width), randomNum(0, height));
        ctx.stroke();
    }
    for (var i = 0; i < 100; i++) {
        ctx.fillStyle = randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
        ctx.fill();
    }
}
//____________________________________________登陆交互______________________________________________

function login() {
    var bllon = check_account('username', 'login_account_check_end') & check_account('password', 'login_account_key_end') & check_Verification_code('login_check', 'verification_check_end');
    alert(bllon);
    if (bllon == 1) {
        $.post("undefine", {
            "username": $("input[name='username']").val(),
            "password": $("input[name='password']").val(),
        }, alert("成功"))

    }
    else {
        alert("您输入的信息有误");
    }

}

//____________________________________________执行______________________________________________

var Drag_switch_first_data;
function Drag_switch_first() {
    Drag_switch_first_data = window.screenX || window.event.screenX;
}
function Drag_switch_second() {
    var Drag_switch_second_data = window.screenX || window.event.screenX;

    if ((Drag_switch_second_data - Drag_switch_first_data) > 50)
    {
        $('#tree_carousel').carousel('next');
    }
}

//___________________________________________拖动切换______________________________________________
$(document).ready(function () {

    drawPic();
})
