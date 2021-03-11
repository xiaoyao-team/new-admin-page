import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

/* Layout */
import Layout from "@/layout/index.vue";

export const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/login",
    component: resolve => {
      require(["@/views/login/index.vue"], resolve);
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/main",
    name: "Main",
    redirect: "/main/groupList",
    component: Layout,
    children: [
      {
        path: "/main/groupList",
        component: () => import("@/views/groupList/index.vue"),
        name: "GroupList",
        meta: {
          title: "groupList",
          icon: "el-icon-s-data",
          affix: true,
          zhName: "活动管理"
        }
      },
      // {
      //   path: "/main/addActivity",
      //   component: () => import("@/views/addActivity/index.vue"),
      //   name: "AddActivity",
      //   meta: {
      //     title: "addActivity",
      //     icon: "el-icon-circle-plus-outline",
      //     affix: true,
      //     zhName: "添加活动"
      //   }
      // },
      {
        path: "/main/awardQuery",
        component: () => import("@/views/awardQuery/index.vue"),
        name: "AwardQuery",
        meta: {
          title: "awardQuery",
          icon: "el-icon-search",
          affix: true,
          zhName: "获奖查询"
        }
      },
      {
        path: "/main/activityTool",
        component: () => import("@/views/activityTool/index.vue"),
        name: "ActivityTool",
        meta: {
          title: "activityTool",
          icon: "el-icon-setting",
          affix: true,
          zhName: "活动工具"
        }
      },
      {
        path: "/main/addApkPage",
        component: () => import("@/views/addApkPage/index.vue"),
        name: "AddApkPage",
        meta: {
          title: "addApkPage",
          icon: "el-icon-reading",
          affix: true,
          zhName: "创建apk页面"
        }
      },
      {
        path: "/main/uploadDocs",
        name: "UploadDocs",
        component: () => import("@/views/uploadDocs/index.vue"),
        meta: {
          title: "uploadDocs",
          icon: "el-icon-document",
          affix: true,
          zhName: "更新日志"
        }
      },{
        path: "/main/groupInfo/:groupId",
        name: "GroupInfo",
        component: () => import("@/views/groupInfo/index.vue"),
        meta: {
          title: "groupSet",
          icon: "el-icon-circle-plus-outline",
          affix: false,
          zhName: "活动详情"
        },
      },
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
