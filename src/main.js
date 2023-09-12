import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/axios'
import './plugins/dayjs'
import './plugins/helpers'
import './plugins/fluid-storage'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'



Vue.config.productionTip = false

import Default from './layouts/Default.vue'
import Empty from './layouts/Empty.vue'
import Module from './layouts/Modules.vue'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
Vue.component('v-select', vSelect)

import VueNumeric from 'vue-numeric'
Vue.component('v-numeric', VueNumeric)

import Calendar from 'vue2-slot-calendar';
Vue.component('calendar', Calendar)

import { Datetime } from 'vue-datetime';
 
Vue.component('datetime', Datetime);


import VueCookies from 'vue-cookies'
Vue.use(VueCookies, { expire: '7d'})

import VueSweetalert2 from 'vue-sweetalert2';
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/fr';
Vue.component('date-picker', DatePicker)

import VueTimepicker from 'vue2-timepicker';
import 'vue2-timepicker/dist/VueTimepicker.css';
Vue.component('vue-timepicker', VueTimepicker)

import VueHtml2pdf from 'vue-html2pdf'
Vue.component('vue-html2pdf', VueHtml2pdf)


import VeeValidate from "vee-validate";
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: "veeFields",
  errorBagName: "veeErrors"
});

import ToggleButton from 'vue-js-toggle-button'

Vue.use(ToggleButton)

Vue.component('default-layout', Default)
Vue.component('empty-layout', Empty)
Vue.component('module-layout', Module)

new Vue({
  router,
  store,
  i18n,
  render: function (h) { return h(App) }
}).$mount('#app')
