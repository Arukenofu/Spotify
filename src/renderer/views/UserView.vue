<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";
import axios from "axios";
import {musicStore} from "../stores/MusicStore";
import {useMediaControls} from "@vueuse/core";
import router from "../router";

const user = ref();
const favorites = ref();
const isRouteParam = ref();
const subscribes = ref();
const isLoaded = ref(false);
const route = useRoute();
const store = musicStore();

onMounted(async () => {
  isRouteParam.value = route.params.id !== localStorage.getItem('id');

  user.value = (await axios.post('http://localhost:3000/userProfile', {
    id: route.params.id
  })).data;

  favorites.value = (await axios.post('http://localhost:3000/getFavorites', {
    userID: route.params.id
  })).data;

  if (isRouteParam.value) {
    isSubscribed.value = !(await axios.post('http://localhost:3000/isSubscribed', {
      subscriber: localStorage.getItem('id'),
      subscribe: route.params.id
    }, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      }
    })).data
  }

  subscribes.value = (await axios.post('http://localhost:3000/getSubscribes', {
    userID: route.params.id
  })).data

  isStarlight.value = (await axios.post('http://localhost:3000/isStarlight', {
    id:  route.params.id
  }, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    }
  })).data;

  isLoaded.value = true;
})

const isSubscribed = ref();

const subscribe = async () => {
  await axios.post('http://localhost:3000/subscribe', {
    subscriber: localStorage.getItem('id'),
    subscribe: user.value.id
  }, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    }
  });

  isSubscribed.value = true;
}

const unsubscribe = async () => {
  await axios.post('http://localhost:3000/unSubscribe', {
    subscriber: localStorage.getItem('id'),
    subscribe: user.value.id
  }, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    }
  });

  isSubscribed.value = false;
}

const isStarlight = ref(false);

watch (() => route.params.id, async () => {
  if (!route?.params?.id) {
    return;
  }

  isLoaded.value = false;

  user.value = (await axios.post('http://localhost:3000/userProfile', {
    id: route.params.id
  })).data;
  console.log(user.value)

  favorites.value = (await axios.post('http://localhost:3000/getFavorites', {
    userID: route.params.id
  })).data;

  if (isRouteParam.value) {
    isSubscribed.value = !(await axios.post('http://localhost:3000/isSubscribed', {
      subscriber: localStorage.getItem('id'),
      subscribe: route.params.id
    }, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      }
    })).data

    console.log(isSubscribed.value);
  }

  subscribes.value = (await axios.post('http://localhost:3000/getSubscribes', {
    userID: route.params.id
  })).data

  isStarlight.value = (await axios.post('http://localhost:3000/isStarlight', {
    id:  route.params.id
  }, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    }
  })).data;

  isLoaded.value = true;
})

const id = localStorage.getItem('id');

const togglePlayArrowById = (el) => {
  if (store.playing) {
    return store.music[store.currentMusic].name === el.name ? 'pause' : 'play_arrow'
  }
  else {
    return 'play_arrow';
  }
}
</script>

