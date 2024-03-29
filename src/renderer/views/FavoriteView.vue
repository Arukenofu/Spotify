<script setup>
import TopNav from "../components/TopNav.vue";
import {musicStore} from "../stores/MusicStore";
import {onMounted, ref} from "vue";
import {useMediaControls} from "@vueuse/core";
import router from "../router";
import axios from "axios";

const store = musicStore();
const getDate = () => {
  const hour = new Date().getHours()
  if (hour >= 0 && hour <= 6) {
    return "Доброй ночи"
  }
  if (hour > 6 && hour <= 12) {
    return "Доброе утро"
  }
  if (hour > 12 && hour <= 18) {
    return "Добрый день"
  }
  if (hour > 18 && hour <= 24) {
    return "Добрый вечер"
  }
}

const favorites = ref();

const isLoaded = ref(false);

const favoriteAlbums = ref([]);

onMounted(async () => {
  playing.value = store.playing;

  favorites.value = (await axios.post('http://localhost:3000/getFavorites', {
    userID: localStorage.getItem('id')
  }, {
    Authorization: `${localStorage.getItem('token')}`,
  })).data;

  const favoriteList = (await axios.post('http://localhost:3000/getFavoriteAlbumsId', {
    userid: localStorage.getItem('id')
  }, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    }
  })).data;
  console.log(favoriteList)

  for (let i = 0; i < favoriteList.length; i++) {
    favoriteAlbums.value.push(store.albums[favoriteList[i].albumid-1]);
  }

  console.log(favoriteAlbums.value)

  isLoaded.value = true;
})

const audio = ref(document.getElementById('musicRoot'))
const {playing} = useMediaControls(audio);

const changeToAlbum = (playlist) => {
  store.music = playlist.musics;
  store.currentMusic = 0;
  store.currentPlaylistId = playlist.id;

  if (store.currentPlaylistId === playlist.id) {
    playing.value =! playing.value;
  }
}

const togglePlayArrowById = (el) => {
  if (playing.value) {
    return store.music[store.currentMusic].name === el.name ? 'pause' : 'play_arrow'
  }
  else {
    return 'play_arrow';
  }
}

const recentMusics = JSON.parse(localStorage.getItem('objectArray')) || [];

</script>

<template>

<div class="frame">
  <top-nav class="nav" />

  <div class="favorite-page">
    <div v-if="favoriteAlbums.length" class="playlist-head head">
      <h2>{{getDate()}}</h2>
    </div>
    <div v-if="favoriteAlbums.length" class="favorite-playlist">
      <div class="playlist" v-for="playlist in favoriteAlbums" @click.self="$router.push(`playlists/${playlist.id}`)">
        <div class="playlist-picture" @click.self="$router.push(`playlists/${playlist.id}`)" :style="`background-image: url('${playlist.picture}');`" />
        <span @click.self="$router.push(`playlists/${playlist.id}`)" class="playlist-name">
          {{playlist.name}}
        </span>
        <div class="arrow material-symbols-rounded" @click="changeToAlbum(playlist)">
          {{store.music === playlist.musics && playing ?  'pause' : 'play_arrow'}}
        </div>
      </div>
    </div>
    <div class="music-head head" v-if="isLoaded && favorites?.length">
      <h2>Ваши избранные</h2>
      <p v-if="favorites.length > 6" @click="router.push('/fav-musics')">
        Показать все
      </p>
    </div>
    <div class="favorite-music" v-if="isLoaded">
      <div class="music"
           v-for="(music, index) in favorites.slice(0, 7)"
           :class="playing ?
               store.music[store.currentMusic].name === music.name ? 'active' : '' : ''"
      >
        <div class="music-picture" :style="`background-image: url('${music.image}');`">
          <button
              class="material-symbols-outlined"
              @click="
                    store.music = favorites;
                    store.currentMusic = index;
                    playing = !playing
                  "
          >
            {{ togglePlayArrowById(music) }}
          </button>
        </div>
        <p class="music-name">
          {{music.name}}
        </p>
        <p class="music-singer">
          {{music.singer}}
        </p>
      </div>
    </div>

    <div v-if="recentMusics?.length" class="recent head">
      <h2>Последняя музыка</h2>
    </div>
    <div class="recent-music" v-if="recentMusics?.length">
      <div class="recent" v-for="(recent, index) in recentMusics">
        <div class="music-picture" :style="`background-image: url('${recent.image}');`">
          <button
              class="material-symbols-outlined"
              @click="
                    store.music[0] === store.recentlyPlayed[0] ? console.log() : store.music = store.recentlyPlayed;
                    store.currentMusic = index;
                    playing =! playing
                  "
          >
            {{ togglePlayArrowById(recent) }}
          </button>
        </div>
        <p class="music-name">
          {{recent.name}}
        </p>
        <p class="music-singer">
          {{recent.singer}}
        </p>
      </div>
    </div>
  </div>

  <h3 class="noData" v-if="!favoriteAlbums?.length && !favorites?.length && !recentMusics?.length">
    Раздел пуст. Ничего не сохранено, не добавлено в избранные
  </h3>
</div>

</template>

