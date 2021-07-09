<template>
  <div class="sidebar">
    <el-row>
      <el-col :span="24">
        <el-menu
          :default-active="selectIndex"
          class="el-menu-vertical-demo"
          background-color="#545C64"
          text-color="#aaaaaa"
          active-text-color="#ffffff"
        >
          <el-menu-item index="1" @click="joy(0)">
            <i class="el-icon-menu"></i>
            <span slot="title">剪贴板</span>
          </el-menu-item>
          <el-menu-item index="2" @click="joy(1)">
            <i class="el-icon-setting"></i>
            <span slot="title">日程管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ManageSidebarBox2",
  data() {
    return {
      selectIndex: "1",
    };
  },
  created() {},
  methods: {
    joy(value) {
      // console.log(this.$route.params.id);
      if (value == 0) {
        this.$router.push("/home/clip/" + this.$route.params.phoneNumber);
      } else if (value == 1) {
        this.$router.push("/home/schedule/" + this.$route.params.phoneNumber);
      }
    },
  },
  mounted() {
    if (this.$route.path.split("/").slice(2, 3)[0] == "clip") {
      this.selectIndex = parseInt(1);
    } else if (this.$route.path.split("/").slice(2, 3)[0] == "schedule") {
      this.selectIndex = parseInt(2);
    }
  },
};
</script>

<style scoped>
.sidebar {
  background-color: #545c64;
  height: 100%;
  width: 100%;
}
.el-menu {
  border-right: 0 !important;
}
</style>
