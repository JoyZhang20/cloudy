<template >
  <el-container >
    <el-main style="padding:0px">
      <el-container  class="schedule-list">
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
                  <el-dropdown-item @click.native="switchShowDateMode()">{{showDateModes[showScheduleDateSeq]}}</el-dropdown-item>
                  <el-dropdown-item @click.native="switchRecordMode()">{{
                    showScheduleModes[showScheduleModeseq]
                  }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="13">
              <el-input placeholder="输入日程的内容" v-model="sendRecordForm.addRecordContent">
              </el-input
            ></el-col>
            <el-col  :span="11">   
              <el-date-picker
                v-model="sendRecordForm.addRecordTime"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :formatter="dateFormat"
                style="float:left"
              >
              </el-date-picker> <el-button type="primary" @click="sendContent" style="float:left">发送</el-button>
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
                showScheduleDateSeq==1?scheduleRecord.scheduleTime:scheduleRecord.remainTime
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
          <el-dialog
            title="编辑日程"
            :visible.sync="dialogFormVisible"
            width="25%"
          >
            <el-form :model="updateRecordForm">
              <el-form-item label="日程内容" :label-width="formLabelWidth">
                <el-input
                  v-model="updateRecordForm.content"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="日程时间" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="updateRecordForm.scheduleTime"
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
        <el-calendar v-model="selectedDay">
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
      </el-container>
      </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      selectedDay: "",
      calendarMap: {},
      dialogFormVisible: false,
      updateRecordForm: {
        scheduleRecordId: "",
        content: "",
        scheduleTime: "",
      },
      formLabelWidth: "80px",
      showScheduleModeseq: 0,
      showScheduleModes: ["显示全部日程", "仅显示未完成日程"],
      showScheduleDateSeq: 0,
      showDateModes: ["时间完整显示", "时间倒数显示"],
      calendarValue: new Date(),
      sendRecordForm: {
        addRecordTime: "",
        addRecordContent: "",
      },
      scheduleRecords: [],
    };
  },
  methods: {
    changeForm(day) {
      //传入某一天的日期，查询calendarMap，如果有对应的日程，即返回这个日程的缩写
      var res = "";
      try {
        res = "/" + this.calendarMap[day][0].slice(0, 10) + "...等";
      } catch (e) {}

      return res;
    },
    getSelectedList() {
      //根据this.selectedDay找到calendarMap中对应的日程列表，需要先对时间格式进行转换
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
      try {
        list = this.calendarMap[str];
      } catch (e) {}
      return list;
    },

    getCalendarMap(vue, scheduleRecords) {
      //获取CalendarMap：遍历每个未完成的日程，将每个日程的日期和内容进行映射，
      vue.calendarMap = {}; //这里的value应当是一个list，日期相同即为list新增一个元素
      for (var i = 0; i < scheduleRecords.length; i++) {
        if (scheduleRecords[i].finished == false) {
          var list = new Array();
          if (
            //如果之前已经有了这个日期的键值，则在原有的list上进行添加元素
            vue.calendarMap[
              scheduleRecords[i].scheduleTime.split(" ").slice(0, 1)[0]
            ] != null
          ) {
            list = list.concat(
              vue.calendarMap[
                scheduleRecords[i].scheduleTime.split(" ").slice(0, 1)[0]
              ]
            );
          }
          list.push(scheduleRecords[i].content);
          vue.$set(
            vue.calendarMap,
            scheduleRecords[i].scheduleTime.split(" ").slice(0, 1)[0],
            list
          );
        }
      }
    },

    switchRecordMode() {
      //切换是/否显示已完成的日程
      this.showScheduleModeseq = (this.showScheduleModeseq + 1) % 2;
    },
    switchShowDateMode() {
      //切换显示倒数日/完整日期
      this.showScheduleDateSeq = (this.showScheduleDateSeq + 1) % 2;
    },
    deleteRecord(id) {
      this.$confirm("删除该日程?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .post("/schedule-record/delete", {
              scheduleRecordId: id,
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
    openUpdateDialog(scheduleRecord) {
      //打开用于更新日程内容的对话框，并将对应的日程内容显示在对话框里
      this.dialogFormVisible = true;
      this.updateRecordForm.scheduleRecordId = scheduleRecord.scheduleRecordId;
      this.updateRecordForm.content = scheduleRecord.content;
      this.updateRecordForm.scheduleTime = scheduleRecord.scheduleTime;
    },
    updateRecord() {
      this.dialogFormVisible = false;
      this.$http
        .post("/schedule-record/update", {
          scheduleRecordId: this.updateRecordForm.scheduleRecordId,
          content: this.updateRecordForm.content,
          scheduleTime: this.updateRecordForm.scheduleTime,
        })
        .then(
          (response) => (
            this.$message({
              message: "修改成功！",
              type: "success",
            }),
            this.$options.methods.freshPage(this)
          )
        )
        .catch(function (error) {});
    },
    sendContent() {
      this.$http
        .post("/schedule-record/add", {
          ownerPhoneNumber: this.$route.params.phoneNumber,
          content: this.sendRecordForm.addRecordContent,
          scheduleTime: this.dateFormat(this.sendRecordForm.addRecordTime),
        })
        .then(
          (response) => (
            this.$message({
              message: "添加成功！",
              type: "success",
            }),
            (this.sendRecordForm = {}),
            this.$options.methods.freshPage(this)
          )
        )
        .catch(function (error) {});
    },
    dateFormat(row) {
      //用于发送日程中时间选择器的格式
      var date = row;
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
      //通过复选框来更新是否完成
      if (event.target.tagName == "SPAN") return; //防止产生多次点击
      this.cx++;
      isFinished = !isFinished;
      this.$http
        .post("/schedule-record/update-finished", {
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
    freshPage(vue) {
      vue.$http
        .post("/schedule-record/find", {
          phoneNumber: vue.$route.params.phoneNumber,
        })
        .then(
          (response) => (
            (vue.scheduleRecords = response.data.mes),
            vue.$options.methods.getCalendarMap(vue, response.data.mes)
          )
        )
        .catch(function (error) {});
    },
  },
  mounted() {
    this.$http
      .post("/schedule-record/find", {
        phoneNumber: this.$route.params.phoneNumber,
      })
      .then(
        (response) => (
          (this.scheduleRecords = response.data.mes),
          this.$options.methods.getCalendarMap(this, response.data.mes)
        )
      )
      .catch(function (error) {
        console.log("mounted连接失败！！！");
      });
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

.isfinished {
  color: red;
}
.schedule-list {
  background-color: rgb(221, 245, 241);
  height: 100%;
  width: 50%;
  left: 0px;
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
