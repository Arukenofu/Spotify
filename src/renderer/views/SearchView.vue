<script setup>
import SearchBar from "../components/SearchBar.vue";
import SideBar from "../components/SideBar.vue";
import {musicStore} from "../stores/MusicStore";
import {computed, onMounted, ref  } from "vue";
import {useMediaControls} from "@vueuse/core/index";

const store = musicStore();
const {globalMusic, albums} = store;

onMounted(() => {
  playing.value = store.playing;
})

const search = ref('')
const changeSearch = (value) => {
  search.value = value;
}

const findBySearch = computed(() => {
  return globalMusic.filter(({name, singer}) => [name, singer].some(val => val.toLowerCase().includes(search.value.toLowerCase())))
})

const bestTrack = computed(() => {
  const object = [...findBySearch.value]
  return object.sort((a, b) => b.auditions > a.auditions ? 1 : -1);
})

const findAlbumBySearch = computed(() => {
  return albums.filter(({name}) => (name).toLowerCase().includes(search.value.toLowerCase()));
})

const filterByAmount = (value) => {
  if (value < 1000000) {
    return (value / 1000) + 'K'
  } else {
    return (value / 1000000).toFixed(1) + 'M'
  }
}

const audio = ref(document.getElementById('musicRoot'));
const {playing} = useMediaControls(audio)

const togglePlayArrowById = (el) => {
  if (playing.value) {
    return store.music[store.currentMusic].name === el.name ? 'pause' : 'play_arrow'
  }
  else {
    return 'play_arrow';
  }
}

const addToCurrentPlaylist = (el) => {
  const items = store.music.find(item => item.id === el.id)

  if (items) {
    return;
  }

  store.music.push(el)
  store.currentPlaylistId = null;
}

const changeTo = (track) => {
  store.music = globalMusic;
  store.currentMusic = track.id-1;
  playing.value = !playing.value
}

</script>

<template>
  <search-bar @event="changeSearch"/>
  <div class="content">
    <div class="search-field">
      <div class="tracks">
        <div class="best-track">
          <h2>Best Track</h2>
          <div
              class="best-music-block"
              v-if="bestTrack.length"
              :class="playing ?
               store.music[store.currentMusic].name === bestTrack[0].name ?
                'best-music-block-active' : 'best-music-block-inactive' : 'best-music-block-inactive'"
          >
            <div class="avatar" :style="`background-image: url('${bestTrack[0].image}')`" />
            <h3 class="music-name">{{bestTrack[0].name}}
              <div class="play material-symbols-rounded" @click="
              store.music = globalMusic;
              store.currentMusic = bestTrack[0].id-1;
              playing = !playing"
              >
                {{togglePlayArrowById(bestTrack[0])}}
              </div>
            </h3>
            <p class="singer">
              <span class="material-symbols-outlined">explicit</span>
              {{bestTrack[0].singer}}
            </p>
          </div>
        </div>
        <div class="other-tracks">
          <h2>Tracks</h2>
          <div class="track-list">
            <div
                class="track"
                v-for="track in bestTrack.slice(0, 4)"
                :key="track.id"
                @click.self="changeTo(track)"
            >
              <div class="avatar-pole" @click="changeTo(track)">
                <div class="avatar" :style="`background-image: url('${track.image}')`" />
                <div class="play material-symbols-outlined">
                  {{togglePlayArrowById(track)}}
                </div>
              </div>
              <div class="music-info" @click="changeTo(track)">
                <h6 :style="store.music[store.currentMusic].name === track.name ? 'color: var(--main);' : 'color: white'">
                  {{track.name}}
                </h6>
                <p>{{track.singer}}</p>
              </div>
              <div class="options">
                <button class="favourite material-symbols-outlined"
                  @click="addToCurrentPlaylist(track)"
                >
                  add
                </button>
                <span>
                  {{filterByAmount(track.auditions)}}
                </span>
                <button class="more material-symbols-outlined">
                  more_horiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="albums-section">
        <h2>Albums</h2>
        <div class="albums-wrap">
          <div class="album" v-for="album in findAlbumBySearch" :key="album.id">
            <div class="image" :style="`background-image: url('${album.picture}')`">
              <button
                  class="material-symbols-outlined"
                  @click="
                    store.music = album.musics;
                    store.currentMusic = 0;
                    store.currentPlaylistId = album.id;
                    playing =! playing
                  "
              >
                {{ store.music == album.musics && playing ?  'pause' : 'play_arrow' }}
              </button>
            </div>
            <h3>{{album.name}}</h3>
            <p>{{album.description}}</p>
          </div>
        </div>
      </div>
    </div>
    <side-bar></side-bar>
  </div>

</template>

