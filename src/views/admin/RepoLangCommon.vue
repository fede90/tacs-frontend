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
            v-model="searchUsername1"
          ></b-form-input>
        </b-col>
        <b-col align-self="center" cols="auto">
          <b-button variant="primary" @click="seeUser1">Search user</b-button>
        </b-col>
      </b-row>

      <!-- Mostrar error cuando no encontro usuario 1-->
      <b-container v-show="showUser1NotFound">
        <b-row align-h="center">
          <b-alert variant="danger" show>
            {{ username1NotFound }} Not Found!!!
          </b-alert>
        </b-row>
      </b-container>

      <br />

      <b-row align-h="center">
        <b-col align-self="center" cols="auto">
          <label>Username 2:</label>
        </b-col>
        <b-col align-self="center" cols="auto">
          <b-form-input
            size="sm"
            placeholder="Enter username"
            v-model="searchUsername2"
          ></b-form-input>
        </b-col>
        <b-col align-self="center" cols="auto">
          <b-button variant="primary" @click="seeUser2">Search user</b-button>
        </b-col>
      </b-row>

      <!-- Mostrar error cuando no encontro usuario -->
      <b-container v-show="showUser2NotFound">
        <b-row align-h="center">
          <b-alert variant="danger" show>
            {{ username2NotFound }} Not Found!!!
          </b-alert>
        </b-row>
      </b-container>
    </b-container>

    <br />
    <br />

    <!-- Vista de las listas favoritas de ambos usuarios -->
    <b-container>
      <b-row align-h="around">
        <b-col cols="4" v-show="viewUser1">
          <b-card
            bg-variant="light"
            :header="'User 1: ' + responseUser1.username"
            class="text-center"
          >
            <b-container>
              <b-form-checkbox-group
                v-model="value1"
                :options="favs1"
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
            :header="'User 2: ' + responseUser2.username"
            class="text-center"
          >
            <b-container>
              <b-form-checkbox-group
                v-model="value2"
                :options="favs2"
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
            <b-card-text v-for="repo of getRepoCommon()"
              ><!-- Esto puede marcar error, pero funciona -->
              <em class="font-weight-bold">ID: </em>{{ repo.id }}
              <em class="font-weight-bold">Language: </em>{{ repo.language }}
            </b-card-text>
          </b-card>
        </b-col>
        <b-col cols="4">
          <b-card
            bg-variant="success"
            header="Common languages"
            class="text-center"
          >
            <b-card-text v-for="lang of getLanguageCommon()">{{
              /* no quiero poner v-bind:key="lang" porque me tira error en el browser*/
              lang
            }}</b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <br />
  </div>
</template>

<script>
import Admin from "@/components/admin/Admin.vue";
import api from "@/components/backend-api";
export default {
  name: "repo-lang-common",
  components: { Admin },
  data() {
    return {
      searchUsername1: "",
      searchUsername2: "",
      viewUser1: false,
      viewUser2: false,
      showUser1NotFound: false,
      username1NotFound: "",
      showUser2NotFound: false,
      username2NotFound: "",
      repoCommon: [
        {
          id: -1,
          registerDate: "",
          language: ""
        }
      ],
      value1: [],
      value2: [],
      options: [
        { text: "first check", value: "first" },
        { text: "second check", value: "second" },
        { text: "third check", value: "third" }
      ],

      /* formato de la respuesta de los datos del usuario */
      responseUser1: {
        name: "",
        lastname: "",
        username: "",
        lastAccessTime: "",
        adminPrivilege: false,
        contents: [
          {
            name: "",
            id: "",
            contents: [
              {
                id: -1,
                registerDate: "",
                language: ""
              }
            ],
            creationDate: ""
          }
        ],
        creationDate: []
      },
      responseUser2: {
        name: "",
        lastname: "",
        username: "",
        lastAccessTime: "",
        adminPrivilege: false,
        contents: [
          {
            name: "",
            id: "",
            contents: [
              {
                id: -1,
                registerDate: "",
                language: ""
              }
            ],
            creationDate: ""
          }
        ],
        creationDate: []
      },

      favs1: [{ text: "Favorito X", value: "1" }],
      favs2: [{ text: "Favorito Y", value: "5" }],
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
    seeUser1() {
      this.value1 = [];
      api
        .getUserByUsername(this.searchUsername1)
        .then(response => {
          this.responseUser1 = response.data.data;
          this.viewUser1 = true;
          this.showUser1NotFound = false;
          this.favs1 = this.transformListFav(this.responseUser1.contents);
        })
        .catch(e => {
          if (e.response.status === 404) {
            this.username1NotFound = this.searchUsername1;
            this.viewUser1 = false;
            this.showUser1NotFound = true;
          }
        });
    },
    seeUser2() {
      this.value2 = [];
      api
        .getUserByUsername(this.searchUsername2)
        .then(response => {
          this.responseUser2 = response.data.data;
          this.viewUser2 = true;
          this.showUser2NotFound = false;
          this.favs2 = this.transformListFav(this.responseUser2.contents);
        })
        .catch(e => {
          if (e.response.status === 404) {
            this.username2NotFound = this.searchUsername2;
            this.viewUser2 = false;
            this.showUser2NotFound = true;
          }
        });
    },

    /*Esta funcion lo que hace es transformar la lista de fav del backend al formato que necesita el checkbox*/
    transformListFav(favList) {
      var aux = [];
      for (var i = 0; i < favList.length; i++) {
        aux[i] = { text: favList[i].name, value: favList[i].id };
      }
      return aux;
    },

    getRepoCommon() {
      if (this.value1.length === 1 && this.value2.length === 1) {
        var listRepoFav1 = this.responseUser1.contents.filter(
          fav => fav.id === this.value1[0]
        );
        var listRepoFav2 = this.responseUser2.contents.filter(
          fav => fav.id === this.value2[0]
        );
        var repoCommon = listRepoFav1[0].contents.filter(repo1 =>
          listRepoFav2[0].contents.some(repo2 => repo2.id === repo1.id)
        ); /*El [0] es porque el filter me devuelve una lista de fav, pero yo solo quiero el me encontro*/
        return repoCommon;
      }
    },
    getLanguageCommon() {
      if (this.value1.length === 1 && this.value2.length === 1) {
        var listRepoFav1 = this.responseUser1.contents.filter(
          fav => fav.id === this.value1[0]
        );
        var listRepoFav2 = this.responseUser2.contents.filter(
          fav => fav.id === this.value2[0]
        );
        var repoCommon = listRepoFav1[0].contents.filter(repo1 =>
          listRepoFav2[0].contents.some(
            repo2 => repo2.language === repo1.language
          )
        );
        var languageCommon = [];
        for (var i = 0; i < repoCommon.length; i++) {
          /*Esto lo hago para que no tenga lenguajes repetidos*/
          if (!languageCommon.some(lang => lang === repoCommon[i].language)) {
            languageCommon.push(repoCommon[i].language);
          }
        }
        return languageCommon;
      }
    }
  }
};
</script>
