<template>
  <div id="app">
    <!-- <router-view/> -->
    <Main>
      <router-view/>
      <div id="subapp-viewport"></div>
    </Main>
  </div>
</template>

<script>
import Main from '@/components/main/main'
export default {
  name: 'App',
  components: {
    Main
  }
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