<style scoped lang="scss">
.content {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;

  .search-field {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 78.5%;
    max-width: 100%;

    .tracks {
      display: flex;
      width: 100%;
      gap: 30px;

      .best-track {
        flex: 40;

        h2 {
          font-weight: 700;
          margin-bottom: 20px;
        }

        .best-music-block {
          display: flex;
          height: 250px;
          justify-content: center;
          flex-direction: column;
          min-height: 220px;
          padding: 27px;
          border-radius: 10px;
          transition: 0.2s;
          position: relative;

          .avatar {
            aspect-ratio: 1/1;
            width: 95px;
            background-position: center;
            background-size: cover;
            border-radius: 5px;
            margin-bottom: 10px;
          }

          .music-name {
            font-weight: 900;
            font-size: 2rem;
            margin-bottom: 2px;
          }

          .singer {
            display: flex;
            align-items: flex-end;
            font-weight: 600;
            font-size: 0.9rem;

            .material-symbols-outlined {
              font-size: 1.25rem;
              font-variation-settings:
                  'FILL' 1,
                  'wght' 400,
                  'GRAD' 0,
                  'opsz' 24;
              margin-right: 5px;
            }
          }

          .play {
            opacity: 0;
            border-radius: 50%;
            position: absolute;
            right: 30px;
            bottom: 30px;
            padding: 13px;
            cursor: pointer;
            transition: 0.2s;
            transform: translateY(10px);
          }
        }

        .best-music-block-inactive {
          background-color: #050505;

          &:hover {
            background-color: #121212;

            .play {
              opacity: 1;
              transform: translateY(0px);
              background-color: var(--main);
            }
          }
        }
        .best-music-block-active {
          background-color: var(--main);

          &:hover {
            background-color: var(--main);

            .play {
              opacity: 1;
              transform: translateY(0px);
              background-color: #121212;
            }
          }
        }
      }

      .other-tracks {
        flex: 60;

        h2 {
          font-weight: 700;
          margin-bottom: 20px;
        }

        .track-list {
          width: 100%;
          height: 250px;

          .track {
            display: flex;
            width: 100%;
            height: calc(250px / 4);
            padding: 10px;
            border-radius: 5px;

            &:hover {
              background-color: #121212;

              .options .favourite {
                display: block;
              }
              & > .avatar-pole {
                .avatar {
                  filter: brightness(40%);
                }
                .play {
                  opacity: 1;
                }
              }
            }

            .avatar-pole {
              cursor: pointer;
              position: relative;
              height: 100%;
              aspect-ratio: 1/1;

              .avatar {
                position: relative;
                height: 100%;
                aspect-ratio: 1/1;
                background-position: center;
                background-size: cover;
                border-radius: 3px;
                font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .play {
                opacity: 0;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
              }
            }

            .music-info {
              margin-left: 15px;

              h6 {
                font-size: 1.1rem;
                font-weight: 600;
              }
              p {
                font-size: 0.8rem;
                color: rgb(128, 128, 128);
              }
            }

            .options {
              margin-left: auto;
              display: flex;
              align-items: center;

              .favourite {
                font-size: 1.5rem;
                display: none;
                background-color: inherit;
                border: none;
                font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
                color: rgb(128, 128, 128);
              }
              span {
                min-width: 35px;
                font-size: 0.9rem;
                margin-left: 25px;
              }
              .more {
                font-size: 1.7rem;
                background: inherit;
                border: none;
                margin-left: 10px;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
    .albums-section {
      margin-top: 36px;

      h2 {
        font-weight: 700;
        margin-bottom: 20px;
      }

      .albums-wrap {
        display: flex;
        gap: 30px;

        .album {
          cursor: pointer;
          border-radius: 9px;
          width: 25%;
          aspect-ratio: 1/1.35;
          background-color: #050505;
          transition: 0.2s;
          padding: 18px;
          &:hover {
            background-color: #121212;

            & .image button {
              opacity: 1;
              transform: translateY(0px);
            }
          }

          .image {
            position: relative;
            width: 100%;
            aspect-ratio: 1/1;
            border-radius: 6px;
            margin-bottom: 15px;

            button {
              opacity: 0;
              position: absolute;
              background-color: var(--main);
              border-radius: 50%;
              border: none;
              bottom: 12px;
              right: 12px;
              font-size: 2rem;
              padding: 10px;
              font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
              transition: 0.2s;
              transform: translateY(5px);

              &:hover {
                background-color: var(--main);
                padding: 11px;
              }
            }
          }
          h3 {
            font-size: 1.5rem;
            font-weight: 700;
          }
          p {
            font-size: 0.9rem;
            font-weight: 500;
            color: rgb(128, 128, 128);
          }
        }
      }
    }
  }
}
</style>