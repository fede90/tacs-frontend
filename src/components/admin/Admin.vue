<template>
  <div class="admin">
    <!--Navbar -->
    <div>
      <b-nav tabs justified>
        <b-nav-item v-bind:to="'userdata'">User Data</b-nav-item>
        <b-nav-item v-bind:to="'repo-lang-common'">
          Repositories and languages in common
        </b-nav-item>
        <b-nav-item v-bind:to="'repofav'">
          Favorite repositories
        </b-nav-item>
        <b-nav-item v-bind:to="'registered-repositories'">
          Registered repositories
        </b-nav-item>
      </b-nav>
    </div>
    <!--/.Navbar -->
  </div>
</template>

<style>
.admin {
  width: 100vw;
  position: relative;
}

/*Lo pongo para que me ocupe toda la pantalla, sino me deja margenes en blanco*/
.container {
  padding-right: 0px;
  margin-right: 0px;
  margin-left: 0px;
  padding-left: 0px;
}
</style>

<script>
export default {
  name: "Admin"
};
</script>
