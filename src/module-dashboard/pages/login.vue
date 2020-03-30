<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <h3 class="title"><img src="./../assets/login-logo.png"></h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-button class="loginBtn" type="primary" style="width:49%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>
      <el-button class="loginBtn" type="primary" style="width:49%;margin-bottom:30px; margin-left:0" @click="handlecode">刷脸登录</el-button>
      <div class="regInfo"><router-link :to="{'path':'/reg'}">还没有账号？立即注册</router-link></div>

      <!-- <el-button class="thirdparty-button" type="primary" @click="showDialog=true">{{$t('login.thirdparty')}}</el-button> -->
    </el-form>

    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog" append-to-body>
      {{$t('login.thirdpartyTips')}}
      <br/>
      <br/>
      <br/>
      <login-social-signin />
    </el-dialog>

    <!-- 二维码弹层 -->
    <el-dialog
      title="扫一扫"
      :visible.sync="centerDialogVisible"
      width="240px"
      align='center'
      class="code">
      <span><img class="customerHead" :src="param.qrcode" alt=""></span>
    </el-dialog>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import loginSocialSignin from './../components/loginSocialSignin'
import shajs from 'sha.js'
import { qrcode, codeCheck } from '@/api/base/faceLogin'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  components: { LangSelect, loginSocialSignin },
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('用户名不能小于6位'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      centerDialogVisible:false,
      param: {
        qrcode: ''
      },
      loginForm: {
        username: '13800000002',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      states: '-1',
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      if(this.loginForm.username.length < 6 || this.loginForm.password.length < 6){
        this.$message.error('用户名或密码不能低于6位')
        return; 
      }
      this.loading = true
      this.$store
        .dispatch('LoginByUsername', {
          mobile: this.loginForm.username,
          password: this.loginForm.password
        }).then(res => {
          this.loading = false
          this.$router.push({ path: '/' })
        }).catch(() => {
          this.loading = false
        })
    },
    // 验证码
    handlecode() {
      qrcode().then(res => {
        this.param.qrcode = res.data.data.file
        this.centerDialogVisible = true
        this.codeCheckInfo = res.data.code
        setInterval(() => {
          if (this.states == '-1') {
          codeCheck({ code: res.data.data.code }).then(res => {
            this.states = res.data.data.state
            this.token = res.data.data.token
            if (this.states == '1') {
              // 登录
              if(this.token && this.token != undefined) {
                setToken(this.token)
                this.$store.commit('SET_TOKEN', this.token)
                this.$router.push({ path: '/' })
              }
            } 
            if (this.states == '0') {
              // 关闭
              this.centerDialogVisible = false
            }
          })
        }
        }, 1000 * 5)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #68b0fe;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    color: #454545;
  }
}
.code {
  .el-dialog__body {
    padding: 15px 0;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  // position: fixed;
  height: 100%;
  width: 100%;
  background: url(./../assets/login.jpg) 50% 50% no-repeat;
  .login-form {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    width: 520px;
    min-height: 400px;
    padding: 35px 35px 15px 35px;
    margin: -260px auto 0;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
.loginBtn {
  background: #407ffe;
  height: 64px;
  line-height: 32px;
  font-size: 24px;
}
.el-form-item {
  margin-bottom: 20px;
}
.regInfo {
  text-align: center;
  color: #fff;
  font-size: 16px;
}
</style>