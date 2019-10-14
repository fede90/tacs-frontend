<template>
  <div class="repositories">
    <User />
    <h1>Repositories</h1>

    <!--Formulario de busqueda-->
    <b-container fluid>
      <!--Fork-->
      <b-row align-h="center">
        <b-form inline>
          <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0"></b-form-checkbox>
          <label class="mr-sm-2" for="inline-form-custom-select-pref"
            >Fork</label
          >
          <b-form-select
            class="mb-2 mr-sm-2 mb-sm-0"
            :value="null"
            :options="{ '1': '=', '2': '>', '3': '<' }"
            id="inline-form-custom-select-pref"
          >
            <template v-slot:first>
              <option :value="null">Choose</option>
            </template>
          </b-form-select>
          <b-input
            id="inline-form-input"
            placeholder="Number of forks"
          ></b-input>
        </b-form>
      </b-row>
      <br />

      <!--Open issues-->
      <b-row align-h="center">
        <b-form inline>
          <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0"></b-form-checkbox>
          <label class="mr-sm-2" for="inline-form-custom-select-pref"
            >Open issues</label
          >
          <b-form-select
            class="mb-2 mr-sm-2 mb-sm-0"
            :value="null"
            :options="{ '1': '=', '2': '>', '3': '<' }"
            id="inline-form-custom-select-pref"
          >
            <template v-slot:first>
              <option :value="null">Choose</option>
            </template>
          </b-form-select>
          <b-input
            id="inline-form-input"
            placeholder="Number of open issues"
          ></b-input>
        </b-form>
      </b-row>
      <br />

      <!--Stars-->
      <b-row align-h="center">
        <b-form inline>
          <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0"></b-form-checkbox>
          <label class="mr-sm-2" for="inline-form-custom-select-pref"
            >Stars</label
          >
          <b-form-select
            class="mb-2 mr-sm-2 mb-sm-0"
            :value="null"
            :options="{ '1': '=', '2': '>', '3': '<' }"
            id="inline-form-custom-select-pref"
          >
            <template v-slot:first>
              <option :value="null">Choose</option>
            </template>
          </b-form-select>
          <b-input
            id="inline-form-input"
            placeholder="Number of stars"
          ></b-input>
        </b-form>
      </b-row>
      <br />

      <!--Language-->
      <b-row align-h="center">
        <b-form inline>
          <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0"></b-form-checkbox>
          <label class="mr-sm-2" for="inline-form-custom-select-pref"
            >Language</label
          >
          <b-input id="inline-form-input" placeholder="Language"></b-input>
        </b-form>
      </b-row>
      <br />

      <!--Name repo-->
      <b-row align-h="center">
        <b-form inline>
          <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0"></b-form-checkbox>
          <label class="mr-sm-2" for="inline-form-custom-select-pref"
            >Repo name</label
          >
          <b-input id="inline-form-input" placeholder="Name"></b-input>
        </b-form>
      </b-row>
      <br />

      <!--Button Search-->
      <b-button variant="primary">Search</b-button>
      <br /> </b-container
    ><!--Fin formulario de busqueda-->

    <!--TODO: hacer cuadro de resultado-->
  </div>
</template>

<script>
import api from "@/components/backend-api";
import User from "@/components/user/User.vue";
import FormGroup from "@/components/FormGroup";
import Alert from "@/components/alert/Alert";
import { required } from "vuelidate/lib/validators";
export default {
  name: "repositories",
  components: { FormGroup, Alert, User },
  data() {
    return {
      errors: [],
      message: "",
      form: {},
      show: true
    };
  },

  methods: {
    repositories() {
      var vm = this;
      api
        .repositories(this.form)
        .then(response => {})
        .catch(e => {
          this.message = e.response.data.msg;
          this.errors.push(e.response.data);
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$v.form.$touch();
      if (!this.$v.$invalid) {
        //
      }
    }
  },
  validations: {
    form: {}
  }
};
</script>
