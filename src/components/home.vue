<template>
  <el-container class="user-center-layout">
    <el-header
      height="10%"
      style="text-align: right; background-color: #92baff"
    >
      <el-row style="margin-top: 10px">
        <el-col :span="1" :offset="21">
          <el-avatar>{{ nickname.slice(nickname.length-2,nickname.length)}} </el-avatar>
        </el-col>
        <el-col :span="1">
          <el-dropdown trigger="hover" style="margin-top: 10px">
            <span class="el-dropdown-link" style="white-space: nowrap">
              {{ nickname }}<i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="nicknameDialogVisible = true"
                >修改昵称</el-dropdown-item
              >
              <el-dropdown-item @click.native="checkDialogVisible = true"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item @click.native="logout()"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container style="height: 100%; background-color: #e06253">
      <el-aside width="10%">
        <ManageSidebarBox2></ManageSidebarBox2>
      </el-aside>
      <el-container style="background-color: #ffffff">
        <el-main style="padding: 0px">
          <router-view class="router-view"
        /></el-main>
      </el-container>
    </el-container>
    <el-dialog
      title="修改昵称"
      :visible.sync="nicknameDialogVisible"
      width="25%"
    >
      <el-form :model="updateNicknameForm">
        <el-form-item label="输入新的昵称，1-16位">
          <el-input
            v-model="updateNicknameForm.nickname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="nicknameDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateNickname()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="验证身份" :visible.sync="checkDialogVisible" width="25%">
      <el-form :model="checkPasswordForm">
        <el-form-item label="输入旧的密码以确认您的身份">
          <el-input
            v-model="checkPasswordForm.password"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="checkDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkPassword()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="更改密码"
      :visible.sync="passwordDialogVisible"
      width="25%"
    >
      <el-form :model="checkPasswordForm">
        <el-form-item label="输入您的新密码，6-16位数字、字母或符号">
          <el-input
            v-model="updatePasswordForm.newPassword"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="重复一遍输入">
          <el-input
            v-model="updatePasswordForm.checkNewPassword"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passwordDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword()">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: "ManageLayout",
  data() {
    return {
      nickname: "",
      nicknameDialogVisible: false,
      updateNicknameForm: {
        nickname: "",
      },
      checkDialogVisible: false,
      checkPasswordForm: {
        password: "",
      },
      passwordDialogVisible: false,
      updatePasswordForm: {
        newPassword: "",
        checkNewPassword: "",
      },
    };
  },
  components: {
    ManageSidebarBox2: () => import("./sidebar"),
  },
  methods: {
    logout() {
      localStorage.removeItem("phoneNumber");
      this.$router.push("/start/login");
    },
    updateNickname() {
      this.nicknameDialogVisible = false;
      this.$http
        .post("/user/update-nickname", {
          phoneNumber: localStorage.getItem("phoneNumber"),
          nickname: this.updateNicknameForm.nickname,
        })
        .then(
          (response) => (
            this.$message({
              message: "修改成功！",
              type: "success",
            }),
            (this.nickname = response.data.mes)
          )
        )
        .catch(function (error) {
          console.log("失败了");
        });
    },
    checkPassword() {
      this.$http
        .post("/user/find", {
          phoneNumber: localStorage.getItem("phoneNumber"),
          password: this.checkPasswordForm.password,
        })
        .then((response) => {
          if (response.data.code == 200) {
            this.checkDialogVisible = false;
            this.passwordDialogVisible = true;
            this.$message({
              message: "验证成功！",
              type: "success",
            });
          } else {
            this.$message.error({
              message: "验证失败！",
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
    },
    updatePassword() {
      this.passwordDialogVisible = false;
      this.$http
        .post("/user/update-password", {
          phoneNumber: localStorage.getItem("phoneNumber"),
          password: this.updatePasswordForm.newPassword,
        })
        .then(
          (response) =>
            this.$message({
              message: "修改成功,请重新登录！",
              type: "success",
            }),
          localStorage.removeItem("phoneNumber"),
          this.$router.push("/start/login")
        )
        .catch(function (error) {
          console.log("失败了");
        });
    },
  },
  mounted() {
    this.nickname = localStorage.getItem("nickname");
  },
};
</script>

<style scoped>
.router-view {
  padding: 0px;
  height: 100%;
  width: 100%;
}
.user-center-layout {
  position: relative;
  height: 135%;
  background-color: #eeeeee;
}
.el-dropdown-link {
  color: white;
  cursor: pointer;
}
.el-container {
  border-right: 0 !important;
}
html,
body,
.main,
#app {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
</style>
