<template>
  <el-container class="login-form" v-loading="loading">
    <el-main>
      <h3>用户登录</h3>
      <hr />
      <el-form ref="form" :model="loginForm">
        <el-form-item style="margin-top: 15%">
          <el-input
            v-model="loginForm.phoneNumber"
            placeholder="手机号"
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            placeholder="密码"
            type="password"
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="login"
            style="width: 30%; float: left; margin-left: 10%"
            >登录</el-button
          >
          <el-button
            @click="rerister"
            style="width: 30%; float: right; margin-right: 10%"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </el-main></el-container
  >
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      loginForm: {
        phoneNumber: "",
        password: "",
      },
    };
  },
  methods: {
    rerister() {
      this.$router.push("./register");
    },
    login() {
      this.loading = true;
      this.$http.post("/user/find", {
          phoneNumber: this.loginForm.phoneNumber,
          password: this.loginForm.password,
        })
        .then((response) => {
          this.loading = false;
          if (response.data.code == 200) {
            localStorage.setItem("phoneNumber", this.loginForm.phoneNumber);
            localStorage.setItem("nickname", response.data.mes);
            this.$router.push("/home/clip/" + this.loginForm.phoneNumber);
            this.$message({
              message: "登录成功",
              type: "success",
            });
          } else {
            this.$message.error({
              message: "账号密码不正确！",
            });
          }
        })
        .catch((error) => {
          this.loading = false;
          this.$message({
            message: "连接超时~",
            type: "warning",
          });
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
html,
body,
#app {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.login-form {
  background-color: white;
  top: 10%;
  position: relative;
  width: 100%;
  height: 80%;
}
</style>
