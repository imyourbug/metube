<template>
  <main>
    <div class="album bg-light">
      <div class="container">
        <div
          class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
          v-if="videos && videos.length > 0"
        >
          <div
            class="col"
            v-for="(video, key) in videos"
            v-bind:key="key"
            @click="changeOtherVideo(video.id)"
          >
            <div class="card shadow-sm">
              <img :src="video.snippet.thumbnails.high.url" />
              <div class="card-body">
                <p class="card-text">{{ video.snippet.title }}</p>
                {{ roundNumber(video.statistics.viewCount) }} views <br />{{
                  video.snippet.channelTitle
                }}
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
        console.log(this.videos);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    changeOtherVideo(id) {
      this.$router.push({
        path: `/videos/detail/${id}`,
      });
    },
    roundNumber(num) {
      if (num > 999999999) {
        return +(Math.round(num / 1000000000 + "e+1") + "e-1") + "B";
      }
      if (num > 999999) {
        return +(Math.round(num / 1000000 + "e+1") + "e-1") + "M";
      }
      if (num > 999) {
        return +(Math.round(num / 1000 + "e+1") + "e-1") + "K";
      }

      return num;
    },
  },
};
</script>

<style>
.card-body,
.text-card {
  text-align: left;
}
.card-text{
  font-weight: bold;
}
</style>