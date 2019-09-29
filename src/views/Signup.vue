<template>
  <div class="signup">
    <h1>Signup</h1>
    <div>
      <alert :message="message" v-if="errors.length > 0" />
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <form-wrapper :validator="$v.form">
          <form-group name="name" label="Nombre">
            <b-form-input
              slot-scope="{ attrs, listeners }"
              v-bind="attrs"
              v-on="listeners"
              v-model="form.name"
              placeholder="Ingresar nombre"
            />
          </form-group>
          <form-group name="lastName" label="Apellido">
            <b-form-input
              slot-scope="{ attrs, listeners }"
              v-bind="attrs"
              v-on="listeners"
              v-model="form.lastName"
              placeholder="Ingresar apellido"
            />
          </form-group>
          <form-group name="username" label="Username">
            <b-form-input
              slot-scope="{ attrs, listeners }"
              v-bind="attrs"
              v-on="listeners"
              v-model="form.username"
              placeholder="Ingresar username"
            />
          </form-group>
          <form-group name="pass" label="Contraseña">
            <b-form-input
              slot-scope="{ attrs, listeners }"
              v-bind="attrs"
              v-on="listeners"
              v-model="form.pass"
              placeholder="Ingresar contraseña"
              type="password"
            />
          </form-group>

          <b-button type="submit" variant="primary">Grabar</b-button>
          <b-button type="reset" variant="danger">Limpiar</b-button>
        </form-wrapper>
      </b-form>
    </div>
  </div>
</template>

<script>
import api from "@/components/backend-api";
import FormGroup from "@/components/FormGroup";
import Alert from "@/components/alert/Alert";
import { required } from "vuelidate/lib/validators";
export default {
  name: "Signup",
  components: { FormGroup, Alert },
  data() {
    return {
      errors: [],
      message: "",
      form: {
        name: "",
        lastName: "",
        username: "",
        pass: ""
      },
      show: true
    };
  },

  methods: {
    responseUser() {
      var vm = this;
      api
        .signup(this.form)
        .then(response => {
          this.response = response.data;
          vm.response = response.data;
          vm.$cookies.set("token", response.headers.authorization);
          vm.$router.push("Home");
        })
        .catch(e => {
          this.message = e.response.data.msg;
          this.errors.push(e.response.data);
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$v.form.$touch();
      if (!this.$v.$invalid) {
        this.responseUser();
      }
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.username = "";
      this.form.name = "";
      this.form.lastName = "";
      this.form.pass = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  validations: {
    form: {
      name: { required },
      lastName: { required },
      username: { required },
      pass: { required }
    }
  }
};
</script>
