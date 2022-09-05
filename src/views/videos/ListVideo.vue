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
                      :href="'/videos/detail/' + video.id"
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      Xem
                    </a>
                    <a
                      :href="'/videos/detail/' + video.id"
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

const VideoRepository = RepositoryFactory.get("video");

export default {
  name: "ListVideo",
  data() {
    return {
      videos: [],
    };
  },
  mounted() {
    VideoRepository.getListTrendingVideos()
      .then((response) => {
        this.videos = response.data.items;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style>
</style>