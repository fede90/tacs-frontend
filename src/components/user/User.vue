<template>
  <div class="user">
    <!--Navbar -->
    <div>
      <b-nav tabs justified>
        <b-nav-item v-bind:to="'favourites'">Favourites</b-nav-item>
        <b-nav-item v-bind:to="'repositories'">Repositories</b-nav-item>
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
</style>

<script>
export default {
  name: "User"
};
</script>