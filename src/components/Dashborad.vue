<template>
  <div v-if="user">
    <div id="app1"></div><br>
    <h1>Hello USER!</h1><br>
    <img :src="user.photoURL" width="100"> <br>
    <h3>{{user.displayName}}</h3><br>
    <p>{{user.email}}</p><br>
    <button @click="logOut">Log out</button>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  </div>
</template>

<script>
import auth from '@/auth'

export default {
  name: 'auth-success',
  computed: {
    user () {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    logOut () {
      auth.logout()
    }
  }
}
</script>

<style scoped>
  img {
    border-radius: 50px;
  }

  h3 {
    margin-bottom: 0px;
  }

  p {
    margin-top: 0px;
  }
</style>
