<template>
  <div class="user-data">
    <Admin />
    <h1>User data</h1>

    <!-- TODO: ver si se deberia definir un filtro de busqueda, como el de los repositorios -->
    <!-- Busqueda de usuario -->
    <b-container>
      <b-row align-h="center">
        <b-col align-self="center" cols="auto">
          <label>Username:</label>
        </b-col>
        <b-col align-self="center" cols="auto">
          <b-form-input
            size="sm"
            placeholder="Enter username"
            v-model="searchUsername"
          ></b-form-input>
        </b-col>
        <b-col align-self="center" cols="auto">
          <b-button variant="primary" @click="seeOneUser">Search user</b-button>
        </b-col>

        <!-- Este boton buscaria todos los usuarios, ver si hay que hacerlo --
                <b-col align-self="end" cols="auto" > 
                    <b-button variant="danger" @click="seeAllUser">Search all users</b-button>
                </b-col>
                -->
      </b-row>
    </b-container>

    <br />

    <!-- TODO: ver si implementar esto -->
    <!-- Tabla todos los usuarios -->
    <b-container v-show="allUser">
      <b-row align-h="center">
        <b-col align-self="center" cols="auto">
          <b-table
            :items="usersExample"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            responsive="sm"
          ></b-table>
        </b-col>
      </b-row>

      <b-row align-h="center">
        <div>
          Sorting By: <b>{{ sortBy }}</b
          >, Sort Direction:
          <b>{{ sortDesc ? "Descending" : "Ascending" }}</b>
        </div>
      </b-row>
    </b-container>

    <!-- Ver resultado busqueda de usuario -->
    <b-container v-show="oneUser">
      <b-row align-h="center">
        <b-card
          bg-variant="light"
          :header="responseUser.username"
          class="text-center"
        >
          <b-card-text
            ><em class="font-weight-bold">Name: </em
            >{{ responseUser.name }}</b-card-text
          >
          <!-- <b-card-text><em class="font-weight-bold">Lastname: </em>{{responseUser.lastName}}</b-card-text> -->
          <b-card-text
            ><em class="font-weight-bold">Last access: </em
            >{{ responseUser.lastAccessTime }}</b-card-text
          >
          <b-card-text
            ><em class="font-weight-bold">Favourite list count: </em
            >{{ responseUser.contents.length }}</b-card-text
          >
          <b-card-text
            ><em class="font-weight-bold">Repositorie count: </em
            >{{ sizeRepositories() }}</b-card-text
          >

          <!--TODO: falta que devuelva el lenguaje que mas usa-->
          <b-card-text
            ><em class="font-weight-bold">Most used language: </em
            >{{ responseUser.language }}</b-card-text
          >
        </b-card>
      </b-row>
    </b-container>

    <!-- Mostrar error cuando no encontro usuario -->
    <b-container v-show="showUserNotFound">
      <b-row align-h="center">
        <b-alert variant="danger" show>
          {{ usernameNotFound }} Not Found!!!
        </b-alert>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Admin from "@/components/admin/Admin.vue";
import api from "@/components/backend-api";
export default {
  name: "userdata",
  components: { Admin },
  data() {
    return {
      responseUser: {
        /* esto es la forma que tendria la respuesta de nuestra api */
        name: "",
        lastname: "",
        username: "",
        lastAccessTime: "",
        adminPrivilege: false,
        contents: [
          {
            name: "",
            id: "",
            contents: [],
            creationDate: ""
          }
        ],
        creationDate: []
      },
      searchUsername: "",
      oneUser: false,
      allUser: false,
      showUserNotFound: false,
      usernameNotFound: "",

      /* Esto es para la tabla de usuarios, ver si va a estar*/
      fields: [
        { key: "username", sortable: true },
        { key: "favourite_size", sortable: true },
        { key: "repositorie_size", sortable: true },
        { key: "last_access", sortable: true },
        { key: "language", sortable: true }
      ],
      sortBy: "age",
      sortDesc: false,
      /*TODO: Estos son solo ejemplos para la tabla*/
      usersExample: [
        {
          username: "Dickerson",
          favourite_size: 40,
          repositorie_size: 80,
          last_access: "2019-09-15",
          language: "C"
        },
        {
          username: "Larsen",
          favourite_size: 21,
          repositorie_size: 46,
          last_access: "2019-06-07",
          language: "JAVA"
        },
        {
          username: "Geneva",
          favourite_size: 89,
          repositorie_size: 160,
          last_access: "2019-09-25",
          language: "PASCAL"
        },
        {
          username: "Jami",
          favourite_size: 2,
          repositorie_size: 4,
          last_access: "2018-09-15",
          language: "ANGULAR"
        },
        {
          username: "Wilson",
          favourite_size: 10,
          repositorie_size: 24,
          last_access: "2019-09-01",
          language: "C++"
        }
      ],
      userExample: {
        username: "Dickerson",
        name: "Doc",
        lastname: "Thompson",
        favourite_size: 40,
        repositorie_size: 80,
        last_access: "2019-09-15",
        language: "C"
      }
    };
  },
  methods: {
    seeOneUser() {
      api
        .getUserByUsername(this.searchUsername)
        .then(response => {
          this.responseUser = response.data;
          this.oneUser = true;
          this.allUser = false;
          this.showUserNotFound = false;
        })
        .catch(e => {
          if (e.response.status === 404) {
            this.showUserNotFound = true;
            this.usernameNotFound = this.searchUsername;
            this.oneUser = false;
            this.allUser = false;
            this.showUserNotFound = true;
          }
          /* TODO: ver que hacer si aparece otro error */
        });
    },

    seeAllUser() {
      this.oneUser = false;
      this.allUser = true;
      this.showUserNotFound = false;
    },
    sizeRepositories() {
      var aux = 0;
      for (var i = 0; i < this.responseUser.contents.length; i++) {
        aux = aux + this.responseUser.contents[i].contents.length;
      }
      return aux;
    }
  }
};
</script>
