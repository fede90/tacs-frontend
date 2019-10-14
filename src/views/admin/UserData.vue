<template>
  <div class="user-data">
    <Admin />
    <h1>User data</h1>
    <!-- TODO: ver si se deberia definir un filtro de busqueda, como el de los repositorios -->
    <!-- Busqueda de usuario -->
    <div v-if="errorMessage">
      <p>{{ errorMessage }}</p>
    </div>
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

        <b-col align-self="end" cols="auto">
          <b-button variant="danger" @click="seeAllUser"
            >Search all users</b-button
          >
        </b-col>
      </b-row>
    </b-container>

    <br />

    <!-- TODO: ver si implementar esto -->
    <!-- Tabla todos los usuarios -->
    <b-container v-show="allUser">
      <b-row align-h="center">
        <b-col align-self="center" cols="auto">
          <b-table
            :items="users"
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

          <b-card-text
            ><em class="font-weight-bold">Languages: </em
            >{{ responseUser.languages.toString() }}</b-card-text
          >
        </b-card>
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
        creationDate: [],
        languages: []
      },
      searchUsername: "",
      oneUser: false,
      allUser: false,
      users: [],
      errorMessage: "",

      /* Esto es para la tabla de usuarios, ver si va a estar*/
      fields: [
        { key: "username", sortable: true },
        { key: "favourite_size", sortable: true },
        { key: "repositorie_size", sortable: true },
        { key: "last_access", sortable: true },
        { key: "language", sortable: true }
      ],
      sortBy: "age",
      sortDesc: false
    };
  },
  methods: {
    seeOneUser() {
      var vm = this;
      api
        .getUserByUsername(this.searchUsername)
        .then(response => {
          this.responseUser = response.data.data;
          this.oneUser = true;
          this.allUser = false;
        })
        .catch(e => {
          if (e.response.status != 200) {
            vm.errorMessage = e.response.data.message;
            this.oneUser = false;
            this.allUser = false;
          }
        });
    },

    seeAllUser() {
      var vm = this;
      api
        .getAllUsers()
        .then(response => {
          vm.users = response.data.data;
          vm.allUser = true;
        })
        .catch(e => {
          console.log(e);
        });
      this.oneUser = false;
      this.allUser = true;
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
