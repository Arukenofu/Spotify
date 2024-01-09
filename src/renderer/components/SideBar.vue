<script setup>
import {UserStore} from "../stores/UserStore";
import {computed, ref} from "vue";
import {musicStore} from "../stores/MusicStore";
import {useMediaControls} from "@vueuse/core/index";

const userStore = UserStore();
const {users} = userStore;

const store = musicStore();
const {music} = store;

const isOpened = ref(false)

const audio = ref(document.getElementById('musicRoot'));

const {playing} = useMediaControls(audio);

const changeMusic = (friendMusic) => {
  store.music = store.globalMusic;
  store.currentMusic = friendMusic;
  playing.value = true;
}

const friends = computed(() => {
  return users
})
</script>

<template>
  <aside>
    <transition name="toggle">
      <div class="friend-activity">
        <div class="sidebar-header">
          <h2>Subscription Activity</h2>
          <span class="material-symbols-outlined">
            view_cozy
          </span>
        </div>
        <keep-alive>
          <div class="friends-activity-wrap" :class="isOpened ? 'friend-activity-active' : 'friend-activity-inactive'">
              <div class="friend" v-if="users" v-for="friend in friends" :key="friend.id">
                <div class="friend-pfp" @click="$router.push(`/user/${friend.id}`)" :style="`background-image: url(${friend.avatar})`" />
                <div class="friend-text">
                  <h2>{{friend.username}}</h2>
                  <button v-if="store.globalMusic[friend.hearing]"
                          @click="changeMusic(friend.hearing)"
                          :style="store.globalMusic[friend.hearing].name === store.music[store.currentMusic].name ? 'color: var(--main)' : ''"
                  >
                    {{store.globalMusic[friend.hearing].singer + ' - ' + store.globalMusic[friend.hearing].name}}
                  </button>
                  <button v-else>
                    No data
                  </button>
                </div>
              </div>
          </div>
        </keep-alive>
        <button class="view-more" @click="isOpened =! isOpened" v-if="friends.length >= 4">
          {{isOpened ? 'Close' : 'View All'}}
        </button>
      </div>
    </transition>
  </aside>

</template>

<style lang="scss">
aside {
  flex: 20;
  max-width: 282px;

  .friend-activity {
    background-color: #0D0D0D;
    border: 1px #333333 solid;
    width: 92.5%;
    min-width: 250px;
    border-radius: 25px;
    padding: 23px 22px;

    .view-more {
      width: 100%;
      height: 50px;
      border-radius: 15px;
      background-color: #232323;
      border: none;
      color: #FFFFFF;
      transition: all 0.2s ease-in-out;

      &:active {
        opacity: 0.8;
      }
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      h2 {
        font-weight: 700;
        font-size: 1.05rem;
      }

      span {
        font-size: 1.2rem;
        color: #646464;
        margin-left: auto;
      }

      .material-symbols-outlined {
        font-variation-settings:
            'FILL' 1,
            'wght' 800,
            'GRAD' 0,
            'opsz' 48
      }
    }

    .friends-activity-wrap {
      transition: all 0.3s ease-in-out;
      .friend {
        height: 50px;
        display: flex;
        gap: 10px;
        margin-bottom: 25px;

        .friend-pfp {
          background-size: cover;
          background-position: center;
          background-color: #383838;
          border-radius: 45px;
          height: 100%;
          aspect-ratio: 1/1;
          cursor: pointer;
        }

        .friend-text {
          display: flex;
          justify-content: center;
          flex-direction: column;
          gap: 2px;

          h2 {
            font-size: 0.9rem;
            font-weight: 600;
          }
          button {
            text-align: start;
            background-color: inherit;
            border: none;
            font-size: 0.7rem;
            font-weight: 500;
            color: #bcbcbc;
          }
        }
      }
    }
  }

  .friend-activity-inactive {
    max-height: 425px;
    height: 425px;
  }

  .friend-activity-active {
    max-height: 900px;
  }
}

.toggle-enter-active {
  transition: all 0.1s ease-in-out;
}
.toggle-enter-from {
  opacity: 0;
}

.friendAnimation-enter-active {
  transition: all 0.7s ease;
}

.friendAnimation-enter-from {
  opacity: 0;
}

@media (max-width: 1280px) {
  aside {
    display: none;
  }
}
</style>