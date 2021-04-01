<template>
  <div>
    <el-card>
      <el-form ref="sendEmailForm" :model="sendEmailForm" :rules="sendEmailFormRules" label-width="100px">
        <el-col :span='8'>
          <el-form-item label="所属游戏:" prop="appId">
            <el-select v-model="sendEmailForm.appId" placeholder="请选择游戏" style="width:100%">
              <el-option
                v-for="item in appList"
                :key="item.appId"
                :label="item.appName"
                :value="item.appId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动组:" prop="groupId">
            <el-select v-model="sendEmailForm.groupId" placeholder="请选择活动组" style="width:100%">
              <el-option
                v-for="item in groupList"
                :key="item.groupId"
                :label="item.groupName"
                :value="item.groupId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动:" prop="activityId">
            <el-select v-model="sendEmailForm.activityId" placeholder="请选择活动" style="width:100%">
              <el-option
                v-for="item in activityTabs"
                :key="item.activityId"
                :label="item.activityName"
                :value="item.activityId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="礼包:" prop="giftPackageId">
            <el-select v-model="sendEmailForm.giftPackageId" placeholder="请选择礼包" style="width:100%">
              <el-option
                v-for="item in rewardOptions"
                :key="item.giftPackageId"
                :label="item.giftPackageName"
                :value="item.giftPackageId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户ID:" prop="userId">
            <el-input v-model="sendEmailForm.userId" placeholder="请输入用户ID" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="角色ID:" prop="roleId">
            <el-input v-model="sendEmailForm.roleId" placeholder="请输入角色ID" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="区服ID:" prop="zoneId">
            <el-input v-model="sendEmailForm.zoneId" placeholder="请输入区服ID" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSendEmail">发送到玩家</el-button>
            <!-- <el-button @click="handleCancel">重置</el-button> -->
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { groupListModule } from "@/store/modules/groupList";
import { groupInfoModule } from "@/store/modules/groupInfo";
import { LoginModule } from '@/store/modules/login'

export default Vue.extend({
  name: "sendEmail",
  data() {
    return {
      rewardOptions:[],
      sendEmailForm:{
        appId: '',
        groupId: '',
        activityId:'',
        giftPackageId:'',
        userId:'',
        roleId:'',
        zoneId:'',
      },
      sendEmailFormRules:{
        appId: [
          { required: true, message: '请选择所属游戏', trigger: 'change' }
        ],
        groupId: [
          { required: true, message: '请选择活动组', trigger: 'change' }
        ],
        activityId: [
          { required: true, message: '请选择活动', trigger: 'change' }
        ],
        giftPackageId: [
          { required: true, message: '请选择礼包', trigger: 'change' }
        ],
        userId: [
          { required: true, message: '用户ID不能为空', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '角色ID不能为空', trigger: 'blur' }
        ],
        zoneId: [
          { required: true, message: '区服ID不能为空', trigger: 'blur' }
        ],
        
      },
    }
  },
  computed: {
    appList(){
      return LoginModule.appList;
    },
    groupList() {
      return groupListModule.groupList;
    },
    activityTabs() {
      return groupInfoModule.activityTabs;
    },
  },
  watch: {
    'sendEmailForm.groupId':{
      handler(newValue){
        groupInfoModule.getGroupInfo({ groupId: newValue });
        this.sendEmailForm.activityId = '';
        this.sendEmailForm.giftPackageId = '';
      },
      deep: true
    },
    'sendEmailForm.activityId':{
      handler(newValue){
        const giftpackageList: any = groupInfoModule.activityTabs.filter((item: any)=>item.activity.activityId===newValue);
        if (giftpackageList.length) {
          this.rewardOptions = giftpackageList[0].giftPackageDetailList;
          this.sendEmailForm.giftPackageId = '';
        }
      },
      deep: true
    }
  },
  methods: {
    handleSendEmail(){
      (this.$refs.sendEmailForm as any).validate((valid: any) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleCancel(){
      (this.$refs.sendEmailForm as any).resetFields();
    }
  },  
  mounted(){
    // 获取活动组
    if (!groupListModule.groupList.length) {
      groupListModule.getGroupList();
    }
  }
})
</script>

<style lang="scss" scoped>

</style>