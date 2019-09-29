<template>
  <div class="signup">
    <h1>Signup</h1>
    <div>
      <alert :message="message" v-if="errors.length > 0" />
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <form-wrapper :validator="$v.form">
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
    },
    onReset(evt) {
      evt.preventDefault();
      this.form = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  validations: {
    form: {}
  }
};
</script>
