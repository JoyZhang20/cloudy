<template>
  <el-container class="user-center-layout">
    <el-header
      height="10%"
      style="text-align: right; background-color: #92baff"
    >
      <el-container class="aboutme">
        <img
          src="../assets/photo.jpg"
          width="50px"
          height="50px"
          style="border-radius: 50px"
        />
        <el-container class="more-operation">
          <el-row>
            <el-col :span="5">
              <el-dropdown trigger="hover">
                <span class="el-dropdown-link" style="white-space: nowrap">
                  Joy<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>修改昵称</el-dropdown-item>
                  <el-dropdown-item>修改密码</el-dropdown-item>
                  <el-dropdown-item @click.native="layout()"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-container>
      </el-container>
    </el-header>
    <el-main>
      <el-container style="height: 100%; background-color: #ffffff">
        <el-aside width="10%">
          <ManageSidebarBox2></ManageSidebarBox2>
        </el-aside>
        <el-main> <router-view /></el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "ManageLayout",
  components: {
    ManageSidebarBox2: () => import("./sidebar"),
  },
  methods: {
    layout() {
      localStorage.removeItem("phoneNumber");
      this.$router.push("/start/login");
    },
  },
};
</script>

<style scoped>
.user-center-layout {
  position: relative;
  height: 135%;
  background-color: #eeeeee;
}

.aboutme {
  color: white;
  position: relative;
  top: 20%;
  left: 92%;
  height: 60%;
  width: 8%;
}
.more-operation {
  position: relative;
  margin-left: 5%;
  top: 25%;
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
