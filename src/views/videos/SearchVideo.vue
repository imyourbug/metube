<template>
  <main>
    <div class="album py-5 bg-light">
      <div class="container" v-if="videos && videos.length > 0">
        <div class="row" v-for="(video, key) in videos" v-bind:key="key">
          <div class="col-4">
            <p class="image is-128x128">
              <img :src="video.snippet.thumbnails.medium.url" />
            </p>
          </div>
          <div class="col-8">
            <div class="block-video">
              <div class="content">
                <p>
                  <strong>{{ video.snippet.title }}</strong>
                  <br />
                  {{ video.snippet.description }}
                </p>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <a
                    :href="'/videos/detail/' + video.id.videoId"
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                  >
                    Xem
                  </a>
                  <a
                    :href="'/videos/detail/' + video.id.videoId"
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
  </main>
  <br />
  <footer class="text-muted py-5">
    <div class="container"></div>
  </footer>
</template>

<script>
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";

const VideoRepository = RepositoryFactory.get("video");

export default {
  name: 'SearchVideo',
  data() {
    return {
      videos: [],
      key_word: '',
    };
  },
  created() {
    this.key_word = this.$router.currentRoute.value.params.key_word;
  },
  mounted() {
    this.emitter.on('search-video', (key_word) => {
      this.key_word = key_word;
      this.reload();
    });
  },
  methods: {
    reload() {
      VideoRepository.searchVideoByKeyWord(this.key_word)
        .then((response) => {
          this.videos = response.data.items;
          console.log(this.videos);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
.content {
  text-align: left;
}
</style>