<template>
  <div>
    <!-- 游戏分类 -->
    <div class="category-card">
      <el-card>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          v-if="appTypeList.length"
        >
          <el-menu-item index="all">全部</el-menu-item>
          <el-menu-item
            v-for="(item,index) in appTypeList"
            :index="item.area"
            :key="index"
          >{{item.zhName}}</el-menu-item>
        </el-menu>
        <div class="filter-row">
          <span class="filter-title">游戏:</span>
          <div class="game-list">
            <a
              class="game-list-item"
              href="javascript:void(0)"
              v-for="(item,index) in appList.filter(data => (activeIndex!='all')?data.area==activeIndex:data)"
              :key="index"
              :class="{active:nowgame==item.appId}"
              @click="nowgame=item.appId"
            >{{item.appName}}</a>
          </div>
        </div>
      </el-card>
    </div>
    <!-- 活动组列表 -->
    <div class="module-content">
      <el-card>
        <div slot="header">
          <span style="line-height: 30px;">活动组列表</span>
          <el-button
            class="el-icon-circle-plus-outline"
            style="float:right"
            type="primary"
            plain
            @click="dialogVisible = true"
          >新建活动组</el-button>
        </div>
        <div class="table-content">
          <el-table
            ref="multipleTable"
            max-height="600"
            :data="groupList.filter(data => (nowgame!=-1)?data.appId==nowgame:data)"
            border
            tooltip-effect="dark"
            style="width: 100%"
            :default-sort="{prop: 'createTime', order: 'descending'}"
          >
            <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
            <el-table-column prop="groupId" align="center" label="活动组ID"></el-table-column>
            <el-table-column prop="groupName" label="活动组名称"></el-table-column>
            <el-table-column prop="appName" align="center" label="所属游戏" width="120"></el-table-column>
            <el-table-column prop="appId" align="center" label="游戏ID" width="100"></el-table-column>
            <el-table-column prop="activityNum" align="center" label="活动数量" width="100"></el-table-column>
            <el-table-column prop="createTime" align="center" sortable label="创建时间" width="200"></el-table-column>
            <el-table-column align="center" label="操作" width="300">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="searchGroup(scope.$index, scope.row)"
                >查看</el-button>
                <el-button
                  type="warning"
                  size="small"
                  @click="copyGroup(scope.$index, scope.row)"
                >复制</el-button>
                <el-button
                  type="success"
                  size="small"
                  @click="publishGroup(scope.$index, scope.row)"
                >发布</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="deleteGroup(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
    <!-- 新建活动对话框 -->
    <el-dialog title="新建活动组" :visible.sync="dialogVisible" width="25%" :before-close="handleClose">
      <el-form
        ref="createdGroupForm"
        :model="createdGroupForm"
        :rules="createdGroupRules"
        label-width="100px"
      >
        <el-form-item label="所属游戏:" prop="appId">
          <el-select v-model="createdGroupForm.appId" placeholder="请输入或选择所属游戏" filterable style="width:100%">
            <el-option
              v-for="(item,index) in appList"
              :label="item.appName"
              :value="item.appId"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动名称:" prop="groupName">
          <el-input v-model="createdGroupForm.groupName" placeholder="请输入活动名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addGroup">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { groupListModule } from "@/store/modules/groupList";
import { LoginModule } from '@/store/modules/login'

export default Vue.extend({
  name: "groupList",
  data() {
    return {
      activeIndex: "all",
      nowgame: -1, // -1全部
      dialogVisible: false,
      createdGroupForm: {
        appId: "",
        groupName: ""
      },
      createdGroupRules: {
        appId: [
          { required: true, message: "请选择所属游戏", trigger: "change" }
        ],
        groupName: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    groupList() {
      return groupListModule.groupList;
    },
    appList() {
      return LoginModule.appList;
    },
    appTypeList() {
      return groupListModule.appTypeList;
    }
  },
  mounted() {
    groupListModule.getGroupList();
  },
  methods: {
    handleSelect(ev: any) {
      if (ev === "all") {
        this.nowgame = -1;
      }
      this.activeIndex = ev;
    },
    handleClose() {
      this.dialogVisible = false;
      (this.$refs.createdGroupForm as any).resetFields();
    },
    addGroup() {
      (this.$refs.createdGroupForm as any).validate((valid: any) => {
        if (valid) {
          groupListModule.createGroup(this.createdGroupForm).then(() => {
            this.$message({
              message: "活动组创建成功",
              type: "success"
            });
            this.dialogVisible = false;
            (this.$refs.createdGroupForm as any).resetFields();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    searchGroup(index: number, row: any) {
      this.$router.push({name:'GroupInfo',params:{groupId:row.groupId}});
    },
    copyGroup(index: number, row: any) {
      this.$confirm('确认复制活动组'+row.groupName+'？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        groupListModule.copyGroup({ groupId: row.groupId }).then(() => {
            this.$message({
              message: "活动组复制成功",
              type: "success"
            });
          });
      }).catch((err) => {console.log("cancel",err)})
    },
    publishGroup(index: number, row: any) {
      this.$confirm('确认发布活动组'+row.groupName+'？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log("publishGroup")
      }).catch((err) => {console.log("cancel",err)})
    },
    deleteGroup(index: number, row: any) {
      this.$confirm("确认删除活动组"+row.groupName+"？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          groupListModule.deleteGroup({ groupId: row.groupId }).then(() => {
            this.$message({
              message: "活动组删除成功",
              type: "success"
            });
          });
        })
        .catch(err => {
          console.log("cancel", err);
        });
    }
  }
});
</script>

<style lang="scss" scoped>
.category-card {
  margin-bottom: 20px;
  line-height: 40px;
  .filter-row {
    display: flex;
    .filter-title {
      // float: left;
      padding: 0 20px;
      white-space: nowrap;
    }
    .game-list {
      font-size: 14px;
      // float: left;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      .game-list-item {
        white-space: nowrap;
        color: #949494;
        text-decoration: none;
        padding: 0 10px;
        &:hover,
        &.active {
          color: #329fea;
        }
      }
    }
  }
}
.activity-group-card {
  margin-bottom: 20px;
  .activity-group-panel {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    transition: all 0.3s ease;
    .group-item {
      // display: inline-block;
      width: 250px;
      height: 250px;
      border: 1px solid #ddd;
      box-shadow: 1px 1px 5px 1px #ddd;
      border-radius: 5px;
      margin: 20px;
      padding: 15px;
      text-align: center;
      cursor: pointer;
      position: relative;
      transition: all 1s;
      .item-remove {
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 1;
        &:hover {
          color: red;
        }
      }
      .item-icon-group {
        font-size: 40px;
        padding: 15px;
        box-sizing: border-box;
        width: 100%;
        height: 150px;
        line-height: 150px;
        position: relative;
        .item-image {
          width: 100%;
          height: 100%;
        }
      }
      .item-text {
        font-weight: 700px;
        padding: 10px 0;
        .item-name {
          color: #555;
        }
        .item-game-name {
          color: #aaa;
          font-weight: 700px;
        }
      }
      .item-operate {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
      }
      &:hover {
        box-shadow: 1px 2px 10px 2px #aaa;
        // transform: scale(1.01);
        .item-text {
          .item-name {
            color: #329fea;
          }
        }
      }
    }
  }
}
</style>