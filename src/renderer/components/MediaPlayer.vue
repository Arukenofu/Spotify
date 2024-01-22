<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useMediaControls} from '@vueuse/core'
import {musicStore} from "../stores/MusicStore";
import axios from "axios";
import Slider from "primevue/slider";

const store = musicStore();

const currentMusic = computed(() => {
  return store.currentMusic
})

const currentAudio = computed(() => {
  return store.music[currentMusic.value]
})

const currentMusicGlobalId = computed(() => {
  return store.music
})

const audio = ref();
const {playing, currentTime, duration, volume} = useMediaControls(audio, {
  src: ref(currentAudio.value.song)
})

const audioVolume = ref(volume.value);

const currentAudioTime = computed(() => {
  let minutes = Math.trunc(currentTime.value / 60) + '';
  let seconds = (currentTime.value % 60).toFixed(0) + '';

  return minutes.padStart(2, 0) + ':' + seconds.padStart(2, 0)
})

const audioDuration = computed(() => {
  let minutes = Math.trunc(duration.value / 60) + '';
  let seconds = (duration.value % 60).toFixed(0) + '';

  return minutes.padStart(2, 0) + ':' + seconds.padStart(2, 0)
})

const isShuffled = ref(false)

const isRepeat = ref(1);

const toggleRepeat = () => {
  if (isRepeat.value === 2) {
    isRepeat.value = 0;
    return;
  }
  isRepeat.value++
}

const repeatState = computed(() => {
  switch (isRepeat.value) {
    case 2: return 'repeat_one_on';
    default: return 'repeat'
  }
})


const DecrementMusicID = () => {
  store.currentMusic !== 0 ? store.currentMusic-- : '';
}

const TogglePlayingValue = () => {
  playing.value = !playing.value;
}

const IncrementMusicID = () => {
  store.currentMusic !== store.music.length-1 ? store.currentMusic++ : ''
}

const changeFavorites = async () => {
  if (isLiked.value === false) {
    await axios.post('http://localhost:3000/addFavorite', {
      userId: localStorage.getItem('id'),
      musicId: currentAudio.value.id,
    },{
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      }
    })

    isLiked.value = true;

    return;
  }

  await axios.post('http://localhost:3000/deleteFavorite', {
    userId: localStorage.getItem('id'),
    musicId: currentAudio.value.id,
  }, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    }
  });

  isLiked.value = false;
}

const downloadMusic = async (url) => {
  axios({
    method: 'get',
    url: url,
    responseType: 'blob',
  })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;

        const fileName = 'downloaded_file.mp3';
        link.setAttribute('download', fileName);

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
      })
}


let objectArray = JSON.parse(localStorage.getItem('objectArray')) || [];

const createObject = (key, name, image, singer, song, timestamp) => {
  return {key, name, image, singer, song, timestamp}
}

const addObject = (key, name, image, singer, song) => {
  const isKeyUnique = !objectArray.some(obj => obj.key === key);

  if (!isKeyUnique) {
    return;
  }

  const timestamp = new Date().getTime();

  const newObject = createObject(key, name, image, singer, song, timestamp);

  objectArray.unshift(newObject);

  objectArray.sort((a, b) => b.timestamp - a.timestamp);

  objectArray = objectArray.slice(0, 7);

  localStorage.setItem('objectArray', JSON.stringify(objectArray));
  store.recentlyPlayed = JSON.parse(localStorage.getItem('objectArray'))
}

const isStarlight = ref(false);

onMounted( async () => {
  isStarlight.value = (await axios.post('http://localhost:3000/isStarlight', {
    id: localStorage.getItem('id')
  }, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    }
  })).data;
})

navigator.mediaSession.setActionHandler('previoustrack', () => {
  DecrementMusicID();
})

navigator.mediaSession.setActionHandler('nexttrack', () => {
  IncrementMusicID();
})

const isLiked = ref();

watch(currentMusic,
      async () => {
        useMediaControls(audio, {
          src: ref(currentAudio.value.song)
        });

        await axios.post('http://localhost:3000/updateMusic', {
          id: localStorage.getItem('id'),
          musicId: currentAudio.value.id-1
        }, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          }
        })

        isLiked.value = (await axios.post('http://localhost:3000/isLiked', {
          musicId: currentAudio.value.id,
          userId: Number(localStorage.getItem('id'))
        }, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          }
        })).data

        addObject(currentAudio.value.id, currentAudio.value.name, currentAudio.value.image, currentAudio.value.singer, currentAudio.value.song);

      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentAudio.value.name,
        artist: currentAudio.value.singer,
        artwork: [
          {
            src: currentAudio.value.image,
            type: "image/png",
            sizes: "500x500"
          }
        ]
      })

      setTimeout(() => {
        playing.value = true;
      }, 10)
    }
)

