<template>
  <div v-if="nameLoaded">
    <div class="post__comment">
      <div>
        <nuxt-link :to="'/profile/' + commentData.commented_by">
          <UIProfileImg
            :userID="commentData.commented_by"
            :imgSize="35"
            class="mr-5"
          />
        </nuxt-link>
      </div>
      <div>
        <div class="post__comment-content">
          <strong class="post__comment-author">
            <nuxt-link :to="'/profile/' + commentData.commented_by">
              {{commentedByName}}
            </nuxt-link>
          </strong><br />
          <span><strong v-if="commentData.reply_to">@{{commentData.reply_to}} </strong><span v-html="commentText"></span></span>
          <QuizAction
            v-if="
              commentData.quiz_action &&
              commentData.quiz_action.placement == 'post_text'
            "
            :quizAction="commentData.quiz_action"
          />
        </div>
        <small>
          <strong @click="likeComment" :class="isLikedByMe ? 'liked' : ''">To se mi líbí</strong>
          <span class="post__comment-like-counter"><i class="las la-heart"></i> {{ likeCount }}</span>
          <span class="post__comment-middle-dot"> · </span>
          <strong @click="replyToComment">Odpovědět</strong>
          <span class="post__comment-middle-dot"> · </span>
          <TimeAgo :time="commentData.published" />
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UIProfileImg from "~/components/ui/UIProfileImg";

import clickableLinks from "~/mixins/clickableLinks.js";
import replaceSmileys from "~/mixins/smileys.js";

export default {
  mixins: [clickableLinks, replaceSmileys],
  props: {
    commentData: Object,
    postID: String
  },
  data() {
    return {
      comment_data: this.commentData,
      nameLoaded: false,
      commentText: "",
      commentedByName: this.commentData.commented_by,
      isLiked: false,
    };
  },
  components: {
    UIProfileImg,
  },
  computed: {
    isLikedByMe() {
      return this.comment_data.likes &&
        this.comment_data.likes.known &&
        this.comment_data.likes.known.indexOf("me") > -1
        ? true
        : false;
    },
    likeCount() {
      let knownCount =
        this.comment_data.likes && this.comment_data.likes.known
          ? this.comment_data.likes.known.length
          : 0;
      let othersCount =
        this.comment_data.likes && this.comment_data.likes.others
          ? this.comment_data.likes.others
          : 0;
      return knownCount + othersCount;
    },
  },
  methods: {
    likeComment() {
      if (!this.comment_data.likes) {
        this.comment_data = {
          ...this.comment_data,
          likes: { known: [] },
        };
      }

      if (this.comment_data.likes.known.indexOf("me") > -1) {
        this.comment_data.likes.known.splice(this.comment_data.likes.known.indexOf("me"), 1);
      } else {
        this.comment_data.likes.known.push("me");
      }
      this.updateComment({likes: this.comment_data.likes});       
    },  
    replyToComment() {
      this.$emit("addReplyReference", this.commentedByName);
    },
    getFullName() {
      if (this.commentData.commented_by == "me") {
        this.commentedByName = this.$store.getters.getloggedUserWholeName;
        this.nameLoaded = true;
      } else {
        axios
          .get(
            "http://jakubnedorost.cz/marty/json-cors.php?f=profiles_basic-info"
          )
          .then((response) => {
            const data = response.data[0][this.commentData.commented_by];
            if (data.first_name) {
              this.commentedByName = data.first_name + " " + data.last_name;
            } else {
              this.commentedByName = data.name;
            }
          })
          .catch((error) => console.log(error))
          .finally(() => (this.nameLoaded = true));
      }
    },
    updateComment(updatedProperty) {
        let commentData = {
            post_id: this.postID,
            comment_id: this.commentData.comment_id,
            commented_by: this.commentData.commented_by, 
            ...updatedProperty
        };
        this.$store.commit('updateComment', commentData);
    },
    getChangesFromStore() {
        let storeArrayPos;
        let othersComments = this.$store.state.othersComments[this.postID];
        if(othersComments!==undefined) {
          this.$store.state.othersComments[this.postID].forEach((item, index) => {
              if(item.comment_id==this.comment_data.comment_id) {
                  storeArrayPos = index;
              }
          });
          if(storeArrayPos!==undefined) {
              this.comment_data = {
                  ...this.comment_data,
                  ...this.$store.state.othersComments[this.postID][storeArrayPos]
              } 
          } 
        }   
    }        
  },
  mounted() {
    this.getChangesFromStore();
    this.commentText = this.makeLinksClickable(
      this.replaceSmileys(this.commentData.comment_text)
    );
    this.getFullName();
  },
};
</script>

<style lang="scss">
@import "~/assets/variables.scss";
.post__comment {
  display: flex;
  margin-bottom: 10px;

  small strong {
    cursor: pointer;
    font-size: 12px;
  }
}
.post__comment-content {
  position: relative;
  background: $message-grey-color;
  padding: 5px 7px;
  border-radius: 5px;
  overflow-wrap: break-word;

  .post__comment-author {
    margin-right: 10px;

    a {
      color: black;
      text-decoration: none;
      &:hover {
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
}
.post__comment-like-counter {
  display: inline-block;
  font-size: 10px;
  padding: 0 0 0 3px;
  top: -1px;
  position: relative;
}
.post__comment-middle-dot {
  padding: 0 3px;
}
.mr-5 {
  margin-right: 5px;
}
.liked {
  color: red;
}
</style>