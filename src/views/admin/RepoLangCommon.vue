<template>
  <div class="repo-lang-common">
    <Admin />
    <h1>Repositories and languages in common</h1>

    <!-- TODO: ver si definir filtro de busqueda o dejarlo asi, que solo se busque a los usuarios por username -->
    <!-- Busqueda de usuarios -->
    <b-container>
      <b-row align-h="center">
        <b-col align-self="center" cols="auto">
          <label>Username 1:</label>
        </b-col>
        <b-col align-self="center" cols="auto">
          <b-form-input
            size="sm"
            placeholder="Enter username"
            v-model="user1"
          ></b-form-input>
        </b-col>
        <b-col align-self="center" cols="auto">
          <b-button variant="primary" @click="seeUser1">Search user</b-button>
        </b-col>
      </b-row>

      <br />

      <b-row align-h="center">
        <b-col align-self="center" cols="auto">
          <label>Username 2:</label>
        </b-col>
        <b-col align-self="center" cols="auto">
          <b-form-input
            size="sm"
            placeholder="Enter username"
            v-model="user2"
          ></b-form-input>
        </b-col>
        <b-col align-self="center" cols="auto">
          <b-button variant="primary" @click="seeUser2">Search user</b-button>
        </b-col>
      </b-row>
    </b-container>

    <br />
    <br />

    <!-- Vista de las listas favoritas de ambos usuarios -->
    <b-container>
      <b-row align-h="around">
        <b-col cols="4" v-show="viewUser1">
          <b-card
            bg-variant="light"
            :header="'User 1: ' + user1"
            class="text-center"
          >
            <b-container>
              <b-form-checkbox-group
                v-model="value1"
                :options="exampleFavs1"
                name="checkbox-validation"
                :state="state1"
                stacked
              >
                <b-form-invalid-feedback :state="state1"
                  >Please select only one</b-form-invalid-feedback
                >
                <b-form-valid-feedback :state="state1"
                  >Ok</b-form-valid-feedback
                >
              </b-form-checkbox-group>
            </b-container>
          </b-card>
        </b-col>
        <b-col cols="4" v-show="viewUser2">
          <b-card
            bg-variant="light"
            :header="'User 2: ' + user2"
            class="text-center"
          >
            <b-container>
              <b-form-checkbox-group
                v-model="value2"
                :options="exampleFavs2"
                name="checkbox-validation"
                :state="state2"
                stacked
              >
                <b-form-invalid-feedback :state="state2"
                  >Please select only one</b-form-invalid-feedback
                >
                <b-form-valid-feedback :state="state2"
                  >Ok</b-form-valid-feedback
                >
              </b-form-checkbox-group>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <br />
    <br />
    <!-- Mostrar resultado -->
    <b-container v-show="state1 && state2">
      <b-row align-h="around">
        <b-col cols="4">
          <b-card
            bg-variant="success"
            header="Common repositories"
            class="text-center"
          >
            <b-card-text v-for="repo of exampleRepoCommon" v-bind:key="repo">{{
              repo.name
            }}</b-card-text
            ><!-- Esto puede marcar error, pero funciona -->
          </b-card>
        </b-col>
        <b-col cols="4">
          <b-card
            bg-variant="success"
            header="Common languages"
            class="text-center"
          >
            <b-card-text v-for="lang of exampleLangCommon" v-bind:key="lang">{{
              lang.name
            }}</b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Admin from "@/components/admin/Admin.vue";
export default {
  name: "repo-lang-common",
  components: { Admin },
  data() {
    return {
      user1: "",
      user2: "",
      viewUser1: false,
      viewUser2: false,
      value1: [],
      value2: [],
      options: [
        { text: "first check", value: "first" },
        { text: "second check", value: "second" },
        { text: "third check", value: "third" }
      ],
      exampleFavs1: [
        { text: "Favorito 1", value: "1" },
        { text: "Favorito 2", value: "2" },
        { text: "Favorito 3", value: "3" },
        { text: "Favorito 4", value: "4" },
        { text: "Favorito 5", value: "5" }
      ],
      exampleFavs2: [
        { text: "Favorito 1", value: "5" },
        { text: "Favorito 2", value: "7" },
        { text: "Favorito 3", value: "8" },
        { text: "Favorito 4", value: "9" },
        { text: "Favorito 5", value: "10" }
      ],
      exampleRepoCommon: [
        { name: "Repo 1" },
        { name: "Repo 2" },
        { name: "Repo 3" },
        { name: "Repo 4" }
      ],
      exampleLangCommon: [{ name: "C" }, { name: "JAVA" }]
    };
  },
  computed: {
    state1() {
      return this.value1.length === 1;
    },
    state2() {
      return this.value2.length === 1;
    }
  },
  methods: {
    /*TODO: esto tiene que traer de la api la listas de favoritos*/
    seeUser1() {
      this.viewUser1 = true;
    },
    seeUser2() {
      this.viewUser2 = true;
    }
  }
};
</script>
