<script setup>
import {musicStore} from "../stores/MusicStore";
import {useMediaControls} from "@vueuse/core";
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import TopNav from "../components/TopNav.vue";
import {useRoute} from "vue-router";
const route = useRoute()

const store = musicStore();

const album = store.albums[store.currentPlaylistId];
const colors = ref([])

onMounted(async () => {
  playing.value = store.playing;
  isStoreAlbum() ? colors.value = (await axios.post('http://localhost:3000/color', {image: currentMusic.value.picture})).data : '';
})

const audio = ref(document.getElementById('musicRoot'))

const {playing} = useMediaControls(audio)

const filterByAmount = (value) => {
  if (value < 1000000) {
    return (value / 1000) + 'K'
  } else {
    return (value / 1000000).toFixed(1) + 'M'
  }
}



const isStoreAlbum = () => {
  return !!(store.currentPlaylistId || route.params.id);
}

const currentMusic = computed(() => {
  if (route.params.id) {
    return store.albums[route.params.id-1]
  }
  return store.albums[store.currentPlaylistId-1]
})

const currentAlbum = computed(() => {
  if (route.params.id) {
    return store.albums[route.params.id-1].musics;
  }
  return store.music;
})

const checkParams = () => {
  if (route.params.id) {
    store.music = store.albums[route.params.id-1].musics;
    store.currentPlaylistId = route.params.id+1
  }
}
</script>

<template>
  <div class="frame" >
    <top-nav :style="isStoreAlbum() ? `background-color: ${colors[0]}` : ''" />
    <div class="header-top" :style="
      isStoreAlbum() ?
      `background-color: ${colors[0]}` : 'background: linear-gradient(360deg, #313131 0%, #363636 100%);'"
    >
      <div class="album-info">
        <div class="album-picture" v-if="isStoreAlbum()"
             :style="`background-image: url('${currentMusic.picture}')`" />
        <div class="album-text-info">
          <p>PLAYLIST</p>
          <h1 v-if="isStoreAlbum()">{{currentMusic.name}}</h1>
          <h1 v-else>Current Queue</h1>

          <div class="info">
            <div class="creator-avatar" v-if="isStoreAlbum()" />
            <h6>
              {{isStoreAlbum() ? ' pansuman' : ''}}  <span> {{isStoreAlbum() ? currentMusic.tracksamount : store.music.length}} tracks</span> &nbsp;<span v-if="isStoreAlbum()">15 min. 51 sec.</span>
            </h6>
          </div>
        </div>
      </div>
    </div>
    <div class="music-list">
        <div class="album-headers">
          <div class="nums">
            #
          </div>
          <div class="name">
            Name
          </div>
          <div class="date_added">
            Date Added
          </div>
          <div class="auditions">
            Auditions
          </div>
          <div class="music-options" />
        </div>
        <div class="albums-wrap">
          <div class="rows" v-for="(album, index) in currentAlbum" @click="
                store.currentMusic = index;
                checkParams()
                playing = !playing; console.log(store.currentMusic)"
                :class="album.name === store.music[store.currentMusic].name ? 'picked' : '' "
          >
            <div class="nums">
              {{index+1}}
            </div>
            <div class="name">
              <div class="artist" :style="`background-image: url('${album.image}')`" />
              <div class="text">
                <h4 :style="album.name === store.music[store.currentMusic].name ? 'color: var(--main);' : '' ">{{album.name}}</h4>
                <p>{{album.singer}}</p>
              </div>
            </div>
            <div class="date_added">
              {{}}
            </div>
            <div class="auditions">
              {{filterByAmount(album.auditions)}}
            </div>
            <div class="music-options">

            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<style scoped lang="scss">
