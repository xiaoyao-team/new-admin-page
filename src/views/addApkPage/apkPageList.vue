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
    <!-- 落地页列表 -->
    <div class="activity-group-card">
      <el-card>
        <div slot="header">
          <span style="line-height: 30px;">落地页列表</span>
        </div>
        <div class="activity-group-panel">
          <div class="group-item" @click="goAdd">
            <div class="item-icon-group">
              <i class="el-icon-plus"></i>
            </div>
            <el-button type="text" style="font-size:16px">添加apk落地页</el-button>
            <div class="item-operate"></div>
          </div>
          <!-- 已有活动组展示 -->
          <div class="group-item" v-for="(item,index) in apkPageData" :key="index">
            <div>
              <div class="item-icon-group">
                <img class="item-image" src="~@/assets/images/group.png" alt />
              </div>
              <div class="item-text">
                <div class="item-name">{{item.pageTitle}}</div>
                <p class="item-game-name">{{item.appName}}</p>
                <el-button type="warning" @click="goEdit(item)" size="medium">编辑</el-button>
                <el-button type="danger" @click="delApkPage(item)" size="medium">删除</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { groupListModule } from "@/store/modules/groupList";
import { LoginModule } from "@/store/modules/login";
import { addApkModule } from "@/store/modules/addApk";
import { handleConfirm } from "@/utils/common";

export default {
  name: 'Dashboard',
  data() {
    return {
      mainIndex: 1,
      isShowAdd: false,
      activeIndex: "all",
      nowgame: -1, // -1全部
    }
  },
  mounted () {
    addApkModule.getApkPageData()
  },
  computed: {
    appList() {
      return LoginModule.appList;
    },
    appTypeList() {
      return groupListModule.appTypeList;
    },
    apkPageData() {
      if (addApkModule.apkPageData) {
        return addApkModule.apkPageData.filter(data => (this.nowgame!=-1)?data.appId==this.nowgame:data);
      }else{
        return []
      }
    }
  },
  methods: {
    goAdd(){
      this.$emit('handleChange', 'AddApkPage');
    },
    goEdit(data){
      addApkModule.SET_DEFAULTDATA( data )
      this.$emit('handleChange', 'editApkPage');
    },
    delApkPage(data){
      handleConfirm("是否确定删除" + data.pageTitle + "活动组 ?", "warning")
        .then(() => {
          addApkModule.delApkPage({ id: data.id, filePath: data.filePath }).then(() => {
            this.$message({
              message: data.pageTitle + "删除成功",
              type: "success"
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSelect(ev) {
      if (ev === "all") {
        this.nowgame = -1;
      }
      this.activeIndex = ev;
    },
  }
}
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
      width: 250px;
      height: 280px;
      border: 1px solid #ddd;
      box-shadow: 1px 1px 5px 1px #ddd;
      border-radius: 5px;
      margin: 20px;
      padding: 15px;
      text-align: center;
      cursor: pointer;
      position: relative;
      transition: all 1s;
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
          min-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .item-game-name {
          color: #aaa;
          font-weight: 700px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
            // color: #329fea;
          }
        }
      }
    }
  }
}
</style>