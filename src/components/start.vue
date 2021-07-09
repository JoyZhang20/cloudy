<template>
  <el-container class="start">
    <el-header>
      <el-container>
        <el-main>
          <el-row>
            <el-col :span="1">
              <img
                src="../assets/cloudy-logo.png"
                width="50px"
                height="50px"
                style="float: left"
              />
            </el-col>
            <el-col :span="1">
              <h2 style="margin-top: 15px; color: white">Cloudy</h2>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-header>

    <el-main>
      <el-container class="slogan">
        <el-main>
          <el-row>
            <el-col :span="24">
              <h1 style="color: white; text-align: center; font-size: 26px">
                云端事务管理<br />保持专注，提高效率
              </h1>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-container class="start-form">
        <el-main> <router-view /></el-main> </el-container
    ></el-main>
  </el-container>
</template>

<script>
export default {
  name: "start",
  data() {
    return {
      calendarValue: new Date(),
      tableData: [
        {
          clipRecordId: 18111331,
          content: "JoyZhang",
        },
        {
          clipRecordId: 2,
          content: "Lily",
        },
        {
          clipRecordId: 3,
          content: "Tina",
        },
      ],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }, //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
  },
  mounted() {
    // axios
    //   .get("http://www.joyzhang.site:8828/searchAllClipBoard")
    //   .then((response) => (this.tableData = response.data))
    //   .catch(function (error) {
    //     // 请求失败处理
    //     console.log("连接失败！！！");
    //   });
    // axios
    //   .post("http://localhost:8084/clip-record/find",{
    //     userId:"1"
    //   })
    //   .then((response) => (this.tableData=response.data.mes))
    //   .catch(function (error) {
    //     // 请求失败处理
    //     console.log("连接失败！！！");
    //   });
  },
};
</script>
<style scoped>
html,
body,
.main,
#app {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.start {
  /* background-color: aquamarine; */
  height: 137%;
}
.slogan {
  /* background-color: rgb(221, 241, 241); */
  height: 30%;
  width: 50%;
  float: left;
  margin-top: 12%;
}
.start-form {
  /* background-color: rgb(204, 192, 88); */
  height: 62%;
  width: 30%;
  margin-left: 12%;
  margin-top:7%;
  float: left;
}
</style>
