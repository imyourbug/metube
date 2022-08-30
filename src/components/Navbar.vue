<template>
  <div class="row menu-header">
    <div class="col-4">
      <div id="nav">
        <router-link class="text-menu-header" to="/">Home</router-link> |
        <router-link class="text-menu-header" to="/about">About</router-link> |
        <router-link class="text-menu-header" to="/about"> Setting</router-link>
      </div>
    </div>
    <div class="col-4">
      <form class="d-flex">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model="key_word"
        />
        <a @click.prevent="searchVideo" class="btn btn-outline-success">
          Search
        </a>
      </form>
    </div>
    <div class="col-4">
      <div id="nav">
        <div class="navbar-block-right">
          <a class="txt-user-name">Hello {{ user_name }}</a> |
          <router-link class="btn-login" to="/login" v-if="!isLogged"
            >Login</router-link
          >
          <a
            href="#"
            @click.prevent="handleSignOut"
            class="btn-logout"
            v-if="isLogged"
            >Logout</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus";

export default {
  name: "Navbar",
  data() {
    return {
      user_name: "",
      isLogged: true,
      key_word: "",
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
    searchVideo() {
      console.log("/videos/search?key_word=" + this.key_word);
      // Send key_word to ListVideo component
      EventBus.$emit("send-key-word", this.key_word);
      this.$router.push({
        path: "/videos/search",
      });
    },
  },
  setup() {
    const user_name = localStorage.name ?? "";
    return {
      user_name,
    };
  },
};
</script>

<style>
a {
  text-decoration: none !important;
}
a.text-menu-header {
  color: whitesmoke !important;
}
a.text-menu-header:hover {
  color: green !important;
}
.menu-header {
  background-color: #212529;
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