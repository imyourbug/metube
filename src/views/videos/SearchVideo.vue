<template>
  <main>
    <div class="album bg-light">
      <div class="container" v-if="videos && videos.length > 0">
        <div
          class="row"
          v-for="(video, key) in videos"
          v-bind:key="key"
          @click="changeOtherVideo(video.id.videoId)"
        >
          <div class="col-3">
            <p class="image is-128x128">
              <img :src="video.snippet.thumbnails.medium.url" />
            </p>
          </div>
          <div class="col-9">
            <div class="block-video">
              <div class="content">
                <p>
                  <strong>{{ video.snippet.title }}</strong>
                  <br />
                  {{ video.snippet.description }}
                </p>
              {{video.snippet.channelTitle}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <br />
</template>

<script>
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";

const VideoRepository = RepositoryFactory.get("video");

export default {
  name: "SearchVideo",
  data() {
    return {
      videos: [],
      key_word: "",
    };
  },
  created() {
    this.key_word = this.$router.currentRoute.value.params.key_word;
  },
  mounted() {
    this.emitter.on("search-video", (key_word) => {
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
    changeOtherVideo(id) {
      this.$router.push({
        path: `/videos/detail/${id}`,
      });
    },
  },
};
</script>

<style>
.content, .text-muted {
  text-align: left;
  padding-left: 5px;
}
</style>