.frame {
  background: linear-gradient(180deg, #191919 1.09%, rgba(0, 0, 0, 0.60) 90%);
  min-width: 100%;
  min-height: 100%;

  .nav {
    box-sizing: inherit;
    top: 0;
    background-color: #363636;
    width: calc(100% - 100px);
    padding: 0 21px;
    position: fixed;
    margin-top: 28px;
    display: flex;
    justify-content: space-between;
    height: 60px;
    align-items: center;

    .back-option {
      height: 30px;
      aspect-ratio: 1/1;
      cursor: pointer;
      border-radius: 50%;
      font-size: 1.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .other {
      display: flex;
      align-items: center;
      gap: 10px;

      .bell {
        span {
          cursor: pointer;
          padding: 8px;
          font-size: 1.22rem;
          border-radius: 50%;
          background-color: #1a1a1a;
          color: #e0e0e0;
          font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;

          &:hover {
            transform: scale(1.1);
            color: #FFFFFF;
          }
        }
      }

      .user {
        cursor: pointer;
        background-image: url("https://www.datocms-assets.com/55010/1631448986-1609827492810345-modelo.jpg?auto=format&fit=max&w=1200");
        background-position: center;
        background-size: cover;
        height: 35px;
        aspect-ratio: 1/1;
        border-radius: 50%;

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }

  .header-top {
    max-width: 100vw;
    height: 300px;
    padding: 1px 21px;

    .album-info {
      margin-top: 84px;
      display: flex;
      align-items: end;
      height: calc(100% - 80px - 25px);

      .album-picture {
        height: 100%;
        aspect-ratio: 1/1;
        background-position: center;
        background-size: cover;
        border-radius: 5px;
      }

      .album-text-info {
        margin-left: 25px;
        p {
          text-transform: uppercase;
          font-size: 0.8rem;
          font-weight: 500;
        }

        h1 {
          font-size: 6rem;
          font-weight: 900;
          margin-bottom: 5px;
        }

        .info {
          display: flex;
          height: 20px;
          align-items: center;

          .creator-avatar {
            height: 100%;
            aspect-ratio: 1/1;
            border-radius: 50%;
            background-image: url("https://i.scdn.co/image/ab67757000003b827963f16b625ee94f8c337bfb");
            background-position: center;
            background-size: cover;
          }

          h6 {
            display: flex;
            align-items: center;
            height: 100%;
            margin-left: 5px;
            font-size: 0.82rem;

            &:not(span) {
              font-weight: 900;
            }

            span:first-child {
              font-weight: 700;
            }
          }
        }
      }
    }
  }
}

.music-list {
  width: 100%;

  .album-headers {
    top: 85px;
    position: sticky;
    display: flex;
    background-color: #191919;
    border-bottom: 2px solid #2E2E2C;
    height: 55px;
    align-items: flex-end;
    padding: 0 100px;

    div {
      color: #a8a8a8;
      margin-bottom: 4px;
      font-weight: 600;
      font-size: 1rem;
    }
  }

  .albums-wrap {
    margin-top: 10px;
    padding: 0 100px;
    width: 100%;

    .rows {
      padding: 6.5px 0;
      display: flex;
      height: 60px;
      align-items: center;
      border-radius: 3px;
      cursor: pointer;
      margin-bottom: 1px;

      &:hover {
        background-color: #363636;
      }

      .nums, .auditions {
        color: #a8a8a8;
      }

      .auditions {
        font-size: 0.9rem;
      }

      .name {
        display: flex;
        align-items: center;
        gap: 10px;
        height: 100%;

        .artist {
          height: 100%;
          aspect-ratio: 1/1;
          background-size: cover;
          background-position: center;
          border-radius: 3px;
        }

        .text {
          color: #a8a8a8;
          h4 {
            font-size: 1rem;
            font-weight: 600;
          }
          .text-active {
            background-color: var(--main);
          }
          p {
            font-size: 0.8rem;
            font-weight: 300;
            color: #c9c9c9;
          }
        }
      }
    }
    .picked {
      background-color: #232323;
    }
  }
}

.nums {
  flex: 4.5;
  text-align: center;
}
.name {
  flex: 45.5;
  text-align: left;
}
.date_added {
  flex: 20;
  text-align: left;
}
.auditions {
  flex: 24;
  text-align: right;
}
.music-options {
  flex: 3;
}
</style>