<template>
          <form @submit.prevent="submit">
            <div class="form-group">
              <label class="form-label">Choose Goods</label>
              <select id="goods_name" name="goods_name" class="form-control" type="text" v-model="goods_name">
                <option value="null" selected disabled hidden>Choose Goods</option>
                <option value="Coke">Coke</option>
                <option value="Noodle">Noodle</option>
                <option value="Tomato">Tomato</option>
              </select>
            </div>
            <div class="form-group" :class="{ 'form-group--error': $v.id.$error }">
              <label class="form-label">ID</label>
              <input class="form__input" v-model.trim="$v.id.$model"/>
            </div>
            <div class="error" v-if="!$v.id.required">ID is Required</div>
            <div class="error" v-if="!$v.id.minLength">ID must have {{$v.id.$params.minLength.min}} letters.
            </div>
            <div class="form-group" :class="{ 'form-group--error': $v.amount.$error }">
              <label class="form-control-label" name="amount">Amount (Enter a number between 1 and 2000)</label>
              <input class="form__input" type="number" v-model.trim="amount"/>
            </div>
            <div class="error" v-if="!$v.goods_price.between">Goods Price must be between 1 and 10</div>
            <div class="form-group" :class="{ 'form-group--error': $v.goods_price.$error }">
              <label class="form-control-label" name="goods_price">Good Price (Enter a number between 1 and 10)</label>
              <input class="form__input" type="number" v-model.trim="goods_price"/>
            </div>
            <div class="error" v-if="!$v.amount.between">Amount must be between 1 and 2000</div>
            <div class="form-group" :class="{ 'form-group--error': $v.message.$error }">
              <label class="form__label">Personal Message</label>
              <input class="form__input" v-model.trim="$v.message.$model"/>
            </div>
            <div class="error" v-if="!$v.message.required">Message is Required</div>
            <div class="error" v-if="!$v.message.minLength">Message must have at least {{$v.message.$params.minLength.min}} letters.</div>
            <p>
              <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Add Good</button>
            </p>
            <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for add Good!</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Adding...</p>
          </form>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import VueSweetalert from 'vue-sweetalert'
import GoodService from '@/services/goodservice'
import { required, minLength, between } from 'vuelidate/lib/validators'
Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})
Vue.use(Vuelidate)
Vue.use(VueSweetalert)
export default {
  name: 'FormData',
  props: ['goodBtnTitle', 'good'],
  data () {
    return {
      messagetitle: ' Good ',
      message: this.good.message,
      goods_name: this.good.goods_name,
      amount: this.good.amount,
      goods_price: this.good.goods_price,
      id: this.good.id,
      submitStatus: null
    }
  },
  validations: {
    message: {
      required,
      minLength: minLength(5)
    },
    amount: {
      required,
      between: between(1, 2000)
    },
    goods_price: {
      required,
      between: between(1, 10)
    },
    id: {
      required,
      minLength: minLength(4)
    }
  },
  methods: {
    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var good = {
            goods_name: this.goods_name,
            amount: this.amount,
            goods_price: this.goods_price,
            message: this.message,
            id: this.id
          }
          this.good = good
          console.log('Submitting in GoodForm : ' + JSON.stringify(this.good, null, 5))
          this.$emit('good-is-created-updated', this.good)
        }, 500)
      }
    },
    submitGood: function (good) {
      console.log('submitGood!')
      console.log('Submitting in submitGood : ' + good)
      GoodService.postGood(good)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .donate-form .form-control-label.text-left{
    text-align: left;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
