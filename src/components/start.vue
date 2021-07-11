<template>
  <el-container class="start" direction="vertical">
          <el-row>
            <el-col :span="1">
              <img
                src="../assets/cloudy-logo.png"
                width="50px"
                height="50px"
                style="margin-left:50%"
              />
            </el-col>
            <el-col :span="1">
              <h2 style="margin-top: 15px;margin-left:35%; color: white">Cloudy</h2>
            </el-col>
          </el-row>   
      <el-row>
        <el-col :span="6" :offset="3" >
          <h1 style="color: white; text-align: center; font-size: 26px;margin-top:50%">
            云端事务管理<br />保持专注，提高效率
          </h1>
        </el-col>
         <el-col :span="6" :offset="5" style="margin-top:8%;">
          <router-view/>
        </el-col>
      </el-row>
  </el-container>
</template>

<script>
export default {
  name: "start",
  data() {
    return {};
  },
};
</script>
<style scoped>
html,
body,
.main,
#app {
  /* background-color: aquamarine; */
  padding: 0px;
  margin: 0px;
  height: 100%;
}
</style>
