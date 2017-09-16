/**
 * Created by Administrator on 2017/9/16.
 */
console.log("loading background.js")
function log(msg) {
    console.log(msg)
}
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message == 'Hello'){
        sendResponse('Hello from background.');
    }
});
chrome.contextMenus.create({
    type: 'normal',
    title: 'Menu A',
    id: 'a'
});

chrome.contextMenus.create({
    type: 'radio',
    title: 'Menu B',
    id: 'b',
    checked: true
});

chrome.contextMenus.create({
    type: 'radio',
    title: 'Menu C',
    id: 'c'
});

chrome.contextMenus.create({
    type: 'checkbox',
    title: 'Menu D',
    id: 'd',
    checked: true
});

chrome.contextMenus.create({
    type: 'separator'
});

chrome.contextMenus.create({
    type: 'checkbox',
    title: 'Menu E',
    id: 'e'
});

chrome.contextMenus.create({
    type: 'normal',
    title: 'Menu F',
    id: 'f',
    parentId: 'a'
});

chrome.contextMenus.create({
    type: 'normal',
    title: 'Menu G',
    id: 'g',
    parentId: 'a'
});
chrome.contextMenus.create({
    type: 'normal',
    title: '使用Google翻译……',
    contexts: ['selection'],
    id: 'cn',
    onclick: translate
});
function translate(info, tab){
    var url = 'http://translate.google.com.hk/#auto/zh-CN/'+info.selectionText ;
    window.open(url, '_blank');
}
chrome.webRequest.onBeforeRequest.addListener(
    function (details){
        log(details)
        var sw = 1;
        chrome.storage.sync.get("test",function (res) {
                sw = res;
        });
        if(res == 2){
            log(2)
            return {redirectUrl: details.url+"&ip=124.134.25.231"};
        }
    },
    {
        urls: [
            "*://app.video.baidu.com/*"
        ]
    },
    [
        "blocking"
    ]
);
chrome.storage.onChanged.addListener(function(changes, areaName){
    clearInterval(it);
    console.log('Value in '+areaName+' has been changed:');
    console.log(changes);
});
var d = new Date();
var date = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDay();
localStorage.removeItem(date+"_times");
var it = setInterval(function () {
    var d = new Date();
    var day = d.getDay();
    log(day)
    var date = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDay();
    localStorage[date+"_times"] = localStorage[date+"_times"] || 0;
    log(date)
    var times = parseInt(localStorage[date+"_times"]);
    log(times)
    //周五才发
    if(day != 5) {
        return false;
    }
    if(parseInt(times)>29){
        return false;
    }
    localStorage[date+"_times"] = parseInt(times) + 1;
    var opt = {
        type: "list",
        title: "周报提醒",
        message: "msg",
        iconUrl: "images/logo.jpg",
        items: [{ title: "", message: "写周报"}]
    }
    chrome.notifications.create('',opt,function(id){
    })
},60000)