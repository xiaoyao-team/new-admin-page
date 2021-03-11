<template>
  <header class="header">
    <el-popover
      ref="userinfo"
      placement="bottom-end"
      width="170"
      popper-class="userinfo"
      trigger="hover">
      <section>
        <div class="user-cls">
          <p>欢迎使用 <br> {{userName}}</p>
        </div>
        <el-button type="info" plain class="lgout" size="small"  @click="handleLgout">退出</el-button>
      </section>
    </el-popover>
    <div class="sys-info-group">
      <a href="javascript:void(0)">
        <i class="el-icon-menu"></i>
        <span class="admin-title">{{title}}</span>
      </a>
    </div>
    <div class="header-content">
      <div class="user-group">
        <div class="list-item" v-popover:userinfo>
          <i class="el-icon-user"></i>
        </div>
        <a class="list-item" href="https://gitee.com/the7throad/DuiWaiWenDang/blob/master/docs/activity_m_useage.md" target="_blank">
        <i class="el-icon-service"></i>
          使用手册
        </a>
        <router-link tag="div" :to="{name:'UploadDocs'}" class="list-item">
          <i class="el-icon-document"></i>
          更新日志
        </router-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { LoginModule } from '@/store/modules/login'
export default Vue.extend({
  name: "adminHeader",
  computed:{
    userName(){
      return LoginModule.userName;
    },
    title(){
      if (process.env.VUE_APP_BASE_API.indexOf("https")) {
        return '活动管理平台-正式'
      }else{
        return '活动管理平台-测试'
      }
    }
  },
  methods: {
    handleLgout(){
      this.$confirm('确认退出系统？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        LoginModule.LogOut()
      }).catch((err) => {console.log("cancel",err)})
    }
  }
})
</script>

<style lang="scss" scoped>

</style>