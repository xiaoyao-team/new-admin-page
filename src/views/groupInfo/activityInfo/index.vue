<template>
  <div>
    <el-button
      size="small"
      type="primary"
      plain
      class="el-tabs__new-tab el-icon-plus"
      @click="addReward(rewardTabsValue)"
    >添加礼包</el-button>
    <el-tabs
      type="card"
      v-model="rewardTabsValue"
      @tab-remove="removeRewardTab"
    >
      <!-- 活动详情 -->
      <el-tab-pane :closable="false">
        <span slot="label">
          <i class="el-icon-menu"></i>活动详情
        </span>
        <section style="padding:20px 20px 20px 20px">
          <edit-activity-form></edit-activity-form>
          <div>
            <el-table :data="activityData.giftPackageDetailList" border style="width: 100%; margin-top:20px">
              <el-table-column prop="sort" align="center" label="序号" width="50"></el-table-column>
              <el-table-column prop="giftPackageId" align="center" label="礼包ID"></el-table-column>
              <el-table-column prop="giftPackageName" align="center" label="礼包名称"></el-table-column>
              <el-table-column prop="giftPackageType" align="center" label="礼包类型"></el-table-column>
              <el-table-column prop="num" align="center" label="礼包总数量" width="120"></el-table-column>
              <el-table-column prop="currentNum" align="center" label="礼包领取数量" width="120"></el-table-column>
              <el-table-column prop="num" align="center" label="礼包领取进度" width="230">
                <template slot-scope="scope">{{ scope.row.num }}</template>
              </el-table-column>
            </el-table>
          </div>
        </section>
      </el-tab-pane>
      <!-- 礼包详情 -->
      <el-tab-pane
        v-for="(item, index) in rewardTabs"
        :key="index"
        :name="(index+1+'')"
        :closable="true"
      >
        <span slot="label" >
          <!-- 1:进行中; -1:创建中; 2:已结束, 0:暂停/未开始 -->
          <i :class="item.addNewRea?'act-new':'el-icon-s-goods'"></i>
          {{item.sort?'礼包-'+item.sort:'新礼包'}}
        </span>
      </el-tab-pane>
    </el-tabs>
    <section style="box-shadow: -5px 5px 10px -4px rgba(0,0,0,.12), 5px 5px 10px -4px rgba(0,0,0,.04);padding: 20px">
      <edit-reward-form  v-show="rewardTabsValue!=0 && activityData.giftPackageDetailList[rewardTabsValue-1]"></edit-reward-form>
      <add-reward-form  v-show="rewardTabsValue!=0 && !activityData.giftPackageDetailList[rewardTabsValue-1]"></add-reward-form>
      <!-- <component :is="(rewardTabsValue!=0 && activityData.giftPackageDetailList[rewardTabsValue-1]) ? 'editRewardForm':'addRewardForm'"></component> -->
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { groupInfoModule } from "@/store/modules/groupInfo";
import editActivityForm from "./editActivityForm.vue";
import addRewardForm from "./addRewardForm.vue";
import editRewardForm from "./editRewardForm.vue";
import { handleConfirm } from "@/utils/common";

export default Vue.extend({
  name: "groupInfo",
  components: {
    editActivityForm,
    addRewardForm,
    editRewardForm
  },
  data() {
    return {
      rewardTabsValue: "0"
    };
  },
  computed: {
    rewardTabs(){
      return groupInfoModule.rewardTabs;
    },
    activityData(){
      return groupInfoModule.activityData;
    },
  },
  watch: {
    rewardTabsValue(value){
      if (value!=0) {
        groupInfoModule.SET_REWARDTABSVALUE(value-1)
      }
    }
  },
  methods: {
    clearActivityData(index: any, row: any) {
      console.log(index, row);
    },
    addReward() {
      if (this.rewardTabs.length === (this.activityData as any).giftPackageDetailList.length) {
        groupInfoModule.SET_REWARDTABS('add')
        this.rewardTabsValue = this.rewardTabs.length+"";
      }
      
    },
    removeRewardTab(targetName: any) {
      const index = targetName - 1;
      if (!this.activityData.giftPackageDetailList[index]) {
        groupInfoModule.SET_REWARDTABS('del')
        this.rewardTabsValue = "0";
      } else {
        handleConfirm(
          "是否确定删除" +
            (this.rewardTabs[index] as any).giftPackageName +
            "礼包 ?",
          "warning"
        )
          .then(() => {
            groupInfoModule
              .deleteReward({
                giftPackageId: (this.activityData.giftPackageDetailList as any)[index].giftPackageId
              })
              .then(() => {
                this.rewardTabsValue = "0";
                this.$message({
                  message: "礼包删除成功",
                  type: "success"
                });
              });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    goBack() {
      this.$router.push("/main/groupList");
    }
  }
});
</script>

<style lang="scss" scoped>
.el-tabs__new-tab {
  width: auto;
  height: auto;
  position: relative;
  z-index: 1;
}

.act-pending,
.act-processing,
.act-new,
.act-over {
  width: 14px;
  height: 14px;
  display: inline-block;
  border-radius: 50%;
  vertical-align: middle;
}
.act-over {
  // 已结束
  background: #909399;
}
.act-pending {
  // 未开始(暂停/新建)
  background: #e6a23c;
}
.act-new {
  background: #f56c6c;
}
.act-processing {
  // 进行中
  background: #67c23a;
}
</style>