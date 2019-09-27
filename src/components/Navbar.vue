<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">TACS</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-bind:to="'home'" v-if="userLoged">Home</b-nav-item>
        <b-nav-item v-bind:to="'home'" v-if="userLoged">Repositories</b-nav-item>
        <b-nav-item v-bind:to="'home'" v-if="userLoged">Users</b-nav-item>
        <b-nav-item v-bind:to="'signup'" v-if="!userLoged">Signup</b-nav-item>
        <b-nav-item v-bind:to="'signin'" v-if="!userLoged">Signin</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search">
          </b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">
            Search
          </b-button>
        </b-nav-form>
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout" v-if="userLoged">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import api from "@/components/backend-api";
export default {
  data() {
    return {
      brand: "TACS",
      userLoged: false,
      errors: [],
    };
  },
  created() {
    console.log("asdsa");
    this.userLoged = this.$cookies.get("token");
  },
  methods: {
    logout() {
      var vm = this;
      const token = this.$cookies.get("token");
      console.log("token logout " +token);
      vm.$cookies.remove("token");
      console.log("token logout " +token);
      this.userLoged = false;
      vm.$router.push("Home");
      /*api.signout(token)
        .then(response => {
          console.log("eliminando token " + token)
          vm.$cookies.remove(token);
          this.userLoged = false;
          vm.$router.push("Home");
        })
        .catch(e => {
          vm.errors.push(e);
        });*/
    }
  }
};
</script>
