// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2'
import * as VueGoogleMaps from 'vue2-google-maps'
import {store} from '@/localStorage'
import {router} from '@/router'
import auth from '@/auth'
import firebase from 'firebase'
import VueMq from 'vue-mq'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import VueTables from 'vue-tables-2'
Vue.use(BootstrapVue)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  beforeCreate () {
    auth.init(this)
  },
  components: { App },
  template: '<App/>'
})
Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})
Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity
  }
})
Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})
Vue.use(VueSweetalert2)
Vue.use(Vuelidate)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDGKLpSK5SkK_Wx7NqKOdf2ipHI7Bn-MCw',
    libraries: 'places'
  }
})
var config = {
  apiKey: 'AIzaSyDP_IXywBcgzeo3Kl4oEM2FFMmgh7H20MM',
  authDomain: 'shoppingvue.firebaseapp.com',
  databaseURL: 'https://shoppingvue.firebaseio.com',
  projectId: 'shoppingvue',
  storageBucket: 'shoppingvue.appspot.com',
  messagingSenderId: '296078881854'
}
export default !firebase.apps.length
  ? firebase.initializeApp(config) : firebase.app()
