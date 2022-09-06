<template>
  <main>
    <div class="album bg-light">
      <div class="container" v-if="videos && videos.length > 0">
        <div class="row">
          <div class="col-8" v-for="(video, key) in videos" v-bind:key="key">
            <div class="row">
              <iframe
                id="player"
                type="text/html"
                width="100%"
                height="400px"
                :src="url"
                frameborder="0"
              ></iframe>
            </div>
            <br />
            <div class="content">
              <div class="row">
                <div class="col-12 text">
                  <p>
                    <strong style="font-size: 24px">{{
                      video.snippet.title
                    }}</strong>
                    <br />
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-12 text">
                  <p>
                    <strong
                      >{{ roundNumber(video.statistics.viewCount) }} views
                    </strong>
                    {{ video.snippet.title }}
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <i class="fa-solid fa-thumbs-up"></i>
                  {{ roundNumber(video.statistics.likeCount) }}
                  &emsp;
                  <i class="fa-solid fa-thumbs-down"></i> Dislike &emsp;
                  <i class="fa-solid fa-share"></i> Share &emsp;
                  <i class="fa-solid fa-scissors"></i> Cut &emsp;
                  <i class="fa-solid fa-plus"></i> Save
                </div>
              </div>
            </div>
            <br />
            <div class="block-comment">
              <div class="row">
                <div class="col-1">
                  <img
                    class="avatar"
                    :src='avatar_user'
                  />
                </div>
                <div class="col-9 input-comment">
                  <input class="txt-comment form-control" type="text" placeholder="Add a comment..." width="100%" v-model="comment"/>
                  <p v-if="isError" class="text-error">Invalid comment!</p>
                </div>
                <div class="col-2 add-comment">
                  <input type="button" value="Comment" class="btn btn-success" @click="addComment"/>
                </div>
              </div>
            </div>
            <br/>
            <div class="block-comment" v-if="comments && comments.length > 0">
              <div
                class="row"
                v-for="(comment, key) in comments"
                v-bind:key="key"
              >
                <div class="col-1">
                  <img
                    class="avatar"
                    :src="
                      comment.snippet.topLevelComment.snippet
                        .authorProfileImageUrl
                    "
                  />
                </div>
                <div class="col-11 comment">
                  <p>
                    <strong>{{
                      comment.snippet.topLevelComment.snippet.authorDisplayName
                    }}</strong>
                    <br />
                    {{
                      showComment(
                        comment.snippet.topLevelComment.snippet.textDisplay
                      )
                    }}
                    <br />
                    <small
                      ><a>Like</a>
                      {{ comment.snippet.topLevelComment.snippet.likeCount }}
                      <a> · Reply</a> · 2 hrs</small
                    >
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
              @click="changeOtherVideo(video_related.id)"
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
                      {{ video_related.snippet.channelTitle }}
                    </p>
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
  name: 'DetailVideo',
  data() {
    return {
      videos: [],
      related_videos: [],
      comments: [],
      comment: '',
      id: '',
      avatar_user: '',
      url: '',
      isError: false,
    };
  },
  created() {
    this.id = this.$router.currentRoute.value.params.id;
    this.reload(this.id);
  },
  methods: {
    async reload(id) {
      this.id = id;
      await VideoRepository.getVideoByID(this.id)
        .then((response) => {
          this.videos = response.data.items;
          console.log(this.videos);
        })
        .catch((e) => {
          console.log(e);
        });
      // get related videos
      this.getRelatedVideos();
      // get comments
      this.getCommentsByVideoID(this.id);
      // embeded video youtube
      this.url = 'http://www.youtube.com/embed/' + this.id;
      // get avatar user
      this.avatar_user = localStorage.avatar_user ?? '';

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
          console.log(this.related_videos);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getCommentsByVideoID(id) {
      VideoRepository.getCommentsByVideoID(id)
        .then((response) => {
          this.comments = response.data.items;
          console.log("Comments:", this.comments);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addComment() {
      if (this.comment.trim()) {
        this.isError = false;
        VideoRepository.addComment(this.id, this.videos[0].snippet.channelId, this.comment)
        .then((response) => {
          this.reload(this.id);
        })
        .catch((e) => {
          console.log(e);
        });
      }
      else {
        this.isError = true;
      }
    },
    changeOtherVideo(id) {
      this.id = id;
      this.$router.push({
        path: `/videos/detail/${this.id}`,
      });
      this.reload(this.id);
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
    showComment(comment) {
      if (this.countWord(comment) > 120) {
        return comment.substring(0, 119);
      }

      return comment;
    },
    countWord(str) {
      return str.split(" ").filter(function (n) {
        return n != "";
      }).length;
    },
  },
};
</script>

<style>
.comment {
  text-align: left;
  padding-left: 10px;
}
.text {
  text-align: left;
}
.avatar {
  border-radius: 50%;
  width: 50px;
  align-items: center;
}
.text-error{
  color: red;
  text-align: left;
}
</style>