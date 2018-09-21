import Vue from 'vue'

Vue.prototype.getHeader = function () {
  return {
    token:this.getCookie('userToken')
  }
};

Vue.prototype.setCookie = function (name, value, day) {
  let date = new Date();
  date.setDate(date.getDate() + day);
  document.cookie = name + '=' + value + ';expires=' + date;
};


Vue.prototype.getCookie = function (name) {
  let reg = RegExp(name + '=([^;]+)');
  let arr = document.cookie.match(reg);
  if (arr) {
    return arr[1];
  } else {
    return '';
  }
};

Vue.prototype.delCookie = function (name) {
  this.setCookie(name, null, -1);
};
