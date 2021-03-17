<template>
  <section class="app-main">
    <!-- <transition name="fade-transform" mode="out-in"> -->
      <!-- <keep-alive> -->
        <router-view class="views" :key="key" />
      <!-- </keep-alive> -->
    <!-- </transition> -->
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'adminContent',
  computed: {
    key() {
      return this.$route.path
    }
  }
})
</script>
