<template>
  <div class="">
    <!-- <div class="nav">
      <img src="../../../static/image/login/logo.png" class="logo">
      <span class="text-image">交通数据平台系统</span>
    </div> -->
    <div class="container-login">
      <div class="container-block">
        <div class="container">
          <div class="content">
            <div class="content-img">
              <img src="../../../static/image/login/logo.png" class="login-logo">
            </div>
            <div class="user">
              <div class="user-input">
                <img src="../../../static/image/login/user.png" class="user-img">
                <input class="user-text" v-model="username" type="text" v-on:keyup.enter="login"/>
              </div>
              <div class="user-name">用户名</div>
            </div>
            <div class="passward">
              <div class="passward-input">
                <img src="../../../static/image/login/0919-41.png" class="user-img">
                <input class="passward-text" v-model="password" type="password" v-on:keyup.enter="login"/>
              </div>
              <div class="passward-name">密码</div>
            </div>
            <div class="save_password">

              <div class="save_password_el"
                   @click="save_password">

                <div class="empty-retangle">
                  <div class="fill-retangle" v-if="isRecordUser"></div>
                </div>
                <span>保存密码</span>
              </div>
            </div>
            <button class="login-button" @click="login">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!--import $ from 'jquery'-->
import { Message } from 'element-ui';
<script>
  export default {
    name: "login",
    data() {
      return {
        curheigth :document.documentElement.clientHeight,
        isRecordUser: false,
        message: "",
        username: '',
        password: ''
      }
    },
    mounted: function () {
      this.get_username()
    },
    methods: {
      get_username() {
        this.username = window.localStorage.getItem("username") || "";
        this.password = window.localStorage.getItem("password") || "";
        this.isRecordUser = !!this.username;
        // $(".user-text").val(username)
      },
      save_password() {
        if (this.isRecordUser === true) {
          this.isRecordUser = false
        } else {
          this.isRecordUser = true
        }
      },
      login() {
        let self = this;
        if (this.isRecordUser && this.username) {
          window.localStorage.setItem("username", this.username)
          window.localStorage.setItem("password", this.password)
        }
        if(this.username !== '' && this.password !== ''){
          this.$http.post('/login', {username: this.username, password: this.password}) 
            .then((user) => {
              // console.log(user.data.data.nickname)
              if (user.data.status === 2) {
                self.$message({
                  message: '恭喜你,登陆成功',
                  type: 'success',
                  duration: 2000
                });
                this.setStorageInfo(user);
                localStorage.setItem("nickname",user.data.data.nickname)
                localStorage.setItem("type",user.data.data.type)
                localStorage.setItem("username",user.data.data.username)
                self.$router.push({path: '/car/VisualChart'});
              }else if(user.data.status === 1){
                self.$message.error('密码错误,请检测密码');
              }else if(user.data.status === 0){
                self.$message.error('未找到此用户，请联系管理员添加用户');              
              } 
            })
          }else{
            self.$message.error('账号密码不能为空！');              
          }
        },
      setStorageInfo(data) {
        this.setCookie("userToken", data.data.data.token, 3);
        this.setCookie("username", data.data.data.username, 3);
        this.setCookie("password", data.data.data.password, 3);
      },
    }
  }
</script>

<style scoped>
  .container {
    height: 420px;
    width: 400px;
    margin: auto;
    background-color: rgba(53, 61, 79, 0.7);
    box-shadow: 5px 5px 5px #222;
  }

  .container-block {
    position: absolute;
    width: 100%;
    margin: auto;
    top: 25%;
  }

  .content {
    padding: 45px 60px 50px 60px;
  }

  .content-img {
    height: 40px;
    visibility: hidden;
  }

  .empty-retangle {
    width: 11px;
    height: 11px;
    border-radius: 1px;
    border: 1px solid #ed894b;
    margin: 2.5px 5px 0 0;
  }

  .fill-retangle {
    width: 7px;
    height: 7px;
    border-radius: 1px;
    background-color: #ed894b;
    margin: 2px;
  }

  .container-login {
    width: 100%;
    height: 1080px;
    background-image: url("../../../static/image/login/0919-46.png");
    background-size: 100% 1080px;
  }

  .nav {
    height: 80px;
    display: flex;
    align-items: center;
    background-color: #191826;
  }

  .logo {
    margin-left: 30px;
    height: 40px;
    margin-right: 20px;
  }

  .login-logo {
    height: 40px;
  }

  .user {
    padding-top: 40px;
  }

  .passward {
    padding-top: 30px;
  }

  .user-input,
  .passward-input {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #94949a;
    height: 20px;
    padding-bottom: 3px;
  }

  .user-img {
    height: 20px;
  }

  .user-text,
  .passward-text {
    border: none;
    display: block;
    height: 20px;
    background-color: #353D4F;
    width: 240px;
    outline: none;
    margin-left: 20px;
    color: #ffffff !important;
    font-size: 20px;
  }

  .text-image {
    font-size: 23px;
    line-height: 40px;
    color: #94949a;
    padding-left: 10px;
    border-left: 2px solid #94949a;
  }

  .login-button {
    height: 40px;
    width: 280px;
    font-size: 20px;
    color: #ffffff;
    background-color: #D1610F;
    border-radius: 2px;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: none;
    line-height: 40px;
  }

  .save_password_el {
    display: flex;
    align-items: center;
    height: 12px;
    padding-top: 35px;
    padding-bottom: 30px;
    fill: #ffffff;
    line-height: 12px;
    visibility: hidden;

  }

  .user-name,
  .passward-name {
    padding-top: 10px;
    height: 16px;
    color: #94949a;
    font-size: 16px;
  }

  span {
    display: block;
    margin-left: 10px;
  }

  .square {
  ] background-color: #000;
    border: 1px solid white;
    margin: 0;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #353D4F inset;
    -webkit-text-fill-color: #ffffff;
    outline: 0 !important;
    border: none !important;
  }
</style>
