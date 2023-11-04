<script setup>
import {musicStore} from "../stores/MusicStore";
import {useMediaControls} from "@vueuse/core";
import {computed, ref} from "vue";

const store = musicStore();

const album = store.albums[store.currentPlaylistId]

const audio = ref(document.getElementById('musicRoot'))

const {playing} = useMediaControls(audio)

const filterByAmount = (value) => {
  if (value < 1000000) {
    return (value / 1000) + 'K'
  } else {
    return (value / 1000000).toFixed(1) + 'M'
  }
}


</script>

<template>
  <div class="frame">
    <div class="nav">
      <div class="back-option material-symbols-outlined">
        arrow_back_ios
      </div>

      <div class="other">
        <div class="bell">
          <span class="material-symbols-outlined">
            notifications
          </span>
        </div>
        <div class="user">

        </div>
      </div>
    </div>
    <div class="header-top">
      <div class="album-info">
        <div class="album-picture" v-if="store.albums[store.currentPlaylistId-1]" :style="`background-image: url('${store.albums[store.currentPlaylistId-1].picture}')`" />
        <div class="album-picture" v-else></div>
        <div class="album-text-info">
          <p>PLAYLIST</p>
          <h1 v-if="store.albums[store.currentPlaylistId-1]">{{store.albums[store.currentPlaylistId].name}}</h1>
          <h1 v-else>Current Playlist</h1>

          <div class="info">
            <div class="creator-avatar "/>
            <h6>pansuman &nbsp;<span> 18 tracks</span>, &nbsp;<span>15 min. 51 sec.</span></h6>
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
          <div class="rows" v-for="(album, index) in store.music" @click="
                store.currentMusic = index;
                playing = !playing; console.log(store.currentMusic)"
                :class="album.name === store.music[store.currentMusic].name ? 'picked' : '' "
          >
            <div class="nums">
              {{index+1}}
            </div>
            <div class="name">
              <div class="artist" :style="`background-image: url('${album.image}')`" />
              <div class="text">
                <h4 :style="album.name === store.music[store.currentMusic].name ? 'color: #2BD268;' : '' ">{{album.name}}</h4>
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
      background: linear-gradient(360deg, #313131 0%, #363636 100%);
      padding: 1px 21px;

    .album-info {
      margin-top: 84px;
      display: flex;
      align-items: end;
      height: calc(100% - 80px - 25px);
      gap: 25px;

      .album-picture {
        height: 100%;
        aspect-ratio: 1/1;
        background-position: center;
        background-size: cover;
        border-radius: 5px;
      }

      .album-text-info {
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
            background-color: rgb(43, 210, 104);
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