<template>
  <div class="favourites">
    <User />
    <h1>Favourites</h1>
    <b-button variant="primary">New favourite list</b-button>

    <!--Muestreo de las listas de favoritos, en formato de card-->

    <b-card-group columns>
      <!--Esto puede marcar error, pero funciona-->

      <b-card
        bg-variant="secondary"
        text-variant="white"
        :header="fav.name"
        class="text-center mt-3"
        v-for="fav of responseUserFavourite.data.contents"
      >
        <b-card-text v-for="repo of fav.contents">
          <em class="font-weight-bold">ID: </em>{{ repo.id }}
        </b-card-text>
        <b-button variant="primary">Edit</b-button>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import api from "@/components/backend-api";
import User from "@/components/user/User.vue";
import FormGroup from "@/components/FormGroup";
import Alert from "@/components/alert/Alert";
import { required } from "vuelidate/lib/validators";
export default {
  name: "favourites",
  components: { FormGroup, Alert, User },
  data() {
    return {
      errors: [],
      message: "",
      form: {},
      show: true,
      pruebaLogin: {
        /*TODO: borrar, esto es solo para probar*/
        username: "username",
        pass: "password"
      },
      responseUserFavourite: {
        data: {
          contents: [
            {
              name: "",
              contents: [
                {
                  id: {}
                }
              ]
            }
          ]
        }
      }
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
  },
  mounted() {
    api
      .login(this.pruebaLogin)
      .then(response => {
        /*TODO:sacar este login, es solo para probar*/

        api
          .getUserWithoutID()
          .then(response => {
            /* TODO: este api.getUserWithoutID si va, no borrar */
            this.responseUserFavourite = response.data;
          })
          .catch(e => {
            this.responseUserFavourite = e; /* TODO: hacer algo con el error */
          });
      })
      .catch(e => {});
  }
};
</script>
