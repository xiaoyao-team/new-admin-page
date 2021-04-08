<template>
  <div>
    <!--  -->
    <transition name="slide-to-right">
      <component :is='componentsName' @handleChange="handleChange"></component>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ApkPageList from './apkPageList.vue'
import AddApkPage from './addApkPage.vue'
import editApkPage from './editApkPage.vue'
export default Vue.extend({
  components:{
    editApkPage,
    ApkPageList,
    AddApkPage,
  },
  data() {
    return {
      componentsName:'ApkPageList',
    }
  },
  methods: {
    handleChange(name: string){
      this.componentsName = name;
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
