<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="6" :offset="16">
          <el-input
            v-model="clipContent"
            placeholder="输入要同步的记录"
          ></el-input
        ></el-col>
        <el-col :span="2">
          <el-button type="primary" @click="sendClipContent"
            >发送</el-button
          ></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="
              tableData.slice(
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
              sortable
            >
              <template slot-scope="scope">
                <span>{{ scope.row.content }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button
                  @click="handleCopy(scope.row)"
                  type="primary"
                  size="mini"
                  icon="el-icon-document"
                ></el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
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
              :total="tableData.length"
            >
            </el-pagination></div
        ></el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  name: "base1",
  data() {
    return {
      clipContent: "",
      tableData: [
        {
          clipRecordId: 1,
          content: "Joy",
        },
      ],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
    };
  },
  methods: {
    sendClipContent() {
      axios
        .post("http://localhost:8084/clip-record/add", {
          ownerPhoneNumber: this.$route.params.phoneNumber,
          content: this.clipContent,
        })
        .then(
          (response) => (
            this.$message({
              message: "添加成功！",
              type: "success",
            }),
            (this.clipContent = "")
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
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
    },
    handleCopy(row) {
      this.copyString(row.content);
      this.$message({
        message: "复制成功",
        type: "success",
      });
    },
    handleDelete(row) {
      this.$confirm("删除该记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios
            .post("http://localhost:8084/clip-record/delete", {
              clipRecordId: row.clipRecordId,
            })
            .then((response) =>
              this.$message({
                message: "删除成功！",
                type: "success",
              })
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
    axios
      .post("http://localhost:8084/clip-record/find", {
        phoneNumber: this.$route.params.phoneNumber,
      })
      .then((response) => (this.tableData = response.data.mes))
      .catch(function (error) {
        // 请求失败处理
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
