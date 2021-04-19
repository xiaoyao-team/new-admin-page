<template>
  <div>
    <h1>更新日志</h1>
    <div class="block">
    <el-slider
        v-model="value"
        range
        show-stops
        :max="1000">
      </el-slider>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "uploadDocs",
  data () {
    return {
      value: [0,100]
    }
  }
  
})
</script>

<style lang="scss" scoped>

</style>