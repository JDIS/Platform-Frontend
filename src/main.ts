import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import Vuebar from 'vuebar';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.config.productionTip = false;

Vue.use(Vuebar);
Vue.use(BootstrapVue);
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