watch(currentTime,
    () => {
      if (currentTime.value === duration.value && isRepeat.value !== 0) {
        if (isRepeat.value === 2) {
          currentTime.value = 0

          setTimeout(() => {
            playing.value = true
          }, 10)

          return;
        }

        if (isShuffled.value) {
          store.currentMusic = Math.floor(Math.random() * store.music.length);
          console.log('yes!')
          return;
        }

        if (store.currentMusic !== store.music.length-1) {
          store.currentMusic++;
        }

      }
    }
)

watch( () => store.music,
     (value, oldValue) => {
      const isReplacingArray = value !== oldValue;
      if (!isReplacingArray) {
        return;
      }

      useMediaControls(audio, {
        src: ref(currentAudio.value.song)
      });

      setTimeout(() => {
        playing.value = true
      }, 10)
    },
    {deep: true})

watch(audio, (value) => {
  store.audio = value;
}, {deep: true})
</script>

<template>
  <keep-alive>
    <audio ref="audio" id="musicRoot">
    </audio>
  </keep-alive>
  <div class="media-player">
    <div class="musicBar">
      <div class="song-info">
        <div class="singer-logo"
             :style="playing ? `animation-play-state: running; background-image: url('${currentAudio.image}');` : `animation-play-state: paused; background-image: url('${currentAudio.image}');`"
        />

        <div class="song-content">
          <h3>{{currentAudio.singer}}</h3>
          <p>{{currentAudio.name}}</p>
        </div>
      </div>
      <div class="controls">
        <button class="material-symbols-rounded"
                @click="DecrementMusicID"
        >
          skip_previous
        </button>
        <button class="material-symbols-rounded" @click="TogglePlayingValue" id="butt">
          {{playing ? "pause" : "play_arrow"}}
        </button>
        <button class="material-symbols-rounded" @click="IncrementMusicID">
          skip_next
        </button>
      </div>

      <div class="music-status">
          <span class="music-current-duration">
            {{currentAudioTime}}
          </span>
        <slider class="abc" :max="duration" v-model="currentTime" />
        <span class="music-duration">
            {{audioDuration}}
          </span>
      </div>

      <div class="music-volume">
        <button class="material-symbols-rounded">
          {{ volume ? "volume_up" : "volume_off"}}
        </button>
        <slider class="abc" :max="1" :step="0.01" :min="0" v-model="volume" />
      </div>

      <div class="options">
        <button class="material-symbols-outlined" @click="changeFavorites()" :style="isLiked ? 'color: var(--main);' : ''">
          favorite
        </button>
        <button class="material-symbols-outlined" @click="toggleRepeat()" :style="isRepeat ? 'color: var(--main);' : ''">
          {{repeatState}}
        </button>
        <button class="material-symbols-outlined" @click="isShuffled =! isShuffled" :style="isShuffled ? 'color: var(--main);' : ''">
          shuffle
        </button>
        <button @click="downloadMusic(currentAudio.song)" class="material-symbols-outlined" :disabled="!isStarlight">
          download
        </button>
      </div>
    </div>
  </div>
</template>



