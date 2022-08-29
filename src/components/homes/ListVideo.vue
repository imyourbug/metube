<template>
  <header>
    <div class="collapse bg-dark" id="navbarHeader">
      <div class="container">
        <div class="row">
          <div class="col-sm-8 col-md-7 py-4">
            <h4 class="text-white">Line 1</h4>
            <p class="text-muted">Line 2</p>
          </div>
          <div class="col-sm-4 offset-md-1 py-4">
            <h4 class="text-white">Line 3</h4>
            <ul class="list-unstyled">
              <li><a href="#" class="text-white">Line 4</a></li>
              <li><a href="#" class="text-white">Line 5</a></li>
              <li><a href="#" class="text-white">Line 6</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar navbar-dark bg-dark shadow-sm">
      <div class="container">
        <a href="#" class="navbar-brand d-flex align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            aria-hidden="true"
            class="me-2"
            viewBox="0 0 24 24"
          >
            <path
              d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
            />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <strong>Icon</strong>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarHeader"
          aria-controls="navbarHeader"
          aria-expanded="false"
          aria-label="تبديل التنقل"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>
  </header>

  <main>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">Dòng 1</h1>
        </div>
      </div>
    </section>
    <!--  -->
    <div class="">
      <h1 :v-for="(video, index) in videos" :key="index">Test 1</h1>
    </div>
    <!--  -->
    <div class="album py-5 bg-light">
      <div class="container">
        <!-- :v-for="video in videos" -->
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <!-- <div class="col" :v-for="(video, index) in videos" :key="index"> -->
          <div class="col" :v-for="(video, index) in videos" :key="index">
            <div class="card shadow-sm">
              <svg
                class="bd-placeholder-img card-img-top"
                width="100%"
                height="225"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: صورة مصغرة"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" />
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                  Title video
                </text>
              </svg>

              <div class="card-body">
                <p class="card-text">Mo ta</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      Xem
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      Chi tiết
                    </button>
                  </div>
                  <small class="text-muted">9 minutes</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <footer class="text-muted py-5">
    <div class="container"></div>
  </footer>
</template>

<script>
import axios from "axios";

export default {
  name: "ListVideo",
  data() {
    return {
      videos: [],
      users: [1, 2, 3, 4],
    };
  },
  // setup() {
  //   const listTrendingVideos = async () => {
  //     try {
  //       const result = await axios.get(
  //         "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=VN&key=AIzaSyCClLpj_uqqJDqtt_X5n7yvJLT_qsub84M"
  //       );
  //       const videos = result["data"]["items"];
  //       console.log(videos, this.users);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   listTrendingVideos();

  //   return {
  //     videos,
  //   };
  // },
  mounted() {
    this.listTrendingVideos();
  },
  methods: {
    async listTrendingVideos() {
      try {
        const result = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=VN&key=AIzaSyCClLpj_uqqJDqtt_X5n7yvJLT_qsub84M"
        );
        this.videos = [...result["data"]["items"]];
        console.log(this.videos);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
</style>