<style scoped lang="scss">
.noData {
  text-align: center;
  margin-top: 200px;
}

.frame {
  min-height: calc(80vh);
  width: 100%;
  margin-bottom: 45px;

  .nav {
    background-color: #000000;
  }

  .favorite-page {
    width: 100%;
    margin-top: 90px;
    padding: 0 30px;

    .head {
      display: flex;
      justify-content: space-between;
      align-items: end;
      h2 {
        font-weight: 700;
      }
      p {
        font-size: 1rem;
        color: #868686;
        cursor: pointer;
      }
    }
    .favorite-playlist {
      margin-top: 20px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      column-gap: 10px;
      row-gap: 8px;

      .playlist {
        display: flex;
        flex: 1;
        min-width: 30%;
        max-width: 33%;
        height: 85px;
        background-color: #181818;
        border-radius: 4px;
        transition: 0.2s ease;
        align-items: center;
        cursor: pointer;

        &:hover {
          background-color: #2c2c2c;

          .arrow {
            opacity: 1;
          }
        }

        .playlist-picture {
          height: 100%;
          aspect-ratio: 1/1;
          border-bottom-left-radius: 4px;
          border-top-left-radius: 4px;
          background-size: cover;
          background-position: center;
        }

        .playlist-name {
          font-weight: 800;
          font-size: 1rem;
          margin-left: 20px;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .arrow {
          margin-left: auto;
          margin-right: 18px;
          background-color: var(--main);
          box-shadow: 0px 13px 15px -5px rgb(0, 0, 0, 0.4);
          color: #000000;
          padding: 8px;
          border-radius: 50%;
          font-size: 1.9rem;
          display: flex;
          align-items: center;
          transition: 0.2s;
          opacity: 0;

          &:hover {
            scale: (1.1);
          }
        }
      }
    }

    .music-head {
      margin-top: 30px;
    }
    .favorite-music {
      margin-top: 15px;
      display: flex;
      gap: 15px;

      .music {
        background-color: #181818;
        width: 13.5%;
        aspect-ratio: 1/1.25;
        padding: 15px;
        border-radius: 10px;
        transition: 0.2s ease;

        &:hover {
          background-color: #2c2c2c;

          .music-picture button {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        .music-picture {
          position: relative;
          width: 100%;
          aspect-ratio: 1/1;
          border-radius: 10px;
          background-size: cover;
          background-position: center;

          button {
            opacity: 0;
            position: absolute;
            background-color: var(--main);
            border-radius: 50%;
            border: none;
            bottom: 12px;
            right: 12px;
            font-size: 1.5rem;
            color: #000000;
            padding: 10px;
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
            transition: 0.2s;
            transform: translateY(5px);

            &:hover {
              padding: 11px;
            }
          }
        }

        .music-name {
          height: 23px;
          margin-top: 10px;
          overflow:hidden;
          white-space:nowrap;
          width: 160px;
          text-overflow: ellipsis;
          font-weight: 700;
          font-size: 1.1rem;

        }

        .music-singer {
          transition: 0.2s ease;
          font-weight: 500;
          font-size: .85rem;
          color: #868686;
        }
      }

      .active {
        background-color: var(--main);

        &:hover {
          background-color: var(--main);
        }

        .music-picture button {
          background-color: #1f1f1f;
          color: #FFFFFF;

          :hover {
            background-color: #000000;
            scale: (1.1);
          }
        }

        .music-singer {
          color: #FFFFFF;
        }
      }
    }

    .recent {
      margin-top: 30px;
    }
    .recent-music {
      margin-top: 15px;
      display: flex;
      gap: 15px;

      .recent {
        background-color: #181818;
        width: 13.5%;
        aspect-ratio: 1/1.25;
        padding: 15px;
        border-radius: 10px;
        transition: 0.2s ease;

        &:hover {
          background-color: #2c2c2c;

          .music-picture button {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        .music-picture {
          position: relative;
          width: 100%;
          aspect-ratio: 1/1;
          border-radius: 10px;
          background-size: cover;
          background-position: center;

          button {
            opacity: 0;
            position: absolute;
            background-color: var(--main);
            border-radius: 50%;
            border: none;
            bottom: 12px;
            right: 12px;
            font-size: 1.5rem;
            color: #000000;
            padding: 10px;
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
            transition: 0.2s;
            transform: translateY(5px);

            &:hover {
              padding: 11px;
            }
          }
        }

        .music-name {
          height: 23px;
          margin-top: 10px;
          overflow:hidden;
          white-space:nowrap;
          width: 160px;
          text-overflow: ellipsis;
          font-weight: 700;
          font-size: 1.1rem;

        }

        .music-singer {
          transition: 0.2s ease;
          font-weight: 500;
          font-size: .85rem;
          color: #868686;
        }
      }

      .active {
        background-color: var(--main);

        &:hover {
          background-color: var(--main);
        }

        .music-picture button {
          background-color: #1f1f1f;
          color: #FFFFFF;

          :hover {
            background-color: #000000;
            scale: (1.1);
          }
        }

        .music-singer {
          color: #FFFFFF;
        }
      }
    }
  }
}
</style>