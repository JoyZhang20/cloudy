<template>
  <el-container class="register-form">
    <el-main>
      <el-row>
        <el-col :span="2" style="margin-top:23px"><i class="el-icon-back" style="font-size:20px" @click="goLogin"></i></el-col>
        <el-col :span="6" :offset="6"> <h3>用户注册</h3></el-col>
      </el-row>    
      <hr style="width:100%" />
      <el-form ref="form" :model="registerForm">
        <el-form-item style="margin-top: 15%">
          <el-input
            v-model="registerForm.phoneNumber"
            placeholder="手机号"
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="registerForm.password"
            placeholder="密码"
            type="password"
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="registerForm.checkPassword"
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
export default {
  data() {
    return {
      registerForm: {
        phoneNumber: "",
        password: "",
        checkPassword: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$http.post("/user/add", {
         phoneNumber: this.registerForm.phoneNumber, 
          password: this.registerForm.password, 
        })
        .then((response) => {
          if (response.data.code == 200) {
           this.$router.push("/start/login");
            this.$message({
              message: "注册成功，欢迎登录！",
              type: "success",
            });
          } else {
            this.$message.error({
              message: "此手机号已被注册，请登录！",
            });
            this.fregisterFormorm={}
          }
        })
        .catch((error) => {
          this.$message({
            message: "连接超时~",
            type: "warning",
          });
          console.log(error);
        });

    },
    goLogin(){
      this.$router.push("/start/login")
    }
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