<template>
<div class="layout" v-if="isLoaded">
  <div class="user-account">
    <div class="avatar" :style="`background-image: url('${user.avatar}')`" />
    <p class="username">
      {{user.username}}
      <span v-if="isStarlight" style="color: #b669ff" class="material-symbols-outlined">
                  stars
      </span>
    </p>
    <button v-if="route.params.id === id" class="edit-profile" @click="$router.push('/settings/')">
      Изменить профиль
    </button>
    <button class="edit-profile" v-else @click="isSubscribed ? unsubscribe() : subscribe()">
      {{!isSubscribed ? 'Отписаться' : 'Подписаться'}}
    </button>

    <div class="head-info">
      <div class="last-visit">
        <span>
          Посещение
        </span>
        <p>3 месяца назад</p>
      </div>
      <div class="place">
        <span>
          Страна
        </span>
        <p>
          {{user.location}}
        </p>
      </div>
    </div>

    <div class="body-info">
      <p>
        Пол: {{user.gender}}
      </p>
      <p>
        Подписки: {{subscribes.length}}
      </p>
      <p>
        Подписчики: 12
      </p>
    </div>

    <div class="last-visited" v-if="user.hearing">
      <span>
        Последняя активность
      </span>

      <div class="recent" :style="`background-image: url('${store.globalMusic[user.hearing].image}')`">
      </div>
    </div>
  </div>

  <div class="user-info" >
    <div class="user-info-head" v-if="favorites?.length">
      <h2>Избранные</h2>
      <span v-if="favorites.length > 5" @click="router.push(`/fav-musics/${route.params.id}`)">
        Показать всё
      </span>
    </div>
    <div class="card-wrap">
      <div class="card"
           v-for="(favorite, index) in favorites.slice(0, 5)"
           :key="favorite.id"
      >
        <div class="image" :style="`background-image: url('${favorite.image}')`">
          <button
              class="material-symbols-outlined"
              @click="store.music = favorites; console.log(store.music); store.currentMusic = index; store.playing = !store.playing"
          >
            {{togglePlayArrowById(favorite)}}
          </button>
        </div>
        <h3>{{favorite.name}}</h3>
        <p>{{favorite.singer}}</p>
      </div>
    </div>


    <div class="user-info-head" v-if="subscribes?.length">
      <h2>Подписки</h2>
      <span v-if="subscribes.length > 6">Показать всё</span>
    </div>
    <div class="card-wrap">
      <div class="card" @click="$router.push(`/user/${subscribe.id}`)" v-for="subscribe in subscribes.slice(0, 5)">
        <div class="image" :style="`background-image: url('${subscribe.avatar}')`" />
        <h3>{{subscribe.username}}</h3>
        <p>{{subscribe.description}}</p>
      </div>
    </div>
  </div>

</div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;

  .user-account {
    width: 300px;
    height: calc(100vh - 110px);
    position: sticky;
    top: 0;

    .avatar {
      margin: 30px auto 9px;
      width: 120px;
      aspect-ratio: 1/1;
      background-color: #1f1f1f;
      border-radius: 50%;
      background-position: center;
      background-size: cover;
    }

    .username {
      margin-bottom: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;

      span {
        margin-top: 3.2px;
        font-size: 1.2rem;
      }
    }

    .edit-profile {
      display: block;
      margin: 0 auto;
      background-color: var(--main);
      padding: 7px 15px;
      border: none;
      border-radius: 5px;
    }

    .head-info {
      width: 90%;
      margin: 0 auto;
      display: flex;
      padding: 20px 0;

      div {
        flex: 1;

        span {
          font-size: 1rem;
          font-weight: 600;
        }

        p {
          font-size: .8rem;
          color: #969696;
        }
      }
    }

    .body-info {
      margin-left: 12px;
      margin-bottom: 20px;

      p {
        font-weight: 400;
        font-size: .95rem;
        color: #969696;
        margin-bottom: 1px;
        text-transform: capitalize;
      }
    }

    .last-visited {
      margin: 0 12px;

      span {
        display: block;
        margin-bottom: 12px;
      }

      .recent {
        width: 100%;
        background-color: #1a1a1a;
        aspect-ratio: 1/1;
        border-radius: 6px;
        background-size: cover;
        background-position: center;
        cursor: pointer;
      }
    }
  }

  .user-info {
      margin-top: 20px;
      width: calc(100% - 100px - 300px);
      margin-left: 15px;

      .user-info-head {
        display: flex;
        justify-content: space-between;

        h2 {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        span {
          font-size: 1rem;
          margin-top: 20px;
          color: #868686;
          cursor: pointer;
        }
      }

      .card-wrap {
        display: flex;
        gap: 15px;
        margin-bottom: 40px;

        .card {
          cursor: pointer;
          border-radius: 9px;
          width: 19%;
          aspect-ratio: 1/1.25;
          background-color: #050505;
          transition: 0.2s;
          padding: 15px;

          &:hover {
            background-color: #090909;

            .image button {
              opacity: 1;
              transform: translateY(0px);
            }
          }

          .image {
            position: relative;
            width: 100%;
            aspect-ratio: 1/1;
            border-radius: 6px;
            margin-bottom: 10px;
            background-color: #1a1a1a;
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

          h3 {
            font-size: 1.2rem;
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
</style>