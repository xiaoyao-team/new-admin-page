<template>
  <div>
    <el-card v-if="groupList.activityGroupBase">
      <div slot="header">
        <el-page-header
          @back="goBack"
          title="返回"
          :content="'活动配置 ( '+groupList.activityGroupBase.activityGroup.groupName+' )'"
        ></el-page-header>
      </div>
      <div>
        <el-button
          size="small"
          type="primary"
          plain
          class="el-tabs__new-tab el-icon-plus"
          @click="addTab(activityTabsValue)"
        >添加活动</el-button>
        <el-tabs
          type="card"
          style="box-shadow: -5px 5px 10px -4px rgba(0,0,0,.12), 5px 5px 10px -4px rgba(0,0,0,.04);"
          v-model="activityTabsValue"
          @tab-remove="removeActivityTab"
        >
          <!-- 活动组信息 -->
          <el-tab-pane :closable="false">
            <span slot="label">
              <i class="el-icon-menu"></i>活动组信息
            </span>
            <section style="padding:20px">
              <edit-group-form></edit-group-form>
              <div>
                <el-table :data="activityTabsBak" border style="width: 100%; margin-top:20px">
                  <el-table-column prop="sort" align="center" label="序号" width="50"></el-table-column>
                  <el-table-column prop="activityId" align="center" label="活动ID"></el-table-column>
                  <el-table-column prop="activityName" align="center" label="活动名称"></el-table-column>
                  <el-table-column label="活动时间" align="center">
                    <template slot-scope="scope">
                      <div>{{scope.row.beginTime}} - {{scope.row.endTime}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="activityType" align="center" label="活动类型" width="120"></el-table-column>
                  <el-table-column prop="activityStatus" align="center" label="活动状态" width="120"></el-table-column>
                  <el-table-column label="礼包数量" align="center" width="100">
                    <template
                      slot-scope="scope"
                    >{{ scope.row.giftPackageList?scope.row.giftPackageList.length:'' }}</template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                      <el-button
                        size="small"
                        type="danger"
                        @click="clearActivityData(scope.$index, scope.row)"
                      >清除数据</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </section>
          </el-tab-pane>
          <!-- 活动信息 -->
          <el-tab-pane
            v-for="(item, index) in activityTabs"
            :key="index"
            :name="(index+1+'')"
            :closable="true"
          >
            <span slot="label" :title="item.activityStatus">
              <!-- 0:创建中; 1:未开始/暂停; 2:进行中, 3:已结束 -->
              <i :class="'act-status'+item.activityStatus"></i>
              活动-{{index+1}}({{item.activityName}})
            </span>
            <section style="padding: 0 20px">
              <component :is="item.activityStatus === '0'?'addActivityForm':'editActivityForm'"></component>
            </section>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { groupInfoModule } from "@/store/modules/groupInfo";
import editGroupForm from "./editGroupForm.vue";
import addActivityForm from "./addActivityForm.vue";
import editActivityForm from "./activityInfo/index.vue";
import { handleConfirm } from "@/utils/common";

export default Vue.extend({
  name: "groupInfo",
  components: {
    editGroupForm,
    addActivityForm,
    editActivityForm
  },
  data() {
    return {
      activityTabsValue: "0"
    };
  },
  computed: {
    groupList() {
      return groupInfoModule.groupInfoData;
    },
    activityTabsBak() {
      return groupInfoModule.activityTabsBak;
    },
    activityTabs() {
      return groupInfoModule.activityTabs;
    }
  },
  watch: {
    activityTabsValue(newValue) {
      if (newValue != 0) {
        groupInfoModule.SET_ACTIVITYTABSVALUE(newValue);
      }
    }
  },
  mounted() {
    groupInfoModule.getGroupInfo({ groupId: this.$route.params.groupId });
  },
  methods: {
    clearActivityData(index: any, row: any) {
      console.log(index, row);
    },
    addTab() {
      if (this.activityTabsBak.length === this.activityTabs.length) {
        groupInfoModule.SET_ACTIVITYTABS("add");
        this.activityTabsValue = this.activityTabs.length + "";
      }
    },
    removeActivityTab(targetName: any) {
      const index = targetName - 1;
      if (!this.activityTabsBak[index]) {
        groupInfoModule.SET_ACTIVITYTABS("del");
        this.activityTabsValue = "0";
      } else {
        handleConfirm(
          "是否确定删除" +
            (this.activityTabs[index] as any).activityName +
            "活动 ?",
          "warning"
        )
          .then(() => {
            groupInfoModule
              .deleteActivity({
                activityId: (this.activityTabs[index] as any).activityId
              })
              .then(() => {
                (this.activityTabs as any).splice(index, 1);
                this.activityTabsValue = "0";
                this.$message({
                  message: "活动删除成功",
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

.act-status0,
.act-status1,
.act-status2,
.act-status3 {
  width: 14px;
  height: 14px;
  display: inline-block;
  border-radius: 50%;
  vertical-align: middle;
}
.act-status0 {
  // 创建中
  background: #f56c6c;
}
.act-status1 {
  // 未开始/暂停
  background: #e6a23c;
}
.act-status2 {
  // 进行中
  background: #67c23a;
}
.act-status3 {
  // 已结束
  background: #909399;
}
.el-tabs__header {
  margin: 0 !important;
}
</style>