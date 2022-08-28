<template>
  <Navbar />
  <router-view/>
</template>

<script>
import Login from "./components/Login.vue";
import Navbar from "./components/Navbar.vue";
import About from "./components/About.vue";
import Home from "./components/Home.vue";
import Error from "./components/Error.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Login,
    About,
    Home,
    Error
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
