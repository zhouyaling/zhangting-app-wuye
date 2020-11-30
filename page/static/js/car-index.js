

var _this = {
    next: 0,
    projectId: "",
    carCode: "",
    areaCode: "渝A",
    showProvince: false,
    carNumberList: [],
    provinces: ["京", "沪", "浙", "苏", "粤", "鲁", "晋", "冀",
        "豫", "川", "渝", "辽", "吉", "黑", "皖", "鄂",
        "津", "贵", "云", "桂", "琼", "青", "新", "藏",
        "蒙", "宁", "Del", "甘", "陕", "闽", "赣", "湘"],
    keyNums: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
        "A", "S", "D", "F", "G", "H", "J", "K", "L",
        "Del", "Z", "X", "C", "V", "B", "N", "M", "确认"]
};


// 展示省份
function showProvince() {
    $("#pro").html("");
    var ss = "";
    for (var i = 0; i < _this.provinces.length; i++) {
        ss = ss + addKeyProvince(i)
    }
    $("#pro").html("<ul class='clearfix ul_pro'>" + ss + "<li class='li_close' onclick='closePro();'><span>确认</span></li></ul>");
}

// 展示输入键盘
function showKeybord() {
    $("#pro").html("");
    var sss = "";
    for (var i = 0; i < _this.keyNums.length; i++) {
        var item = '<span onclick="choosekey(this,' + i + ');">' + _this.keyNums[i] + '</span>';
        if (i == 29) {
            item = '<span  onclick="choosekey(this,' + i + ');"><img class="del-icon" src="./static/img/icon-big-close.png"/></span>';
        }
        sss = sss + '<li class="ikey ikey' + i + ' ' + (i > 9 ? "li_zm" : "li_num") + ' ' + (i > 29 ? "li_w" : "") + '" >' + item + '</li>'
    }
    $("#pro").html("<ul class='clearfix ul_keybord'>" + sss + "</ul>");
}

// 渲染省份
function addKeyProvince(provinceIds) {
    var item = '<span onclick="chooseProvince(this);">' + _this.provinces[provinceIds] + '</span>';
    if (provinceIds == 26) {
        item = '<span  onclick="cleanPro()"><img class="del-icon" src="./static/img/icon-big-close.png"/></span>';
    } else {

    }
    var addHtml = '<li>';
    addHtml += item;
    addHtml += '</li>';
    return addHtml;
}

// 选择省份
function chooseProvince(obj) {
    $(".input_pro span").text($(obj).text());
    $(".input_pro").addClass("hasPro");
    $(".input_pp").find("span").text("");
    $(".ppHas").removeClass("ppHas");
    $(".input_pp:eq(5)").addClass('spec-text');
    $(".input_pp:eq(5)").find('span').text('新能源');
    _this.next = -1;
    showKeybord();
}

// 选择键盘输入值
function choosekey(obj, jj) {
    if (jj == 37) {
        layer.closeAll();
    } else if (jj == 29) {
        if ($(".ppHas").length == 0) {
            $(".hasPro").find("span").text("");
            $(".hasPro").removeClass("hasPro");
            showProvince();
            _this.next = -1;
        }
        $(".ppHas:last").find("span").text("");
        $(".ppHas:last").removeClass("ppHas");
        _this.next = _this.next - 1;

        $(".input_pp:eq(5)").addClass('spec-text');
        $(".input_pp:eq(5)").find('span').text('新能源');
    } else {
        if (_this.next >= 4) {
            $('.form-btn').addClass("active");
        }
        if (_this.next > 5) {
            return
        }
        if (_this.next == -1) {
            if (jj < 10) {
                /* layer.open({
                    content: '车牌第二位为字母',
                    skin: 'msg',
                    time: 1
                }); */
                showAlert("车牌第二位为字母");
                return
            }

            var d = $(".input_pro span").text() + $(obj).text();
            $(".input_pro span").text(d);
            _this.next = _this.next + 1;
        } else {
            for (var i = 0; i < $(".input_pp").length; i++) {

                $(".input_pp:eq(" + _this.next + ")").find("span").text($(obj).text());
                $(".input_pp:eq(" + _this.next + ")").addClass("ppHas");
                if (_this.next > 4) {
                    $(".input_pp:eq(5)").removeClass('spec-text');
                }
                _this.next = _this.next + 1;
                if (_this.next > 5) {
                    _this.next = 6;
                }
                getpai();
                return
            }
        }

    }
}

