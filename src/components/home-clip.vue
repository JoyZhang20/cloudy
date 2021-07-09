<template>
  <div>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
      :default-sort="{ prop: 'id', order: 'descending' }"
    >
      <el-table-column label="id" width="180" align="center" prop="id" sortable>
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
            @click="handleEdit(scope.$index, scope.row)"
            type="primary"
            size="mini"
            icon="document"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="delete"
            @click="handleDelete(scope.$index, scope.row)"
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
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [
        {
          clipRecordId: 1,
          content: "Joy",
        },
        {
          clipRecordId: 2,
          content: "Lily",
        },
        {
          clipRecordId: 3,
          content: "Tina",
        },
      ],currentPage: 1, // 当前页码
                    total: 20, // 总条数
                    pageSize: 10 // 每页的数据条数
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
.tooltip {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
