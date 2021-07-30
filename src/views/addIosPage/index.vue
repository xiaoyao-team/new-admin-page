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
import IosPageList from './iosPageList.vue'
import AddIosPage from './addIosPage.vue'
import editIosPage from './editIosPage.vue'
export default Vue.extend({
  components:{
    editIosPage,
    IosPageList,
    AddIosPage,
  },
  data() {
    return {
      componentsName:'IosPageList',
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
