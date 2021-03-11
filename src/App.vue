<template>
  <div id="app">
    <transition  name="fade-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="scss">
html {
  position: relative;
}

html,
body,
#app {
  margin: 0;
  height: 100%;
  overflow: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
