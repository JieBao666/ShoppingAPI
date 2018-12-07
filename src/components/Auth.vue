<template>
  <div>
    <h1 class="vue-title">Log in</h1>
    <div id="app1"></div>
  </div>
</template>

<script>
import auth from '@/auth'

export default {
  name: 'auth',
  mounted () {
    auth.authForm('#app1')
  }
}
</script>

<style>
  @import "../../node_modules/firebaseui/dist/firebaseui.css";
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
  #app1 {
    height: 100vh;
    margin: 0 auto;
  }
</style>
