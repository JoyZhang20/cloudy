<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="6" :offset="16">
          <el-input
            v-model="sendRecordContent"
            placeholder="输入要同步的记录"
          ></el-input
        ></el-col>
        <el-col :span="2">
          <el-button type="primary" @click="sendClipRecord"
            >发送</el-button
          ></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="
              recordTable.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            style="width: 100%"
            :default-sort="{ prop: 'id', order: 'descending' }"
          >

            <el-table-column
              label="id"
              width="180"
              align="center"
              prop="id"
              sortable
            >
              <template slot-scope="scope">
                <span>{{ scope.row.clipRecordId }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="内容"
              :show-overflow-tooltip="true"
              align="left"
              header-align="center"             
            >
              <template slot-scope="scope">
                <span>{{ scope.row.content }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button
                  @click="copyRecord(scope.row)"
                  type="primary"
                  size="mini"
                  icon="el-icon-document"
                ></el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteRecord(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="margin-top: 15px">
            <el-pagination
              align="center"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[1, 5, 10, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="recordTable.length"
            >
            </el-pagination></div
        ></el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      sendRecordContent: "",
      recordTable: [
        {
          clipRecordId: 1,
          content: "Joy",
        },
      ],
      currentPage: 1,
      total: 20,
      pageSize: 10,
    };
  },
  methods: {
    sendClipRecord() {
      this.$http
        .post("/clip-record/add", {
          ownerPhoneNumber: this.$route.params.phoneNumber,
          content: this.sendRecordContent,
        })
        .then(
          (response) => (
            this.$message({
              message: "添加成功！",
              type: "success",
            }),
            (this.sendRecordContent = ""),
            this.$options.methods.freshPage(this)
          )
        )
        .catch(function (error) {
          this.$message({
            message: "连接超时~",
            type: "warning",
          });
        });
    },
    copyString(copyString) {
      var oInput = document.createElement("input");
      oInput.value = copyString;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand("Copy");
      oInput.className = "oInput";
      oInput.style.display = "none";
    },
    copyRecord(row) {
      this.copyString(row.content);
      this.$message({
        message: "复制成功",
        type: "success",
      });
    },
    deleteRecord(row) {
      this.$confirm("删除该记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .post("/clip-record/delete", {
              clipRecordId: row.clipRecordId,
            })
            .then(
              (response) => (
                this.$message({
                  message: "删除成功！",
                  type: "success",
                }),
                this.$options.methods.freshPage(this)
              )
            )
            .catch(function (error) {
              this.$message({
                message: "连接超时~",
                type: "warning",
              });
              console.log("连接失败！！！");
            });
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    freshPage(vue) {
      vue.$http
        .post("/clip-record/find", {
          phoneNumber: vue.$route.params.phoneNumber,
        })
        .then((response) => (vue.recordTable = response.data.mes))
        .catch(function (error) {
          console.log("连接失败！！！");
        });
    },
  },
  mounted() {
    this.$http
      .post("/clip-record/find", {
        phoneNumber: this.$route.params.phoneNumber,
      })
      .then((response) => (this.recordTable = response.data.mes))
      .catch(function (error) {
        console.log("连接失败！！！");
      });
  },
};
</script>
<style scoped>
.tooltip {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
