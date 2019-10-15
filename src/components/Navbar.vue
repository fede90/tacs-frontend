<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/home">TACS</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-bind:to="'/admin/userdata'" v-if="userLoged && isAdmin"
          >User Data</b-nav-item
        >
        <b-nav-item v-bind:to="'/admin/repofav'" v-if="userLoged && isAdmin"
          >Repo Fav</b-nav-item
        >
        <b-nav-item
          v-bind:to="'/admin/registered-repositories'"
          v-if="userLoged && isAdmin"
          >Repos Registered</b-nav-item
        >
        <b-nav-item
          v-bind:to="'/admin/repo-lang-common'"
          v-if="userLoged && isAdmin"
          >Repo Lang</b-nav-item
        >
        <b-nav-item
          v-bind:to="'/user/repositories'"
          v-if="userLoged && !isAdmin"
          >User repositories</b-nav-item
        >
        <b-nav-item v-bind:to="'/user/favourites'" v-if="userLoged && !isAdmin"
          >User Favourites</b-nav-item
        >
        <b-nav-item v-bind:to="'/signup'" v-if="!userLoged">Signup</b-nav-item>
        <b-nav-item v-bind:to="'/signin'" v-if="!userLoged">Signin</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="userLoged">
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
          <b-dropdown-item @click="logout" v-if="userLoged"
            >Sign Out</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      brand: "TACS",
      userLoged: false,
      errors: []
    };
  },
  created() {
    var token = this.$cookies.get("token");
    if (token) {
      this.userLoged = true;
      this.isAdmin = token.adminPrivilege;
    }
  },
  methods: {
    logout() {
      var vm = this;
      vm.$cookies.remove("token");
      this.userLoged = false;
      vm.$router.push({ path: "/home" });
    }
  }
};
</script>