<style lang="scss">
.media-player {
  border-top: 1px #333333 solid;
  z-index: 2;
  font-family: 'Open Sans', sans-serif;
  position: fixed;
  bottom: 0;
  width: 100vw;
  max-width: 100vw;
  background-color: #0D0D0D;

  .musicBar {
    height: 80px;
    width: 96.5%;
    margin: 0 auto;
    display: flex;
    align-items: center;

    & > div {
      height: 70%;
    }

    .song-info {
      display: flex;
      align-items: center;
      min-width: clamp(120px, 17vw, 270px);

      .singer-logo {
        display: flex;
        background-size: cover;
        background-position: center;
        height: 90%;
        aspect-ratio: 1/1;
        border-radius: 50%;
        animation: rotate 7s infinite linear;
      }

      .song-content {
        margin-left: 0.7rem;
        display: flex;
        flex-direction: column;
        gap: 2px;
        justify-content: center;

        h3 {
          font-size: 1.1rem;
          font-weight: 600;
        }

        p {
          font-size: 0.8rem;
          color: #bcbcbc;
        }
      }
    }

    .controls {
      display: flex;
      align-items: center;
      width: 150px;
      justify-content: space-between;
      gap: 10px;

      button {
        font-size: 2rem;
        cursor: pointer;
        border: none;
        background-color: inherit;
      }

      button:nth-child(2) {
        font-size: 1.9rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #FFFFFF;
        border-radius: 50%;
        height: 100%;
        aspect-ratio: 1/1;
        color: #0D0D0D;
      }
    }

    .music-status {
      margin-left: clamp(30px, 30vw, 45px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 13px;
      width: 100%;

      span {
        width: 41px;
        font-size: 0.9rem;
        font-weight: 600;
        color: #d2d2d2;
      }

      .abc {
        height: 4px;
        width: 100%;
        cursor: pointer;
      }

      .p-slider {
        background-color: #484848;
        border-radius: 3px;
      }

      .p-slider-range {
        background-color: var(--main);
        border-bottom-left-radius: 3px;
        border-top-left-radius: 3px;
      }

      .p-slider-handle {
        background-color: var(--main);
        height: 14px;
        width: 14px;
        margin-top: calc(2px / 2 - 16px / 2);
        border-radius: 50%;
        cursor: pointer;
      }

      input {
        appearance: none;
        height: 4px;
        width: 100%;
        border-radius: 3px;
        background-color: #484848;
        cursor: pointer;

        &[type=range]::-moz-range-track {
          height: 4px;
          border-radius: 2px;
          background-color: #3F3F3F;
        }
        &::-moz-range-thumb {
          width: 0;
          height: 0;
          opacity: 0;
        }
        &::-moz-range-progress {
          height: 100%;
          background-color: var(--main);
          border-radius: 3px;
        }

        &::-webkit-progress-value {
          background-color: #d9ad5d;
        }

        &::-webkit-slider-runnable-track {
          background: #3F3F3F;
          height: 4px;
          border-radius: 2px;
        }

        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          color: var(--main);
          background: var(--main);
          margin-top: calc(2px / 2 - 12px / 2);
          height: 14px;
          width: 14px;
          border-radius: 50%;
        }
      }
    }

    .music-volume {
      margin-left: 40px;
      display: flex;
      gap: 10px;
      align-items: center;

      button {
        background-color: initial;
        border: none;
      }

      .abc {
        height: 4px;
        width: 120px;
        background-color: #484848;
        cursor: pointer;
      }

      .p-slider {
        background-color: #484848;
        border-radius: 3px;
      }

      .p-slider-range {
        background-color: var(--main);
        border-bottom-left-radius: 3px;
        border-top-left-radius: 3px;
      }

      .p-slider-handle {
        background-color: var(--main);
        height: 14px;
        width: 14px;
        margin-top: calc(2px / 2 - 16px / 2);
        border-radius: 50%;
        cursor: pointer;
      }

      input {
        appearance: none;
        height: 4px;
        width: 120px;
        border-radius: 2px;
        background-color: #484848;
        cursor: pointer;

        &[type=range]::-moz-range-track {
          height: 3px;
          border-radius: 3px;
          background-color: #3F3F3F;
        }
        &::-moz-range-thumb {
          width: 0;
          height: 0;
          opacity: 0;
        }
        &::-moz-range-progress {
          height: 100%;
          background-color: var(--main);
          border-radius: 3px;
        }
        &::-webkit-slider-runnable-track {
          background: #3F3F3F;
          height: 4px;
          border-radius: 2px;
        }

        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          color: var(--main);
          background: var(--main);
          margin-top: calc(2px / 2 - 12px / 2);
          height: 14px;
          width: 14px;
          border-radius: 50%;
        }
      }
    }

    .options {
      display: flex;
      align-items: center;

      .material-symbols-outlined {
        font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 48
      }

      @media (max-width: 1500px) {
        & button:not(:last-child) {
          display: none;
        }
        & button:last-child {
          margin: 0 30px;
        }
      }

      button {
        border: none;
        background-color: inherit;
        cursor: pointer;
        margin-left: 35px;
        color: #858585;

        &:hover {
          color: #FFFFFF;
        }

        &:last-child {
          margin-right: 15px;
          color: #ee82ee;
          font-variation-settings:
              'FILL' 0,
              'wght' 900,
              'GRAD' 0,
              'opsz' 48;

          &:disabled {
            color: #858585;
          }
        }
      }
    }
  }
}


.bodyActive {
  overflow: hidden;
}


@keyframes rotate {
  0% {
    rotate: 0deg;
  }
  25% {
    rotate: 90deg;
  }
  50% {
    rotate: 180deg;
  }
  75% {
    rotate: 270deg;
  }
  100% {
    rotate: 360deg;
  }
}
</style>