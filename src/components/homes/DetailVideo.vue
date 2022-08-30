<template>
  <main>
    <div class="album py-5 bg-light">
      <div class="container">
        <div
          class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
          v-if="videos && videos.length > 0"
        >
          <div class="col" v-for="(video, key) in videos" v-bind:key="key">
            <div class="card shadow-sm">
              <img :src="video.snippet.thumbnails.high.url" />

              <div class="card-body">
                <p class="card-text">{{ video.snippet.title }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <a
                      :href="'/videos/detail/id?=' + video.id"
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      Xem
                    </a>
                    <a
                      :href="'/videos/detail/id?=' + video.id"
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      Chi tiết
                    </a>
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
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";
// import { ref } from "vue";

const VideoRepository = RepositoryFactory.get("video");

export default {
  name: "DetailVideo",
  data() {
    return {
      video: [],
      errors: [],
    };
  },
  created() {
    this.reload();
  },
  methods: {
    reload() {
      const path = this.$router.currentRoute.value.path;
      console.log(path);
      if (path === "video/search") {
        VideoRepository.searchVideoByKeyWord(
          this.$router.currentRoute.value.query["key_word"]
        )
          .then((response) => {
            this.videos = response.data.items;
            console.log("Search", this.videos);
          })
          .catch((e) => {
            this.errors.push(e);
          });
      } else if (path === "video/detail") {
        VideoRepository.getDetailVideo(
          this.$router.currentRoute.value.query["id"]
        )
          .then((response) => {
            this.videos = response.data.items;
            console.log("Detail", this.videos);
          })
          .catch((e) => {
            this.errors.push(e);
          });
      } else {
        VideoRepository.getListTrendingVideos()
          .then((response) => {
            this.videos = response.data.items;
            console.log("Trend", this.videos);
          })
          .catch((e) => {
            this.errors.push(e);
          });
      }
    },
  },
};
</script>

<style>
</style>