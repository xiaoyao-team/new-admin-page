<template>
  <div>
    <el-card style="marginBottom:20px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="获奖查询" name="awardQuery">
          <award-query></award-query>
        </el-tab-pane>
        <el-tab-pane label="邮件发送" name="sendEmail">
          <send-email></send-email>
        </el-tab-pane>
        <el-tab-pane label="指定中奖名单" name="winList">
          <win-list></win-list>
        </el-tab-pane>
        <el-tab-pane label="角色信息查询" name="roleInfo">充值消耗信息/登录信息/角色等级VIP等级信息/创角信息</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AwardQuery from './AwardQuery.vue'
import sendEmail from './SendEmail.vue'
import WinList from './WinList.vue'
export default Vue.extend({
  name: "activityTool",
  components: {
    AwardQuery,
    sendEmail,
    WinList,
  },
  data() {
    return {
      activeName:'awardQuery'
    }
  },
  methods: {
    // handleClick(ev: any){
      // console.log(ev)
    // }
  },
  
})
</script>

<style lang="scss" scoped>

</style>