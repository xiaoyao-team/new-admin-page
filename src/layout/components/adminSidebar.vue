<template>
  <div class="sidebar">
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      background-color="#329fea"
      text-color="#F2F6FC"
      active-text-color="#fff"
      style="border: none;"
    >
      <el-menu-item
        v-show="item.meta.affix"
        v-for="(item,index) in routes[2].children"
        :index="index.toString()"
        :key="index"
      >
        <router-link
          v-if="item.name!='GroupInfo'"
          class="sidebar-item"
          :to="{name:item.name}"
          :key="item.name"
        >
          <div class="item-content">
            <i style="margin: 0 10px;" :class="item.meta.icon"></i>
            <span class="item-text">{{item.meta.zhName}}</span>
          </div>
        </router-link>
      </el-menu-item>
    </el-menu>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { routes } from "@/router";

export default Vue.extend({
  name: "adminSidebar",
  data() {
    return {
      activeIndex: "0"
    };
  },
  computed: {
    routes() {
      return routes;
    },
  },
  mounted () {
    (routes as any)[2].children.map((item: any,index: any)=>{
      if (item.name === this.$route.name) {
        this.activeIndex =  (index<5?index:0)+'';
      }
    })
  }
});
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo .el-menu {
  background: transparent !important;
}
.el-menu-item.is-active {
  background-color: rgba(0, 0, 0, 0.2) !important;
  &::after {
    content: "";
    width: 0px;
    height: 0px;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #e7e7e7;
    position: absolute;
    top: 18px;
    right: -1px;
  }
}
.el-menu-item {
  text-align: left;
  i {
    color: #fff;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
</style>