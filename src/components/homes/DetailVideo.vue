<template>
  <main>
    <div class="album py-5 bg-light">
      <div class="container" v-if="videos && videos.length > 0">
        <div class="row">
          <div class="col-8" v-for="(video, key) in videos" v-bind:key="key">
            <img :src="video.snippet.thumbnails.high.url" />
            <div class="content block-video">
              <div class="row">
                <div class="col-6 text">
                  <p>
                    <!-- <strong>{{ video.snippet.title }}</strong> -->
                    <strong
                      >Vue JS 3 Tutorial - Project #03 | Router Guards & Common
                      Layout Vue 3</strong
                    >
                    <br />
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-6 text">
                  <p>
                    <strong
                      >{{ roundNumber(video.statistics.viewCount) }} views
                    </strong>
                    {{ video.snippet.title }}
                  </p>
                </div>
                <div class="col-6">
                  <i class="fa-solid fa-thumbs-up"></i>
                  {{ roundNumber(video.statistics.likeCount) }}
                  &emsp;
                  <i class="fa-solid fa-thumbs-down"></i> Dislike &emsp;
                  <i class="fa-solid fa-share"></i> Share
                </div>
              </div>
            </div>
            <div class="block-comment">
              <div class="row">
                <div class="col-1">
                  <img src="https://bulma.io/images/placeholders/96x96.png" />
                </div>
                <div class="col-11 comment">
                  <p>
                    <strong>Khai</strong>
                    <br />
                    Comment
                    <br />
                    <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div
              class="row"
              v-for="(video_related, key) in related_videos"
              v-bind:key="key"
            >
              <div class="col-4">
                <p class="image is-128x128">
                  <img :src="video_related.snippet.thumbnails.default.url" />
                </p>
              </div>
              <div class="col-8">
                <div class="block-video">
                  <div class="content">
                    <p>
                      <strong>{{ video_related.snippet.title }}</strong>
                      <br />
                      {{ video_related.snippet.title }}
                    </p>
                  </div>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="btn-group">
                      <a
                        :href="'/videos/detail/' + video_related.id"
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        Xem
                      </a>
                      <a
                        :href="'/videos/detail/' + video_related.id"
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        Chi tiết
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";
// import { ref } from "vue";

const VideoRepository = RepositoryFactory.get("video");

export default {
  name: "DetailVideo",
  data() {
    return {
      videos: [],
      related_videos: [],
      id: "",
    };
  },
  mounted() {
    this.reload();
  },
  methods: {
    async reload() {
      this.id = this.$router.currentRoute.value.params.id;
      await VideoRepository.getVideoByID(this.id)
        .then((response) => {
          this.videos = response.data.items;
        })
        .catch((e) => {
          console.log(e);
        });
      //
      this.getRelatedVideos();
    },
    async getRelatedVideos() {
      let ids = [];
      await VideoRepository.getRelatedVideos(this.id)
        .then((response) => {
          response.data.items.forEach(function (item) {
            ids.push(item.id.videoId);
          });
        })
        .catch((e) => {
          console.log(e);
        });
      this.getMultipleVideoByIDs(ids);
    },
    getMultipleVideoByIDs(ids) {
      VideoRepository.getMultipleVideoByIDs(ids)
        .then((response) => {
          this.related_videos = response.data.items;
          console.log("ids:", this.related_videos);
        })
        .catch((e) => {
          console.log(e);
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
.comment {
  text-align: left;
  padding-left: 50px !important;
}
.text {
  text-align: left;
}
</style>