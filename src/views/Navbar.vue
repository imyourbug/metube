<template>
  <div class="row menu-header">
    <div class="col-4">
      <router-link class="text-menu-header" to="/home"
        ><img class="logo" src="@/assets/ytb.png" /></router-link
      >&emsp;
    </div>
    <div class="col-4 block-search">
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
    <div class="col-4 block-user">
      <div id="nav d-flex">
        <router-link class="btn-login" to="/login" v-if="!isLogged"
          >Login</router-link
        >
        <a
          href="#"
          @click.prevent="handleSignOut"
          class="btn-logout"
          v-if="isLogged"
          ><i class="fa-solid fa-bell nav-icon"></i>&emsp;<img
            class="nav-avatar"
            :src="avatar_user"
          />
          &ensp;Logout</a
        >
      </div>
    </div>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      user_name: "",
      avatar_user: "",
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
      localStorage.clear();
    },
    searchVideo() {
      if (this.key_word.trim()) {
        // Send key_word to ListVideo component
        this.emitter.emit("search-video", this.key_word);

        this.$router.push({
          path: `/videos/search/${this.key_word}`,
        });
      }
    },
    reload() {
      this.isLogged = !this.isLogged;
      this.user_name = localStorage.name ?? "";
      this.avatar_user = localStorage.avatar_user ?? "";
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
  /* background-color: #212529; */
  padding: 2% 2%;
}
.navbar-block-right {
  float: right;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}
.logo {
  width: 200px;
}
.block-search {
  padding-top: 25px;
}
.block-user {
  padding-top: 20px;
}
a.txt-user-name,
.btn-login,
.btn-logout {
  color: black;
  font-weight: bold;
}
.nav-avatar {
  width: 35px;
  border-radius: 50%;
}
.nav-icon {
  font-size: 20px;
}
</style>