<template>
  <div class="row menu-header">
    <div class="col-4">
      <img src="" />
    </div>
    <div class="col-4">
      <div id="nav">
        <router-link class="text-menu-header" to="/">Home</router-link> |
        <router-link class="text-menu-header" to="/about">About</router-link> |
        <router-link class="text-menu-header" to="/about">Setting</router-link>
      </div>
    </div>
    <div class="col-4">
      <div id="nav">
        <div class="navbar-block-right">
          <a class="txt-user-name">Hello {{ user_name }}</a> |
          <router-link class="btn-login" to="/login" v-if="!isLogged"
            >Login</router-link
          >
          <a href="#" @click="handleSignOut" class="btn-logout" v-if="isLogged"
            >Logout</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      user_name: "",
      isLogged: true,
    };
  },
  methods: {
    async handleSignOut() {
      try {
        await this.$gAuth.signOut();
        this.unSaveUser();
        this.isLogged = false;

        this.$router.push({ path: "/login" });
      } catch (error) {
        console.log(error);
      }
    },
    unSaveUser() {
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("email");

      this.user_name = "";
    },
  },
  setup() {
    const user_name = localStorage.name ?? "";
    return {
      user_name,
    };
  },
  watch: {
    user_name: {
      handler(newVar) {
        this.user_name = newVar;
      },
    },
  },
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
.navbar-block-right {
  float: right;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}
</style>