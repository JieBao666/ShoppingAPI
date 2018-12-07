import Api from '@/services/api'

export default {
  fetchGoods () {
    return Api().get('/goods')
  },
  postGood (good) {
    return Api().post('/goods', good,
      { headers: {'Content-type': 'application/json'} })
  },
  incrementAmount (id) {
    return Api().put(`/goods/${id}/amount`)
  },
  deleteGood (id) {
    return Api().delete(`/goods/${id}`)
  },
  fetchGood (id) {
    return Api().get(`/goods/${id}`)
  },
  putGood (id, good) {
    console.log('REQUESTING ' + good._id + ' ' +
      JSON.stringify(good, null, 5))
    return Api().put(`/goods/${id}`, good,
      { headers: {'Content-type': 'application/json'} })
  }
}
