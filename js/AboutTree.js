function saveTree(){
    kmsjsmap.save(function (data) {
        console.log(data);
        data= JSON.parse(JSON.stringify(data).replace(/topic/g,"nodeName"));
        data= JSON.parse(JSON.stringify(data).replace(/direction/g,"details"));
        data= JSON.parse(JSON.stringify(data).replace(/badge/g,"status"));
        data= JSON.parse(JSON.stringify(data).replace(/parentid/g,"parentId"));
        console.log(data);
        $.ajax({
            type: 'POST',
            url:'http://47.106.247.251:8004/treeKnow/treeNodeManager/saveTreeNodeList',
            contentType: 'application/json',
            dataType: 'json',
            async: true,
            data: JSON.stringify(data),
            //阻止深度序列化，向后台传送数组
            traditional: true,
            success: function (result) {
                console.log(result);
            }
        })
    })
}
function Managementtree(){                       //管理树
    $.ajax({
        type: 'POST',
        url: "http://47.106.247.251:8004/treeKnow/treeNodeManager/list",
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
            treeRootId:document.getElementsByClassName('treename')[0].value,
        },
        success: function (result) {
            information.outname='Managementtree';
            $('#state').addClass('label-success');
            $('#msg').addClass('label-primary');
            document.getElementById('msg_information').innerHTML='成功';
            alert('操作成功');
            outtree(result);
        },
        error: function () {
            alert('对服务器发送信息出现问题');
        }
    });
}
