<template>
  <div class="row menu-header">
    <div class="col-4">
      <div id="nav">
        <router-link class="text-menu-header" to="/home">Home</router-link> |
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
export default {
  name: "Navbar",
  data() {
    return {
      user_name: "",
      isLogged: false,
      key_word: "",
    };
  },
  created() {
    this.reload();
  },
  mounted() {
    this.emitter.on("change-name", () => {
      this.reload();
    });
  },
  methods: {
    async handleSignOut() {
      try {
        await this.$gAuth.signOut();
        this.unSaveUser();
        this.isLogged = !this.isLogged;
        this.user_name = "";

        this.$router.push({ path: "/login" });
      } catch (error) {
        console.log(error);
      }
    },
    unSaveUser() {
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    },
    searchVideo() {
      if (this.key_word.trim()) {
        // Send key_word to ListVideo component
        this.emitter.emit("search-video", this.key_word);

        this.$router.push({
          path: "/videos/search",
        });
      }
    },
    reload() {
      this.isLogged = !this.isLogged;
      this.user_name = localStorage.name ?? "";
    },
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