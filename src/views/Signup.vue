<template>
  <div class="signup">
    <h1>Signup</h1>
    <div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Email:"
          label-for="input-1"
          description="Se permite una descripción."
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Ingresar email"
          ></b-form-input>
        </b-form-group>

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
          description="Your password must be 8-20 characters long, contain letters and numbers, and must not
          contain spaces, special characters, or emoji."
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
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </div>

    <button @click="responseUser()">Request Signup</button>
    <p>La respuesta es: {{ response }}</p>
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
        email: "",
        name: "",
        lastName: "",
        username: ""
      },
      show: true
    };
  },

  methods: {
    responseUser() {
      api
        .signup(this.form)
        .then(response => {
          console.log(response.headers.authorization);
          console.log(response.data);          
          this.response = response.data;
          window.localStorage.setItem('_token', response.headers.authorization);
          window.location.reload();
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
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
