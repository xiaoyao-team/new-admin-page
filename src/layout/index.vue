<template>
  <div class="app-wrapper">
    <admin-header></admin-header>
    <div class="content-body">
      <admin-sidebar></admin-sidebar>
      <admin-content></admin-content>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import adminHeader from './components/adminHeader.vue';
import adminContent from './components/adminContent.vue';
import adminSidebar from './components/adminSidebar.vue'
export default Vue.extend({
  name: "Layout",
  data() {
    return {
      
    }
  },
  components:{
    adminHeader,
    adminContent,
    adminSidebar,
  }
})
</script>

<style lang="scss" scoped>

</style>