// 关闭
function closePro() {
    layer.closeAll()
}

// 清除
function cleanPro() {
    $(".ul_input").find("span").text("");
    $(".hasPro").removeClass("hasPro");
    $(".ppHas").removeClass("ppHas");
    $(".input_pp:eq(5)").addClass('spec-text');
    $(".input_pp:eq(5)").find('span').text('新能源');
    _this.next = -1;
}

// 空格处理
function trimStr(str) { return str.replace(/(^\s*)|(\s*$)/g, ""); }

function getpai() {
    var pai = trimStr($(".car_input").text());
    $(".car_input").attr("data-pai", pai);
}


// 添加监听事件
window.onload = function () {
    $(".input_pro").click(function () {
        layer.open({
            type: 1
            , content: '<div id="pro"></div>'
            , anim: 'up'
            , shade: false
            , style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
        });
        showProvince()
    })
    $(".input_pp").click(function () {
        if ($(".input_pro").hasClass("hasPro")) { // 如果已选择省份
            layer.open({
                type: 1
                , content: '<div id="pro"></div>'
                , anim: 'up'
                , shade: false
                , style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
            });
            showKeybord()
        } else {
            $(".input_pro").click()
        }
    })
}

// 查询
function search() {
    _this.areaCode = $('.input_pro span').text();
    _this.carCode = "";
    $.each($('.input_pp'), function (index, item) {
        if ($(item).find('span').text() && $(item).find('span').text() != '新能源') {
            _this.carCode += $(item).find('span').text();
        }
    });

    if (!(_this.carCode && _this.carCode.length >= 5 && _this.areaCode)) {
        return;
    }
    showLoading();
    setCarNumber();
    window.location.href = "info.html?projectId=" + _this.projectId + "&carNo=" + _this.areaCode + _this.carCode;
}

// 选择一个历史车牌记录
function selectNumber(item) {
    $.each($('.input_pp'), function (index, item) {
        $(item).find('span').text("");
        if (index == 5) {
            $(".input_pp:eq(5)").addClass('spec-text');
            $(".input_pp:eq(5)").find('span').text('新能源');
        }
    });

    _this.areaCode = item.split(" ").length > 0 ? item.split(" ")[0] : "";
    _this.carCode = item.split(" ").length > 1 ? item.split(" ")[1] : "";

    $(".input_pro span").text(_this.areaCode);
    _this.next = -1;
    for (var i = 0; i < _this.carCode.length; i++) {
        $(".input_pp:eq(" + i + ")").find("span").text(_this.carCode[i]);
        $(".input_pp:eq(" + i + ")").addClass("ppHas");
        if (_this.next > 3) {
            $('.form-btn').addClass("active");
        }
        if (_this.next > 4) {
            $(".input_pp:eq(5)").removeClass('spec-text');

        }
        _this.next = i + 1;
        getpai();
    }

}

// 删除一个历史车牌记录
function deleteNumber(item) {
    var resdata = localStorage.getItem("carlist");
    if (resdata) {
        var newdata = resdata.replace(item + ",", "");
        localStorage.setItem("carlist", newdata);
        getCarNumberList();
    }
}

// 缓存车牌号记录
function setCarNumber() {
    var itemdata = (_this.areaCode + " " + _this.carCode).toUpperCase();
    var resdata = localStorage.getItem("carlist") || "";
    if (resdata.indexOf(itemdata) < 0) {
        var resarray = resdata.split(",");
        resarray.unshift(itemdata);
        localStorage.setItem("carlist", resarray.join());
    }
}

// 获取历史车牌号
function getCarNumberList() {
    var resdata = localStorage.getItem("carlist") || "";
    _this.carNumberList = resdata.split(",");
    var tpl = template(document.getElementById('tpl').innerHTML);
    var html = tpl({ list: _this.carNumberList });
    $('#numberList').html(html);
}

// 初始化
$(document).ready(function () {
    getCarNumberList();
    _this.projectId = getQueryString("projectId") ? getQueryString("projectId") : "";
});