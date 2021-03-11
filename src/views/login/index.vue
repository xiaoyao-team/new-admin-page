<template>
  <div class="login-page">
    <div class="login-form">
      <div class="form-header">
        <span>{{title}}</span>
      </div>
      <el-form
        ref="loginForm"
        label-position="left"
        label-width="50px"
        :model="loginForm"
        :rules="loginRules"
        autocomplete="on"
      >
        <el-form-item label="帐号:" prop="account">
          <el-input v-model="loginForm.account" ref="account" placeholder="请输入帐号"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="loginForm.password" type="password" ref="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- <el-form-item style="text-align: right; margin: -10px 0 10px 0;">
          <el-checkbox v-model="isRemenber" label="记住密码" size="medium"></el-checkbox>
        </el-form-item> -->
        <el-button class="login-btn" type="primary" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { LoginModule } from '@/store/modules/login'
import { Form as ElForm, Input } from 'element-ui'
export default Vue.extend({
  data() {
    const validateaAccount = (rule: any, value: string, callback: Function) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    const validatePass = (rule: any, value: string, callback: Function) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      title: "活动管理平台",
      loginForm: {
        account: "",
        password: ""
      },
      loginRules: {
        account: [{ validator: validateaAccount, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      },
      isRemenber: false
    };
  },
  mounted() {
    if (this.loginForm.account === '') {
      (this.$refs.account as Input).focus()
    } else if (this.loginForm.password === '') {
      (this.$refs.password as Input).focus()
    }
    this.initLocalloginForm();
  },
  methods: {

    initLocalloginForm() {
      // try {
      //   let encryptStr = localStorage.cookieUser || "";
      //   if (!encryptStr) throw "local info is null";
      //   let bytes = AES.decrypt(encryptStr, "activity");
      //   let decryptedData = JSON.parse(bytes.toString(enc.Utf8));
      //   this.account = decryptedData.username;
      //   this.password = decryptedData.password;
      //   this.isRemenber = decryptedData.isRemenber;
      // } catch (e) {
      //   this.account = "";
      //   this.password = "";
      // }
    },
    focusToPwd: function() {
      // this.$refs.pwd.focus();
    },
    saveLocalInfo() {
      // if (this.isRemenber) {
      //   /* 用户信息加密存储到本地 */
      //   let data = {
      //     username: this.account,
      //     password: this.password,
      //     isRemenber: this.isRemenber
      //   };
      //   // Encrypt
      //   localStorage.cookieUser = AES.encrypt(
      //     JSON.stringify(data),
      //     "activity"
      //   ).toString();
      // } else {
      //   localStorage.cookieUser = "";
      // }
    },
    login: function() {
      (this.$refs.loginForm as ElForm).validate(async(valid: boolean) => {
        if (valid) {
          await LoginModule.Login(this.loginForm)
          // services.activity.login(this.loginForm).then((data:any) => {
            // this.saveLocalInfo();
            // let code = this.account + ":" + this.password;
            // this.$store.commit("setUserInfo", {
            //   username: this.account,
            //   password: this.password
            // });
            // this.$store.commit("setLoginCode", code);
            // this.$router.push({ name: "home" });
          // });
        }
      })
      // if (!this.account || !this.password) {
      //   this.$message({
      //     message: "请输入用户名密码",
      //     type: "warning"
      //   });
      //   return;
      // }
      // let params  = {
      //   userName: this.account,
      //   passWord: md5(this.password)
      // };
      // services.activity.login(params).then(data => {
      //   this.saveLocalInfo();
      //   let code = this.account + ":" + this.password;
      //   this.$store.commit("setloginForm", {
      //     username: this.account,
      //     password: this.password
      //   });
      //   this.$store.commit("setLoginCode", code);
      //   this.$router.push({ name: "addactivity" });
      // });
    }
  }
});
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/bg.jpg");
  text-align: left;
  position: relative;
  .login-form {
    // margin:0 auto;
    padding: 20px;
    width: 300px;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.3);
    border: 1px solid #fff;
    .form-header {
      text-align: center;
      font-weight: bold;
      font-size: 18px;
      padding: 0 0 20px 0;
    }
    .form-body {
      padding: 0 0 20px 0;
      .form-item {
        line-height: 30px;
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        padding: 10px 0;
        label {
          white-space: nowrap;
        }
        .form-control {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-color: #fff;
          background-image: none;
          border-radius: 4px;
          border: 1px solid #bfcbd9;
          box-sizing: border-box;
          color: #1f2d3d;
          font-size: inherit;
          height: 36px;
          line-height: 1;
          outline: 0;
          padding: 3px 10px;
          transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
          &:hover {
            border-color: #8391a5;
          }
        }
      }
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>