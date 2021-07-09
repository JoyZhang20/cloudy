<template>
  <el-container>
    <el-main>
      <el-container class="schedule-list">
        <el-main>
          <el-row>
            <el-col :span="12" style="text-align: left">
              <p style="font-size: 22px">所有日程</p>
            </el-col>
            <el-col :span="12" style="text-align: right">
              <el-dropdown trigger="hover" style="margin-top: 30px">
                <span class="el-dropdown-link">
                  <i class="el-icon-more"  style="font-size:20px"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="switchShowDateMode()">{{showDateModes[showSeq]}}</el-dropdown-item>
                  <el-dropdown-item @click.native="changeRecordMode()">{{
                    showScheduleModes[showScheduleModeseq]
                  }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="15">
              <el-input placeholder="输入日程的内容" v-model="addRecordContent">
              </el-input
            ></el-col>
            <el-col :span="7">
              <el-date-picker
                v-model="addRecordTime"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :formatter="dateFormat"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="sendContent"><i class="el-icon-s-promotion"></i></el-button>
            </el-col>
          </el-row>
          <el-row
            v-for="scheduleRecord in scheduleRecords"
            :key="scheduleRecord.scheduleRecordId"
            v-if="!scheduleRecord.finished || showScheduleModeseq == 1"
            :class="scheduleRecord.finished ? 'isfinished' : ''"
          >
            <el-col :span="1">
              <el-checkbox
                v-model="scheduleRecord.finished"
                @click.native="
                  updateIsFinished(
                    $event,
                    scheduleRecord.scheduleRecordId,
                    scheduleRecord.finished
                  )
                "
              ></el-checkbox>
            </el-col>
            <el-col :span="16">
              <span
                style="text-align: left; display: block; text-align: left"
                >{{ scheduleRecord.content }}</span
              >
            </el-col>
            <el-col :span="6">
              <span style="text-color: blue">{{
                showSeq==1?scheduleRecord.scheduleTime:scheduleRecord.remainTime
              }}</span>
            </el-col>
            <el-col :span="1">
              <el-dropdown trigger="hover">
                <span style="white-space: nowrap">
                  <i class="el-icon-arrow-down"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="openUpdateDialog(scheduleRecord)"
                    >编辑</el-dropdown-item
                  >

                  <el-dropdown-item
                    @click.native="
                      deleteRecord(scheduleRecord.scheduleRecordId)
                    "
                    >删除</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="24">
              <hr />
            </el-col>
          </el-row> -->
          <el-dialog
            title="编辑日程"
            :visible.sync="dialogFormVisible"
            width="25%"
          >
            <el-form :model="updateForm">
              <el-form-item label="日程内容" :label-width="formLabelWidth">
                <el-input
                  v-model="updateForm.content"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="日程时间" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="updateForm.scheduleTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateRecord()"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-main>
      </el-container>
      <el-container class="schedule-calendar" direction="vertical">
        <el-row>
          <el-col :span="24"
        <el-calendar v-if="isFresh" v-model="selectedDay">
          <template slot="dateCell" slot-scope="{ date, data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split("-").slice(2).join("-") }}
              {{ changeForm(data.day)}}
              
            </p>
          </template>
        </el-calendar>
          </el-col>
        </el-row>
        <el-row v-for="(item,index) in getSelectedList()" :key="index">
          <el-col :span="24"><p>{{item}}</p><hr/>
          </el-col>
        </el-row>
        <!-- <el-row>
            <el-col :span="24"><p>计算机网络考试</p><hr/>
            </el-col>
        </el-row> -->
      </el-container>
      </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  name: "schedule",
  data() {
    return {
      selectedDay: "",
      calendarMap: {},
      dialogTableVisible: false,
      dialogFormVisible: false,
      isFresh: false,
      updateForm: {
        scheduleRecordId: "",
        content: "",
        scheduleTime: "",
      },
      formLabelWidth: "80px",
      showScheduleModeseq: 0,
      showScheduleModes: ["显示全部日程", "仅显示未完成日程"],
      showSeq: 0,
      showDateModes: ["日期完整显示", "日期倒数显示"],
      calendarValue: new Date(),
      addRecordTime: "",
      addRecordContent: "",
      scheduleRecords: [],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
    };
  },
  methods: {
    changeForm(day) {
      var res = "";
      try {
        // res ="/"+ this.calendarMap[day][0].slice(0,10)+"...等"+this.calendarMap[day].length+"个日程";
        res = "/" + this.calendarMap[day][0].slice(0, 10) + "...等";
      } catch (e) {}

      return res;
    },
    getSelectedList() {
      //  console.log(this.selectedDay);
      var list = ["计算机网络考试", "软件工程考试"];
      var str = "";
      var date = new Date(this.selectedDay);
      str = date.getFullYear() + "-";
      if (date.getMonth() < 9) {
        str += "0";
      }
      str += date.getMonth() + 1 + "-";
      if (date.getDate() < 10) {
        str += "0";
      }
      str += date.getDate();

      // console.log(str);
      try {
        list = this.calendarMap[str];
      } catch (e) {}
      // console.log(list);
      return list;
    },

    getCalendarMap(vue, scheduleRecords) {
      // var day=scheduleRecords[i].scheduleTime.split(" ").slice(0, 1)[0];
      var map = new Map();
      for (var i = 0; i < scheduleRecords.length; i++) {
        // console.log(scheduleRecords[i]);
        if (scheduleRecords[i].finished == false) {
          var list = new Array();
          if (
            map.get(
              scheduleRecords[i].scheduleTime.split(" ").slice(0, 1)[0]
            ) != null
          ) {
            list = list.concat(
              map.get(scheduleRecords[i].scheduleTime.split(" ").slice(0, 1)[0])
            );
          }
          list.push(scheduleRecords[i].content);
          map.set(
            scheduleRecords[i].scheduleTime.split(" ").slice(0, 1)[0],
            list
          );
        }

        for (var [key, value] of map) {
          vue.$set(vue.calendarMap, key, value);
        }
      }
    },

    changeRecordMode() {
      this.showScheduleModeseq = (this.showScheduleModeseq + 1) % 2;
    },
    switchShowDateMode() {
      this.showSeq = (this.showSeq + 1) % 2;
    },

    deleteRecord(id) {
      this.$confirm("删除该日程?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios
            .post("http://localhost:8084/schedule-record/delete", {
              scheduleRecordId: id,
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
    },
    openUpdateDialog(scheduleRecord) {
      this.dialogFormVisible = true;
      this.updateForm.scheduleRecordId = scheduleRecord.scheduleRecordId;
      this.updateForm.content = scheduleRecord.content;
      this.updateForm.scheduleTime = scheduleRecord.scheduleTime;
    },
    updateRecord() {
      this.dialogFormVisible = false;
      axios
        .post("http://localhost:8084/schedule-record/update", {
          scheduleRecordId: this.updateForm.scheduleRecordId,
          content: this.updateForm.content,
          scheduleTime: this.updateForm.scheduleTime,
        })
        .then((response) =>
          this.$message({
            message: "修改成功！",
            type: "success",
          })
        )
        .catch(function (error) {});
    },
    sendContent() {
      axios
        .post("http://localhost:8084/schedule-record/add", {
          ownerPhoneNumber: this.$route.params.phoneNumber,
          content: this.addRecordContent,
          scheduleTime: this.dateFormat(this.addRecordTime),
        })
        .then(
          (response) => (
            this.$message({
              message: "添加成功！",
              type: "success",
            }),
            (this.addRecordContent = ""),
            (this.addRecordTime = "")
          )
        )
        .catch(function (error) {});
    },
    dateFormat(row) {
      var date = row; //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    updateIsFinished(event, id, isFinished) {
      if (event.target.tagName == "SPAN") return;
      this.cx++;
      isFinished = !isFinished;
      axios
        .post("http://localhost:8084/schedule-record/update-finished", {
          scheduleRecordId: id,
          finished: isFinished,
        })
        .then((response) =>
          this.$message({
            message: "执行成功！",
            type: "success",
          })
        )
        .catch(function (error) {});
    },
  },
  mounted() {
    // this.$set(this.calendarMap, "min", "王薏敏");
    // var sdk = "2021-07-10";
    // console.log(this.calendarMap[sdk]);

    axios
      .post("http://localhost:8084/schedule-record/find", {
        phoneNumber: this.$route.params.phoneNumber,
      })
      .then(
        (response) => (
          (this.scheduleRecords = response.data.mes),
          this.$options.methods.getCalendarMap(this, response.data.mes),
          // map.forEach(function (key, value) {
          //   this.$set(this.calendarMap, key, value);
          // }),
          (this.isFresh = true)
        )
      )
      .catch(function (error) {
        // 请求失败处理
        console.log("mounted连接失败！！！");
      });
    // console.log("111");
  },
};
</script>
<style scoped>
.is-selected {
  color: #1989fa;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}

.isfinished{
  color: red;
}
.schedule-list {
  background-color: rgb(221, 241, 241);
  height: 100%;
  width: 50%;
  float: left;
}
.schedule-calendar {
  background-color: #ffffff;
  height: 60%;
  width: 50%;
  float: left;
}
.el-dropdown-link {
  cursor: pointer;
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
