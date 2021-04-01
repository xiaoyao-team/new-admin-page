<template>
  <div>
    <el-card style="marginBottom:20px">
      <el-form ref="awardQueryForm" :model="awardQueryForm" :rules="awardQueryFormRules" label-width="100px">
        <el-row :gutter="40">
          <el-col :span='8'>
            <el-form-item label="活动组:" prop="groupId">
              <el-select v-model="awardQueryForm.groupId" placeholder="请选择活动组" style="width:100%">
                <el-option
                  v-for="item in groupList"
                  :key="item.groupId"
                  :label="item.groupName"
                  :value="item.groupId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动:" prop="activityId">
              <el-select v-model="awardQueryForm.activityId" placeholder="请选择活动" style="width:100%">
                <el-option
                  v-for="item in activityTabs"
                  :key="item.activityId"
                  :label="item.activityName"
                  :value="item.activityId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="查询类型:" prop="queryType">
              <el-select v-model="awardQueryForm.queryType" placeholder="请选择查询类型" style="width:100%">
                <el-option label="用户ID" :value="1"></el-option>
                <el-option label="用户名" :value="2"></el-option>
                <el-option label="礼包" :value="3"></el-option>
                <el-option label="时间" :value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="awardQueryForm.queryType==1" label="用户ID:" prop="userId">
              <el-input v-model="awardQueryForm.userId" placeholder="请输入用户ID" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item v-if="awardQueryForm.queryType==2" label="用户名:" prop="userName">
              <el-input v-model="awardQueryForm.userName" placeholder="请输入用户名" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item v-if="awardQueryForm.queryType==3" label="礼包:" prop="giftPackageId">
              <el-select v-model="awardQueryForm.giftPackageId" placeholder="请选择礼包" style="width:100%">
                <el-option
                  v-for="item in rewardOptions"
                  :key="item.giftPackageId"
                  :label="item.giftPackageName"
                  :value="item.giftPackageId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="awardQueryForm.queryType==4" label="时间:" prop="time">
              <el-date-picker
                v-model="awardQueryForm.time"
                style="width:100%"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-button type="primary" size="medium" @click="queryData">查询</el-button>
            <el-button
              :loading="downloadLoading"
              type="primary"
              size="medium"
              icon="el-icon-document"
              @click="exportData"
            >
              导出Excel
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <el-divider content-position="center">
        <h3 style="text-align:center;color:#909399">获奖查询结果</h3>
      </el-divider>
      <section>
        <public-table :tableData="tableData" :tableHeader="tableHeader" :defaultSort="defaultSort"></public-table>
      </section>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { groupListModule } from "@/store/modules/groupList";
import { groupInfoModule } from "@/store/modules/groupInfo";
import PublicTable from '@/components/PublicTable.vue';
import { exportJson2Excel, formatJson } from "@/utils/excel";
export default Vue.extend({
  name: "awardQuery",
  components:{
    PublicTable
  },
  data() {
    const checkType = (rule: any, value: any, callback: any) => {
      if (!value.length) {
        switch (rule.field) {
          case 'userId':
            callback(new Error('请输入用户ID'));        
            return;
          case 'userName':
            callback(new Error('请输入用户名'));                    
            return;
          case 'giftPackageId':
            callback(new Error('请选择礼包'));                    
            return;
          case 'time':
            callback(new Error('请选择时间'));                    
            return;
          default:
            callback();
            return;
        }
      } else {
        callback();
      }
    };
    return {
      filename: "获奖查询结果",
      downloadLoading:false,
      rewardOptions:[],
      awardQueryForm:{
        groupId: '',
        activityId:'',
        queryType: 1,
        userId:'',
        userName:'',
        time: ['2021-01-01 00:00:00', '2021-03-18 00:00:00'],
        giftPackageId:'',
      },
      awardQueryFormRules:{
        groupId: [
          { required: true, message: '请选择活动组', trigger: 'change' }
        ],
        activityId: [
          { required: true, message: '请选择活动', trigger: 'change' }
        ],
        queryType: [
          { required: true, message: '请选择查询类型', trigger: 'change' }
        ],
        userId: [
          { validator: checkType, trigger: 'blur' }
        ],
        userName: [
          { validator: checkType, trigger: 'blur' }
        ],
        time: [
          { validator: checkType, trigger: 'change' }
        ],
        giftPackageId: [
          { validator: checkType, trigger: 'change' }
        ]
      },
      tableHeader:[
        { prop: "userName", label: "用户名", width: "180" },
        { prop: "userId", label: "用户ID", width: "120" },
        { prop: "playerName", label: "角色名", width: "120" },
        { prop: "playerId", label: "角色ID", width: "300" },
        { prop: "thirdGameZoneId", label: "区服ID", width: "120" },
        { prop: "actId", label: "活动ID", width: "220" },
        { prop: "rewardName", label: "礼包名",},
        { prop: "rewardId", label: "礼包ID", width: "220" },
        { prop: "getDate", label: "获取时间", width: "180" },
      ],
      tableData: [
        {
          "goodId": "845aa1ab-20cd-4a20-9462-f5821af8228c",
          "type": 0,
          "historyId": "6052b445b5cb67844c423ae1",
          "actId": "60507437b5cb67891cfa914f",
          "rewardId": "60507528b5cb67891cfa9156",
          "rewardName": "ครบ 3 วัน",
          "getDate": "2021-03-18 09:00:37",
          "userId": "67750133",
          "userName": "Qiong@9266.com",
          "thirdGameZoneId": "1001",
          "playerId": "939b877b-2b62-4e84-befa-7ff5c1e5a10d",
          "playerName": "Qiong1",
          "isGet": true
        },
      ],
      defaultSort: {prop: 'getDate', order: 'descending'},
    }
  },
  computed: {
    groupList() {
      return groupListModule.groupList;
    },
    activityTabs() {
      return groupInfoModule.activityTabs;
    },
  },
  watch: {
    'awardQueryForm.groupId':{
      handler(newValue){
        groupInfoModule.getGroupInfo({ groupId: newValue });
        this.awardQueryForm.activityId = '';
        this.awardQueryForm.giftPackageId = '';
      },
      deep: true
    },
    'awardQueryForm.activityId':{
      handler(newValue){
        const giftpackageList: any = groupInfoModule.activityTabs.filter((item: any)=>item.activity.activityId===newValue);
        if (giftpackageList.length) {
          this.rewardOptions = giftpackageList[0].giftPackageDetailList;
          this.awardQueryForm.giftPackageId = '';
        }
      },
      deep: true
    }
  },
  methods: {
    queryData(){
      (this.$refs.awardQueryForm as any).validate((valid: any) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    exportData(){
      this.downloadLoading = true
      const tHeader = ['用户名', '用户ID', '角色名', '角色ID', '区服ID', '活动ID', '礼包名', '礼包ID', 'UserInfo', '获取时间']
      const filterVal = ["userName","userId","playerName","playerId","thirdGameZoneId","actId","rewardName","rewardId","userInfo","getDate"]
      const list = this.tableData
      const data = formatJson(filterVal, list)
      exportJson2Excel(tHeader, data, this.filename !== '' ? this.filename : undefined, undefined, undefined, true, 'xlsx')
      this.downloadLoading = false
    },
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