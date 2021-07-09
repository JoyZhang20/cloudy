<template>
  <el-container class="register-form">
    <el-main>
      <h3>用户注册</h3>
      <hr style="width:100%" />
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
          <el-input
            v-model="form.checkPassword"
            placeholder="确认密码"
            type="password"
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            style="width: 80%;  height: 45px"
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
        checkPassword: "",
      },
    };
  },
  methods: {
    onSubmit() {
      axios
        .post("http://localhost:8084/user/add", {
          phoneNumber: this.form.phoneNumber, // 参数 firstName
          password: this.form.password, // 参数 lastName
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
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
.register-form {
  background-color: white;
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
