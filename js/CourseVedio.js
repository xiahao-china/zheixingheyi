let key={
    VLkey:1
}
$(document).ready(function () {
    $('#shrink>button').click(function () {
        let Twidth=$('#VedioList')[0].clientWidth;
        if (key.VLkey) {
            document.getElementById('VedioList').style.transform="translateX("+Twidth+"px)";
            document.getElementById('shrink').firstElementChild.innerHTML="弹出<br>课表";
            key.VLkey=!key.VLkey
            $('#VedioList').addClass('VideoListToHide');
            document.getElementById('Vedio').style.width=$('#Vedio')[0].clientWidth+Twidth-100+'px';
        }
        else {
            document.getElementById('VedioList').style.transform="translateX(0)";
            document.getElementById('shrink').firstElementChild.innerHTML="收起<br>课表";
            key.VLkey=!key.VLkey
            $('#VedioList').removeClass('VideoListToHide');
            document.getElementById('Vedio').style.width=$('#Vedio')[0].clientWidth-Twidth+100+'px';
        }

    })
})