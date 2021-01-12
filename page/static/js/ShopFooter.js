var projectId = GetQueryString("projectId"); //项目id
var patrolUserId = GetQueryString("patrolUserId"); //巡检用户id

var patrolUserName = GetQueryString("patrolUserName"); //巡检用户姓名

var projectName = GetQueryString("projectName"); //项目名称
var patrolPhone = GetQueryString("patrolPhone"); //巡检人电话号码

var handleState = GetQueryString("handleState");
var userId = GetQueryString("patrolUserId");
var id = GetQueryString("id");
var houseId = GetQueryString("houseId");
var houseNo = GetQueryString("houseNo");
var role = GetQueryString("role"); //角色
var planId = GetQueryString("planId");
var applyId = GetQueryString("applyId");
var resultState = GetQueryString("resultState");
var projectName = GetQueryString("projectName");
var CompanyName = GetQueryString("CompanyName");
var handleStateRL = GetQueryString("handleStateRL"); //违章记录的操作权限
var indexfetchurl = '&patrolUserId=' + patrolUserId + '&patrolUserName=' + patrolUserName + '&projectName=' + encodeURI(projectName) + '&patrolPhone=' + patrolPhone + '&projectId=' + projectId + '&role=' + role + '&handleState=' + handleState;
var reportInfoList = []


function requertUrl(conT, funC) {
    return "http://api.tq-service.com/fitment/" + conT + "/" + funC;
}

function serverUrl() {
    return "http://api.tq-service.com/fitment";
}

function getRecordListHtml() {
    window.location.href = "getRecordList.html?" + indexfetchurl;
}

//将/Date(1436950081770)/的字符串转成时间
function GetDateFormat(dateStr) {
    var creationTime = dateStr;
    var start = creationTime.indexOf('(');
    var rnd = creationTime.lastIndexOf(')');
    creationTime = creationTime.substring(start + 1, rnd);
    var dateTime = new Date(parseInt(creationTime));
    //当前月份+1
    var D = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
    with (dateTime || new Date) return [
        [getFullYear(), D[getMonth() + 1] || getMonth() + 1, D[getDate()] || getDate()].join('-'), [D[getHours()] || getHours(), D[getMinutes()] || getMinutes(), D[getSeconds()] || getSeconds()].join(':')
    ].join(' ');
}

//初始化商品评分
function BindGoodsRaty(goodsId) {
    $('#' + goodsId).raty({
        cancelOff: '/Scripts/raty/img/cancel-off-big.png',
        cancelOn: '/Scripts/raty/img/cancel-on-big.png',
        size: 24,
        score: 3,
        starHalf: '/Scripts/raty/img/star-half-big.png',
        starOff: '/Scripts/raty/img/star-off-big.png',
        starOn: '/Scripts/raty/img/star-on-big.png'
    });
}

//返回顶部
function pageScroll() {
    //把内容滚动指定的像素数（第一个参数是向右滚动的像素数，第二个参数是向下滚动的像素数）
    window.scrollBy(0, -1000);
    //延时递归调用，模拟滚动向上效果
    scrolldelay = setTimeout('pageScroll()', 10);
    //获取scrollTop值，声明了DTD的标准网页取document.documentElement.scrollTop，否则取document.body.scrollTop；因为二者只有一个会生效，另一个就恒为0，所以取和值可以得到网页的真正的scrollTop值
    var sTop = document.documentElement.scrollTop + document.body.scrollTop;
    //判断当页面到达顶部，取消延时代码（否则页面滚动到顶部会无法再向下正常浏览页面）
    if (sTop == 0) clearTimeout(scrolldelay);
}



//反馈类型文本内容
function test(x) {
    switch (x) {
        case 0:
            return "功能意见";
            break;
        case 1:
            return "页面意见";
            break;
        case 2:
            ;
            return "你的新需求";
            break;
        case 3:
            ;
            return "操作意见";
            break;
        default:
            return "";
    }

}

//json日期格式转换为正常格式
function jsonDateFormatM(num) {
    try {
        var date = new Date(new Date().getTime() - num * 86400000);
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        return date.getFullYear() + "-" + month + "-" + day;
    } catch (ex) {
        return "";
    }
}
//json日期格式转换为正常格式
function jsonDateFormat(num) {
    try {
        var date = new Date(new Date().getTime() - num * 60000);
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    } catch (ex) {
        return "";
    }
}
//json日期格式转换为正常格式
function jsonDateFormatToDay(jsonDate) {
    try {
        var date = new Date(parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        return date.getFullYear() + "-" + month + "-" + day;
    } catch (ex) {
        return "";
    }
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

function onmethon() {
    var tempurl = "http://10.15.208.109:9091/fitmentCountController/countFitmentStatus";
    var tempterm = "projectId=209";
    $.get("../Ashx/GetApiHandler.ashx", { "Url": tempurl, "Term": tempterm }, function (result) {
        var obj = JSON.parse(result);
        if (obj.errcode == 200) { } else {
            alert(obj.errmsg)
        }

    });
}

function isocamera() {
    window.webkit.messageHandlers.camera.postMessage("");

}

// 星期
var weekGroup = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
function GetQueryWeekString() {
    var date = new Date();
    console.log(date.getDay());
    return weekGroup[date.getDay() - 1]
}

// 初始化socket
var ws = null;
function initSocket() {
    if (window.ReconnectingWebSocket) {
        ws = new ReconnectingWebSocket('ws://47.95.35.97:80'); // ws://47.95.35.97:80
        ws.onopen = function (e) {
            console.log("连接服务器成功");
            var item = {};
            item.type = "regist";
            item.server = "";
            item.value = "server2010701";
            item.order = [];
            ws.send(JSON.stringify(item));
        }
        ws.onclose = function (e) {
            console.log("服务器关闭");
        }
        ws.onerror = function () {
            console.log("连接出错");
        }
        ws.onmessage = function (e) {
            var item = JSON.parse(e.data);
            console.log(item);
            showBi(item);
            var item = order("1");
            ws.send(JSON.stringify(item));
        }
    }
}

//传入的名称
function showBi(item) {
    if (item && item.showImg && item.showImg == "zt_report") {
        var dataRes = [];
        dataRes.push(item)
        var cacheD = sessionStorage.getItem("reportInfoList")
        if (cacheD && cacheD != undefined && cacheD != null) {
            dataRes.push(JSON.parse(cacheD))
        }

        sessionStorage.setItem("reportInfoList", JSON.stringify(dataRes))

        if (typeof (loadData) === "function") {
            loadData();
        }
        showInfo();
    }
}

function order(_status) {
    var item = {};
    item.type = "order";
    item.server = "client2010701"; //识别客户端
    item.value = "";
    item.order = [];
    var jObj = {
        status: "1",
    };
    item.order.push(jObj)
    return item;
}

function showInfo() {
    $('.dialog-msg').remove();
    var htmls = "<div class='dialog-msg'><div class='card'><div>你收到一条报事消息,请及时处理</div></div></div>"
    $('body').append(htmls)
    window.setTimeout(function () {
        $('.dialog-msg').fadeOut();
    }, 2000)

}