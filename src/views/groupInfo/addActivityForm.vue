<template>
  <div style="paddingTop:20px">
    <el-row :gutter="20" style="border-bottom:1px dashed #DCDFE6">
      <el-button
        size="small"
        type="primary"
        plain
        class="change_group_btn el-icon-edit"
        @click="addActivity"
      >添加新活动</el-button>
      <!-- left -->
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-form
            ref="addActivityForm"
            :rules="activityRules"
            :model="addActivityForm"
            label-width="100px"
          >
            <el-form-item label="活动组ID :">
              <span>{{groupList.activityGroupBase.activityGroup.groupId}}</span>
            </el-form-item>
            <el-form-item label="活动名称 :" prop="activityName">
              <el-input v-model="addActivityForm.activityName" style="width:70%;min-width:200px"></el-input>
            </el-form-item>
            <el-form-item label="活动时间 :" required>
              <el-col :span="8">
                <el-form-item prop="beginTime">
                  <el-date-picker
                    v-model="addActivityForm.beginTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width:100%"
                    placeholder="选择日期时间"
                    default-time="00:00:00"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="1">至</el-col>
              <el-col :span="8">
                <el-form-item prop="endTime">
                  <el-date-picker
                    v-model="addActivityForm.endTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width:100%"
                    placeholder="选择日期时间"
                    default-time="00:00:00"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="活动类型 :" prop="activityType">
              <el-radio-group v-model="addActivityForm.activityType">
                <el-radio :label="1">抽奖</el-radio>
                <el-radio :label="2">直接领取</el-radio>
                <el-radio :label="3">邀请/召回</el-radio>
                <el-radio :label="4">翻翻乐</el-radio>
                <el-radio :label="5">宝箱</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动状态 :" prop="activityStatus">
              <el-radio-group v-model="addActivityForm.activityStatus">
                <!-- <el-radio :label="0">创建中</el-radio> -->
                <el-radio :label="1">未开始/暂停</el-radio>
                <el-radio :label="2">进行中</el-radio>
                <el-radio :label="3">已结束</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动排序 :" prop="sort">
              <el-input v-model="addActivityForm.sort" style="width:70%;min-width:200px"></el-input>
            </el-form-item>
            <el-form-item label="活动说明 :" prop="activityDesc">
              <el-input
                type="textarea"
                v-model="addActivityForm.activityDesc"
                style="width:70%;min-width:200px"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <!-- right -->
      <!-- <el-col :span="14" style="border-left:1px dashed #DCDFE6;">
        <div class="grid-content bg-purple">
        </div>
      </el-col>-->
    </el-row>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { groupInfoModule } from "@/store/modules/groupInfo";

export default Vue.extend({
  name: "addActivityForm",
  data() {
    return {
      addActivityForm: {
        activityName: "",
        groupId: "",
        appId: "",
        beginTime: "",
        endTime: "",
        activityType: "",
        activityStatus: "",
        activityDesc: "",
        sort: 0
      },
      activityRules: {
        activityName: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        beginTime: [
          { required: true, message: "请选择活动开始时间", trigger: "change" }
        ],
        endTime: [
          { required: true, message: "请选择活动结束时间", trigger: "change" }
        ],
        activityType: [
          { required: true, message: "请选中活动类型", trigger: "change" }
        ],
        activityStatus: [
          { required: true, message: "请选中活动装填", trigger: "change" }
        ],
        sort: [{ required: true, message: "请输入活动排序", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.addActivityForm.sort = this.activityTabs.length;
  },
  computed: {
    groupList() {
      return groupInfoModule.groupInfoData;
    },
    activityTabs() {
      return groupInfoModule.activityTabs;
    }
  },

  methods: {
    addActivity() {
      (this.$refs.addActivityForm as any).validate((valid: any) => {
        if (valid) {
          this.addActivityForm.groupId = (this
            .groupList as any).activityGroupBase.activityGroup.groupId;
          this.addActivityForm.appId = (this
            .groupList as any).activityGroupBase.activityGroup.appId;
          groupInfoModule.addActivity(this.addActivityForm).then(() => {
            this.$message({
              message: "新活动添加成功",
              type: "success"
            });
          });
        } else {
          return console.log("error submit!!");
        }
      });
    }
  }
});
</script>
<style lang="scss" scoped>
.form-item-tip {
  padding: 0 20px 20px 20px;
  font-size: 14px;
  font-size: 12px;
  color: #8391a5;
  line-height: 20px;
  white-space: normal;
}
.change_group_btn {
  position: absolute;
  right: 10px;
  top: -20px;
}
</style>