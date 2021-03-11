<template>
  <div>
    <el-row :gutter="20" style="border-bottom:1px dashed #DCDFE6">
      <el-button size="small" type="primary" plain class="change_group_btn el-icon-edit" @click="editActivity">修改活动</el-button>
      <!-- left -->
      <el-col :span="10"  style="border-right:1px dashed #DCDFE6;" >
        <div class="grid-content bg-purple" >
          <el-form ref="editActivityForm" :rules="activityRules" :model="editActivityForm" label-width="100px">
            <el-form-item label="活动ID :">
            <span>{{editActivityForm.activityId}}</span>
            </el-form-item>
            <el-form-item label="活动名称 :" prop="activityName">
              <el-input v-model="editActivityForm.activityName" style="width:95%;min-width:120px"></el-input>
            </el-form-item>
            <el-form-item label="活动时间 :" required >
              <el-col :span="10">
                <el-form-item prop="beginTime">
                  <el-date-picker
                    v-model="editActivityForm.beginTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width:100%"
                    placeholder="选择日期时间"
                    default-time="00:00:00"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="1">至</el-col>
              <el-col :span="10">
                <el-form-item prop="endTime">
                  <el-date-picker
                    v-model="editActivityForm.endTime"
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
              <el-radio-group v-model="editActivityForm.activityType">
                <el-radio :label="1">抽奖</el-radio>
                <el-radio :label="2">直接领取</el-radio>
                <el-radio :label="3">邀请/召回</el-radio>
                <el-radio :label="4">翻翻乐</el-radio>
                <el-radio :label="5">宝箱</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动状态 :" prop="activityStatus">
              <el-radio-group v-model="editActivityForm.activityStatus" size="medium">
                <el-radio :label="0">创建中</el-radio>
                <el-radio :label="1">未开始/暂停</el-radio>
                <el-radio :label="2">进行中</el-radio>
                <el-radio :label="3">已结束</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="排序 :" prop="sort">
              <el-input v-model="editActivityForm.sort" style="width:95%;min-width:120px"></el-input>
            </el-form-item>
            <el-form-item label="活动说明 :" prop="activityDesc">
              <el-input
                type="textarea"
                v-model="editActivityForm.activityDesc"
                style="width:95%;min-width:120px"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <!-- right -->
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <el-form ref="groupForm2" :rules="activityRules" :model="editActivityForm" label-width="120px">
            <el-form-item label="活动条件配置 :"></el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { groupInfoModule } from "@/store/modules/groupInfo";
export default Vue.extend({
  name: "editActivityForm",
  // props:['activityData'],
  data() {
    return {
      editActivityForm:{
        activityId: '',
        activityName: '',
        groupId: '',
        beginTime: '',
        endTime: '',
        activityType: '',
        activityStatus: '',
        activityDesc: '',
        sort: '',
        packageList: '',
        conditionList: '',
        appId: '',
      },
      activityRules:{
        activityName: [
          { required: true, message: '请输入活动组名称', trigger: 'blur' }
        ],
        appId: [
          { required: true, message: '请选择所属游戏', trigger: 'change' }
        ],
        
      }
    };
  },
  computed: {
    groupList() {
      return groupInfoModule.groupInfoData;
    },
    activityTabs() {
      return groupInfoModule.activityTabs;
    },
    activityData(){
      return groupInfoModule.activityTabs[+groupInfoModule.activityTabsValue];
    },
  },
  watch: {
    activityData(newValue){
      this.initActivityForm(newValue);    
    }
  },
  mounted() {
    this.initActivityForm(this.activityData);    
  },
  methods: {
    editActivity(){
      this.editActivityForm.appId = (this.groupList as any).activityGroupBase.activityGroup.appId;
      (this.$refs.editActivityForm as any).validate((valid: any) => {
        if (valid) {
          groupInfoModule.editActivity(this.editActivityForm).then(() => {
            this.$message({
              message: "活动修改成功",
              type: "success"
            });
          });
        }else{
          return console.log('error submit!!');
        }
      });
      // (this.$refs.groupForm2 as any).validate((valid: any) => {
      //   if (!valid) {
      //     return console.log('error submit!!');
      //   }
      // });
      // 
    },
    initActivityForm(data: any){
      Object.keys(this.editActivityForm).map((item: any)=>{
        if (data) {
          const params = data[item];
          this.$set(this.editActivityForm,item,params)
        }
      })
    }
  }
});
</script>
<style lang="scss" scoped>
.el-col .el-col-10{
  &:nth-child(1){
    padding: 0 !important;
  }
}
.form-item-tip{
  padding: 0 20px 20px 20px;
    font-size: 14px;
    font-size: 12px;
    color: #8391a5;
    line-height: 20px;
    white-space: normal;
}
.change_group_btn{
  position: absolute;
  right: 10px;
  top: -20px;
}
</style>