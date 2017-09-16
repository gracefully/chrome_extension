/**
 * Created by Administrator on 2017/9/16.
 */
function log(msg) {
    console.log(msg);
}
var opt = {
    type: "list",
    title: "桌面提醒",
    message: "msg",
    iconUrl: "images/logo.jpg",
    items: [{ title: "1.", message: "下班了"},
        { title: "2.", message: "吃饭了."},
        { title: "3.", message: "中奖了."}]
}
chrome.notifications.create('',opt,function(id){
})
chrome.management.getAll(function(exInfoArray){
    console.log(exInfoArray);
});

videoMis = {
    "logo": "logo.jpg",
    "click": function () {
        if(videoMis.logo == 'logo.jpg'){
            chrome.browserAction.setIcon({"path":{"19":"images/test.jpg"}});
            videoMis.logo = 'test.jpg';
        }
        else{
            chrome.browserAction.setIcon({"path":{"19":"images/logo.jpg"}});
            videoMis.logo = 'logo.jpg';
        }
        chrome.browserAction.setBadgeBackgroundColor({color: '#0000FF'});
        // chrome.browserAction.setBadgeBackgroundColor({color: [0, 255, 0, 128]});
        chrome.browserAction.setBadgeText({text: ''});
    }
}
$(function () {
    $("#setIcon").click(function () {
        videoMis.click();
    });
    var html = "<div id='tips' style='position:fixed;left:45px;min-width:00px;max-height:515px;overflow-y:auto;top:28px;background:#C5E1FD;padding:10px;border-radius:10px;'>提示帮助可以展示在这里</div>";
    // $("body").append(html);
    $.ajax({
        "type": 'GET',
        'url': 'http://yq01-videowise-rd2.epc.baidu.com:8080/daily/Test.php?a=execute56',
        'success': function (response) {
            var json = $.parseJSON(response);
            console.log(json)
            var html = "<table>";
            for(var i in json) {
                html += "<tr><td style='text-align:left'>"+i+"</td><td style='text-align:left'>"+json[i]+"</td></tr>";
            }
            html += "</table>";
            $("#channel_lists").html(html);
        },
        'error': function () {
            alert(" request error!");
        }
    });
    // db = openDatabase("test", "0.1", "This is a test db.", 1024*1024);
    // if(!db){
    //     alert('数据库连接失败。');
    // }
    // else {
    //     db.transaction( function(tx) {
    //         tx.executeSql(
    //             "SELECT COUNT(*) FROM db_name",
    //             [],
    //             function(tx, result){
    //                 console.log(result);
    //             },
    //             function(tx, error){
    //                 alert('查询失败：'+error.message);
    //             }
    //         );
    //     })
    // }
    console.log(localStorage)
    chrome.storage.sync.set({"test":"aaa"},function () {
        log("stored");
    });
    chrome.storage.onChanged.addListener(function(changes, areaName){
        console.log('Value in '+areaName+' has been changed:');
        console.log(changes);
    });
    chrome.storage.sync.set({"test":"bba"},function () {
        log("changed");
    });
    chrome.storage.sync.set({"test":"bca"},function () {
        log("changed");
    });
    // chrome.runtime.sendMessage('Hello', function(response){
    //     document.write(response);
    // });
    //一二三线切换
    $("input[type='radio']").each(function (k,v) {
        var old = localStorage.city_switch;
        if($(v).val() == old) {
            $(v).attr("checked","checked");
        }else{
            $(v).removeAttr("checked");
        }
    })
    $("input[type='radio']").click(function () {
        localStorage.city_switch = $(this).val();
        log(localStorage.city_switch);
    });
})