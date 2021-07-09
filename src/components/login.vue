<template>
  <el-container class="login-form">
    <el-main>
      <h3>用户登录</h3>
      <hr />
      <el-form ref="form" :model="form">
        <el-form-item style="margin-top: 15%">
          <el-input
            v-model="form.phoneNumber"
            placeholder="手机号"
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
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
import axios from "axios";
export default {
  data() {
    return {
      form: {
        phoneNumber: "",
        password: "",
      },
    };
  },
  methods: {
    rerister() {
      this.$router.push("./register");
    },
    goHome() {},
    login() {
      //   this.$ajax({
      //     method: "post",
      //     url: "http://localhost:8084/user/find",
      //     params: {
      //       phoneNumber: this.form.phoneNumber,
      //       password: this.form.password,
      //     },
      //   })
      //     .then((response) => {
      //       if (response.data.code == 200) {
      //         this.$router.push("/home/clip/" + this.form.phoneNumber);
      //         this.$message({
      //           message: "登录成功",
      //           type: "success",
      //         });
      //       } else {
      //         this.$message.error({
      //           message: "账号密码不正确！",
      //         });
      //       }
      //     })
      //     .catch((error) => {
      //       this.$message({
      //         message: "连接错误~",
      //         type: "warning",
      //       });
      //       console.log(error);
      //     });
      // },

      axios
        .post("http://localhost:8084/user/find", {
          phoneNumber: this.form.phoneNumber,
          password: this.form.password,
        })
        .then((response) => {
          if (response.data.code == 200) {
            localStorage.setItem("phoneNumber", this.form.phoneNumber);         
            this.$router.push("/home/clip/" + this.form.phoneNumber);
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
          this.$message({
            message: "连接超时~",
            type: "warning",
          });
          console.log(error);
        });

      //   axios
      //     .post("http://localhost:8084/user/find", {
      //       phoneNumber: this.form.phoneNumber, // 参数 firstName
      //       password: this.form.password, // 参数 lastName
      //     })
      //     .then(
      //       function (response) {
      //         if (response.data.code == 200) {
      //           this.$router.push("/home/clip/" + this.form.phoneNumber);
      //           this.$message({
      //             message: "登录成功",
      //             type: "success",
      //           });
      //         } else {
      //           this.$message.error({
      //             message: "账号密码不正确！",
      //           });
      //         }
      //       }.bind(this)
      //     )
      //     .catch(function (error) {
      //       this.$message({
      //         message: "连接错误~",
      //         type: "warning",
      //       });
      //       console.log(error);
      //     }.bind(this));

      //   // this.$router.push("/home/clip/2");
      // },
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
