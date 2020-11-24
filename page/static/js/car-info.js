var _this ={
    projectId: "",
    carNo: "",
    inTime: "",
    searchTime: "",
    payAmount: 0,
    freeTimeOut: 10,
};

// 查询
// function search() {
//      showLoading();
//     $.ajax({
//         method: "post",
//         url:basicUrl +"/parking/fee/ajaxgetfee?carNo=" + _this.carNo,
//         dataType:"json",
//         success:function(data) {
//             hideLoading();
//             if (data.code == 200) {
//                 _this.inTime = data.ta.inTime;
//                 _this.searchTime = data.searchTime;
//                 _this.payAmount = data.payAmount;
//                 _this.freeTimeOut = data.freeTimeOut;
//                 $('#cpayAmount').html(_this.payAmount);
//                 $('#inTime').html(_this.inTime);
//                 $('#csearchTime').html(_this.searchTime);
//                 $('#freeTimeOut').html(_this.freeTimeOut);
//               } else {
//                 showAlert(data.msg);
//               }
//         },
//         error:function(err){
//             hideLoading();
//             showAlert("车辆信息查询失败");
//         }
//     })
//   }

  // 刷新
  function refresh() {
    // search();
  }

  // 缴费
  function payAction() {
       showLoading();
    $.ajax({
    method: "post",
    url:basicUrl +"/parking/fee/ajaxGetPayParams?projectId=" + _this.projectId + "&carNo=" + _this.carNo,
    dataType:"json",
    success:function(data) {
        hideLoading();
        if (data.code == 200) {
            if (data.data.type == "form") {
                var UrlForm = data.data.value;
                var reg = new RegExp( "<input type='hidden' name='charset' value='UTF-8'/>", "g" );
                var sss = UrlForm.replace(reg, "");
                $('#payhtml').html(sss);
              } else if (data.data.type == "url") {
                window.location.href = data.data.value;
              }
            } else {
            showAlert(data.msg);
            }
        },
        error:function(err){
            hideLoading();
            showAlert("缴费失败");
        }
    })
  }

$(document).ready(function(){
    _this.projectId = getQueryString("projectId") ? getQueryString("projectId") : "";
    _this.carNo = getQueryString("carNo") ? getQueryString("carNo") : "";
    $('#carNo').html(_this.carNo);
    search();
});