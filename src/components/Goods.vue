<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="goods" :options="options">
        <a slot="increase" slot-scope="props" class="fa fa-hand-o-left fa-2x" @click="increase(props.row._id)"></a>
        <a slot="edit" slot-scope="props" class="fa fa-cog fa-2x" @click="editGood(props.row._id)"></a>
        <a slot="remove" slot-scope="props" class="fa fa-times fa-2x" @click="deleteGood(props.row._id)"></a>
      </v-client-table>
    </div>
    </div>
</template>

<script>
import GoodService from '@/services/goodservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'
Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})
export default {
  name: 'Goods',
  data () {
    return {
      messagetitle: ' Goods List ',
      goods: [],
      props: ['_id'],
      errors: [],
      columns: ['_id', 'goods_name', 'id', 'goods_price', 'amount', 'increase', 'edit', 'remove'],
      options: {
        perPage: 10,
        filterable: ['_id', 'id', 'goods_name', 'amount', 'goods_price'],
        sortable: ['amount'],
        headings: {
          _id: '_ID',
          goods_name: 'Goods Name',
          id: 'ID',
          goods_price: 'Goods Price',
          amount: 'Amount'
        }
      }
    }
  },
  created () {
    this.loadGoods()
  },
  methods: {
    loadGoods: function () {
      GoodService.fetchGoods()
        .then(response => {
          // JSON responses are automatically parsed.
          this.goods = response.data
          console.log(this.goods)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    increase: function (id) {
      GoodService.incrementAmount(id)
        .then(response => {
          // JSON responses are automatically parsed.
          this.loadGoods()
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    deleteGood: function (id) {
      this.$swal({
        title: 'Are you totaly sure?',
        text: 'You can\'t Undo this action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete it',
        cancelButtonText: 'Cancel',
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result.value)
        if (result === true) {
          GoodService.deleteGood(id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              console.log(this.message)
              this.loadGoods()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Deleted', 'You successfully deleted this Good ' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log('SWAL Else Result : ' + result.value)
          this.$swal('Cancelled', 'Your Good still Counts!', 'info')
        }
      })
    },
    editGood: function (id) {
      this.$router.params = id
      this.$router.push('edit')
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
