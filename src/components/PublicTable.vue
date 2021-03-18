<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :default-sort="defaultSort"
      max-height="550">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        v-for="(item,index) in tableHeader"
        :key="index"
        :sortable='item.prop===defaultSort.prop'
        align="center"
        :prop="item.prop"
        :label="item.label"
        :width="item.width">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props:{
    tableData: {
      default: [],
    },
    tableHeader: {
      default: [],
    },
    defaultSort: {
      default: {},
    }
  },
})
</script>

<style lang="scss" scoped>


</style>