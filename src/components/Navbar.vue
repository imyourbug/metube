<template>
  <div class="row menu-header">
    <div class="col-12">
      <div id="nav">
        <router-link class="text-menu-header" to="/">Home</router-link> |
        <router-link class="text-menu-header" to="/about">About</router-link> |
        <router-link class="text-menu-header" to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style>
a {
  text-decoration: none !important;
}
a.text-menu-header {
  color: #ff8b94 !important;
}
a.text-menu-header:hover {
  color: green !important;
}
.menu-header {
  background-color: #a8e6cf;
  padding: 2% 2%;
}
</style>