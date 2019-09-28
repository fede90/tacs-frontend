<template>
  <div class="signup">
    <h1>Signup</h1>
    <div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-2" label="Nombre:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.name"
            required
            placeholder="Enter name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Apellido:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.lastName"
            required
            placeholder="Ingresar apellido"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Username:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="form.username"
            required
            placeholder="Ingresar username"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Contraseña:"
          label-for="input-5"
          description=""
          ><b-form-input
            id="input-5"
            type="password"
            v-model="form.pass"
            required
            aria-describedby="password-help-block"
            placeholder="Ingresar contrase"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Grabar</b-button>
        <b-button type="reset" variant="danger">Limpiar</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import api from "@/components/backend-api";
export default {
  name: "Signup",
  data() {
    return {
      errors: [],
      response: {},
      form: {
        name: "",
        lastName: "",
        username: ""
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
          vm.$cookies.set("token",response.headers.authorization);

          vm.$router.push("Home");
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.responseUser();
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
  }
};
</script>
