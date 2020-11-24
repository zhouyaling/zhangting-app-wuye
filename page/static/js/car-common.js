
// url
basicUrl = "http://www.tq-service.com/mix2";

// 获取参数
function getQueryString(key) {
    var after = window.location.search;
    if (after.indexOf("?") === -1) {
      after = window.location.hash.split("?")[1];
    } else {
      after = after.substr(1);
    }
    if (after) {
      var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
      var r = after.match(reg);
      if (r != null) {
        return decodeURIComponent(r[2]);
      } else {
        return null;
      }
    }
  }

  // 筛选输入值
  function filterString(code){
    var reg =/[\u4e00-\u9fa5]/g;
    var res = code.replace(/[ ]/g, ""); // 去空格
    res = res.replace(reg,""); // 去中文
    var cha = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/g;
    res = res.replace(cha,"");

    return res.toUpperCase();
  }

  function showAlert(text){
    var htmls = '<div class="alert-box">'+ text +'</div>';
    $('.views').append(htmls);
    var alertTimer = window.setTimeout(function(){
        $('.views .alert-box').remove();
        window.clearTimeout(alertTimer);
    },2000);
  }

  function showLoading(){
    var htmls = ' <div class="loading-box"><img src="./static/img/timg.gif" alt=""></div>';
    $('.views').append(htmls);
  }

    function hideLoading(){
    $('.views .loading-box').remove();
  }
 