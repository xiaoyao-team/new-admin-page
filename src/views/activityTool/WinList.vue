<template>
  <div>
    <el-card style="marginBottom:20px">
      <el-form ref="winListForm" :model="winListForm" :rules="winListFormRules" label-width="80px">
        <el-row :gutter="40">
          <el-col :span='7'>
            <el-form-item label="活动组:" prop="groupId">
              <el-select v-model="winListForm.groupId" placeholder="请选择活动组" style="width:100%">
                <el-option
                  v-for="item in groupList"
                  :key="item.groupId"
                  :label="item.groupName"
                  :value="item.groupId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动:" prop="activityId">
              <el-select v-model="winListForm.activityId" placeholder="请选择活动" style="width:100%">
                <el-option
                  v-for="item in activityTabs"
                  :key="item.activityId"
                  :label="item.activityName"
                  :value="item.activityId">
                </el-option>
              </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item  label="礼包:" prop="giftPackageId">
                <el-select v-model="winListForm.giftPackageId" placeholder="请选择礼包" style="width:100%">
                  <el-option
                    v-for="item in rewardOptions"
                    :key="item.giftPackageId"
                    :label="item.giftPackageName"
                    :value="item.giftPackageId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="公布时间" prop="time">
                <el-date-picker
                  style="width:100%"
                  v-model="winListForm.time"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          
          <el-col :span="10">
            <el-button type="primary" size="medium" @click="queryData">查询</el-button>
            <el-button type="success" size="medium" @click="addData">新增</el-button>
            <el-button type="warning" size="medium" @click="deltData">删除</el-button>
            <el-button
              :loading="downloadLoading"
              type="primary"
              size="medium"
              icon="el-icon-document"
              @click="exportData"
            >
              导出Excel
            </el-button>
            <!-- <el-button type="info" size="medium" @click="exportData">导出</el-button> -->
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <el-divider content-position="center">
        <h3 style="text-align:center;color:#909399">中奖用户名单</h3>
      </el-divider>
      <section>
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          :default-sort="defaultSort"
          max-height="550"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            v-for="(item,index) in tableHeader"
            :key="index"
            :sortable='item.prop===defaultSort.prop'
            align="center"
            :prop="item.prop"
            :label="item.label"
            :width="item.width">
          </el-table-column>
        </el-table>
      </section>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { groupListModule } from "@/store/modules/groupList";
import { groupInfoModule } from "@/store/modules/groupInfo";
import { exportJson2Excel, formatJson } from "@/utils/excel";
export default Vue.extend({
  name: "awardQuery",
  data() {
    return {
      downloadLoading: false,
      rewardOptions:[],
      winListForm:{
        groupId: '',
        activityId:'',
        queryType: 1,
        userId:'',
        userName:'',
        time: '',
        giftPackageId:'',
        historyId: '',
      },
      winListFormRules:{
        groupId: [
          { required: true, message: '请选择活动组', trigger: 'change' }
        ],
        activityId: [
          { required: true, message: '请选择活动', trigger: 'change' }
        ],
        giftPackageId: [
          { required: true, message: '请选择礼包', trigger: 'change' }
        ],
        time: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
      },
      tableHeader:[
        { prop: "userName", label: "用户名", width: "180" },
        { prop: "userId", label: "用户ID", width: "120" },
        { prop: "playerName", label: "角色名", width: "120" },
        { prop: "playerId", label: "角色ID", width: "320" },
        { prop: "thirdGameZoneId", label: "区服ID", width: "120" },
        { prop: "actId", label: "活动ID", width: "220" },
        { prop: "rewardName", label: "礼包名",},
        { prop: "rewardId", label: "礼包ID", width: "220" },
        { prop: "userInfo.wish", label: "userInfo", width: "220" },
        { prop: "getDate", label: "获取时间", width: "180" },
      ],
      tableData: [
        {
          "goodsId": "60547021b5cb678df8731630",
          "userInfo": {
            "wish": "HAPPY!!!"
          },
          "historyId": "60547021b5cb678df8731631",
          "actId": "6050757bb5cb67891cfa915e",
          "rewardId": "60507a8bb5cb67891cfa918f",
          "rewardName": "goosId",
          "getDate": "2021-03-19 16:34:25",
          "userId": "67750133",
          "userName": "Qiong@9266.com",
          "thirdGameZoneId": "1006",
          "playerId": "d334201f-a802-4439-b88d-d7fa94b66038",
          "playerName": "Qiong6",
          "isGet": true
        },{
          "goodsId": "60547021b5cb678df8731630",
          "userInfo": {
            "wish": "HAPPY!!!"
          },
          "historyId": "60547021b5cb678df8731631",
          "actId": "6050757bb5cb67891cfa915e",
          "rewardId": "60507a8bb5cb67891cfa918f",
          "rewardName": "goosId",
          "getDate": "2021-03-19 16:34:25",
          "userId": "67750133",
          "userName": "Qiong@9266.com",
          "thirdGameZoneId": "1006",
          "playerId": "d334201f-a802-4439-b88d-d7fa94b66038",
          "playerName": "Qiong6",
          "isGet": true
        },{
          "goodsId": "60547021b5cb678df8731630",
          "userInfo": {
            "wish": "HAPPY!!!"
          },
          "historyId": "60547021b5cb678df8731631",
          "actId": "6050757bb5cb67891cfa915e",
          "rewardId": "60507a8bb5cb67891cfa918f",
          "rewardName": "goosId",
          "getDate": "2021-03-19 16:34:25",
          "userId": "67750133",
          "userName": "Qiong@9266.com",
          "thirdGameZoneId": "1006",
          "playerId": "d334201f-a802-4439-b88d-d7fa94b66038",
          "playerName": "Qiong6",
          "isGet": true
        }
      ],
      defaultSort: {prop: 'getDate', order: 'descending'},
      filename: "中奖用户名单",
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
    'winListForm.groupId':{
      handler(newValue){
        groupInfoModule.getGroupInfo({ groupId: newValue });
        this.winListForm.activityId = '';
        this.winListForm.giftPackageId = '';
      },
      deep: true
    },
    'winListForm.activityId':{
      handler(newValue){
        const giftpackageList: any = groupInfoModule.activityTabs.filter((item: any)=>item.activity.activityId===newValue);
        if (giftpackageList.length) {
          this.rewardOptions = giftpackageList[0].giftPackageDetailList;
          this.winListForm.giftPackageId = '';
        }
      },
      deep: true
    }
  },
  methods: {
    queryData(){
      (this.$refs.winListForm as any).validate((valid: any) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addData(){
      (this.$refs.winListForm as any).validate((valid: any) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    deltData(){
      if (this.winListForm.historyId.length) {
        alert('success')
      }else{
        this.$message({
          type: 'error',
          message: '请先勾选需要删除的数据'
        });
      }
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
    handleSelectionChange(newValue: any){
      this.winListForm.historyId = newValue.map((item: any)=>item.historyId).join()
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