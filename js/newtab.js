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
            for (var i in json) {
                html += "<tr><td style='text-align:left'>" + i + "</td><td style='text-align:left'>" + json[i] + "</td></tr>";
            }
            html += "</table>";
            $("#channel_lists").html(html);
        },
        'error': function () {
            alert(" request error!");
        }
    });
})