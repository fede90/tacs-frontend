import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueCookies from "vue-cookies";
import Vuelidate from "vuelidate";
import VuelidateErrorExtractor, { templates } from "vuelidate-error-extractor";
Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(BootstrapVue);
Vue.use(Vuelidate);
const messages = {
  required: "Campo {attribute} es obligatorio",
  email: "Campo {attribute} no tiene formato de e-mail"
};

Vue.use(VuelidateErrorExtractor, {
  messages,
  attributes: {
    name: "Nombre",
    email: "Email",
    lastName: "Apellido",
    username: "Nombre Usuario"
  }
});
Vue.component("formWrapper", templates.FormWrapper);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
