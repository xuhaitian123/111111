<template>
  <div class="container-login">
    <div class="nav">
      <img src="../../../static/image/login/logo.png" class="logo">
      <span class="text-image">交通数据平台系统</span>
    </div>
  <div class="container">
    <div class="content">
      <div class="content-img">
<img src="../../../static/image/login/logo.png" class="login-logo">
      </div>
      <div class="user">
        <div class="user-input">
          <img src="../../../static/image/login/user.png" class="user-img">
          <input class="user-text" type="text"/>
        </div>
        <div class="user-name">用户名</div>
      </div>
      <div class="passward">
        <div class="passward-input">
          <img src="../../../static/image/login/user.png" class="user-img">
          <input class="passward-text" type="password"/>
        </div>
        <div class="passward-name">密码</div>
      </div>
      <div class="save_password">
        <div  class="save_password_el">
          <input type="checkbox"  class="square" @change="save_password" /><span style="color: #ffffff;font-size: 13px">保存密码</span>
        </div>
      </div>
      <button class="login-button" @click="login">登录</button>
    </div>

  </div>
    </div>
</template>
import $ from 'jquery'
import { Message } from 'element-ui';
<script>
  export default {
    name: "login",
    data() {
      return {
        checked: false,
        message:""
      }
    },
    mounted:function () {
      this.get_username()
    },
    methods: {
      get_username(){
        this.checked =false
        console.log(this.checked)
        var username = window.localStorage.getItem("username")|| ""
        $(".user-text").val(username)
      },
      save_password() {
        if(this.checked ==true){
          this.checked = false
        }else {
          this.checked =true
        }
      },
      login(){
        var self =this
        var username =$(".user-text").val();
        var password = $('.passward-text').val()
        console.log(username)
        $.ajax( {
          url:'/',
          data:{
            Username:username,
            Password:password,
          },
          type:'post',
          dataType:'json',
          success:function(data) {
            if(self.checked == true){
              console.log(self.checked)
              window.localStorage.setItem("username",username)
            }
            self.$message({
              message: '恭喜你,登陆成功',
              type: 'success',
              duration:2000
            });
              console.log("登录成功")
              self.$router.push({path: '/'});
          },
          error : function(res) {
            console.log("登录失败")
            if(self.checked == true){
              console.log(self.checked)
              window.localStorage.setItem("username",username)
            }
            self.$message.error('用户名或密码错误');
          }
        });
        console.log(username+password)
      }
    }
  }
</script>

<style  scoped>
  .container {
    height: 420px;
    width: 400px;
    margin: 270px auto 290px;
    background-color: #353D4F;
  }
  .content{
    padding: 45px 60px 50px 60px;
  }
  .content-img{
    height: 40px;
  }

  .container-login {
    width: 100%;
    height: 1080px;
    background-image: url("../../../static/image/login/bkg.png");
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
  .user
  {
    padding-top: 40px;
  }
  .passward{
    padding-top: 30px;
  }
  .user-input,
  .passward-input{
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #94949a;
    height: 20px;
    padding-bottom: 3px;
  }
  .user-img{
    height: 20px;
  }
  .user-text,
  .passward-text{
    border:none;
    display: block;
    height: 20px;
    background-color:#353D4F;
    width: 240px;
      outline:none;
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
  .login-button{
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
  .save_password_el{
    display: flex;
    align-items: center;
    height: 12px;
    padding-top: 35px;
    padding-bottom: 30px;
    fill: #ffffff;
    line-height: 12px;

  }
  .user-name,
  .passward-name{
    padding-top:10px;
    height: 16px;
    color: #94949a;

  }
  span{
    display: block;
    margin-left: 10px;
  }
  .square{
    ]
    background-color: #000;
    border: 1px solid white;
    margin: 0;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #353D4F inset;
    -webkit-text-fill-color: #ffffff;
    outline: 0 !important;
    border:none !important;
  }
</style>
