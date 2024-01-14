<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";
import axios from "axios";
import {musicStore} from "../stores/MusicStore";

const user = ref();
const favorites = ref();
const isRouteParam = ref();
const subscribes = ref();
const isLoaded = ref(false);
const route = useRoute();
const store = musicStore();

onMounted(async () => {
  isRouteParam.value = !!route.params.id;
  console.log(isRouteParam.value);
  console.log(isRouteParam.value ? route.params.id : localStorage.getItem('id'));

  user.value = (await axios.post('http://localhost:3000/userProfile', {
    id: isRouteParam.value ? route.params.id : localStorage.getItem('id')
  })).data;
  console.log(user.value)

  favorites.value = (await axios.post('http://localhost:3000/getFavorites', {
    userID: isRouteParam.value ? route.params.id : localStorage.getItem('id')
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
    userID: isRouteParam.value ? route.params.id : localStorage.getItem('id')
  })).data

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

watch (() => route.params.id, async () => {
  isLoaded.value = false;

  isRouteParam.value = !!route.params.id;
  console.log(isRouteParam.value);
  console.log(isRouteParam.value ? route.params.id : localStorage.getItem('id'));

  user.value = (await axios.post('http://localhost:3000/userProfile', {
    id: isRouteParam.value ? route.params.id : localStorage.getItem('id')
  })).data;

  favorites.value = (await axios.post('http://localhost:3000/getFavorites', {
    userID: isRouteParam.value ? route.params.id : localStorage.getItem('id')
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
    userID: isRouteParam.value ? route.params.id : localStorage.getItem('id')
  })).data

  isLoaded.value = true;
})
</script>

<template>
<div class="layout" v-if="isLoaded">
  <div class="user-account">
    <div class="avatar" :style="`background-image: url('${user.avatar}')`" />

    <button v-if="!isRouteParam" class="edit-profile" @click="$router.push('/settings/')">
      Edit Profile
    </button>
    <button class="edit-profile" v-else @click="isSubscribed ? unsubscribe() : subscribe()">
      {{!isSubscribed ? 'Unsubscribe' : 'Subscribe'}}
    </button>

    <div class="head-info">
      <div class="last-visit">
        <span>
          Last Visit
        </span>
        <p>3 Months Ago</p>
      </div>
      <div class="place">
        <span>
          Place
        </span>
        <p>
          {{user.location}}
        </p>
      </div>
    </div>

    <div class="body-info">
      <p>
        Gender: {{user.gender}}
      </p>
      <p>
        Subscribes: {{subscribes.length}}
      </p>
      <p>
        Subscribed: 12
      </p>
    </div>

    <div class="last-visited" v-if="user.hearing">
      <span>
        Recently Heared
      </span>

      <div class="recent" :style="`background-image: url('${store.globalMusic[user.hearing].image}')`">
      </div>
    </div>
  </div>

  <div class="user-info" >
    <div class="user-info-head" v-if="favorites?.length">
      <h2>Favorites</h2>
      <span v-if="favorites.length < 5">Show All</span>
    </div>
    <div class="card-wrap">
      <div class="card" v-for="favorite in favorites.slice(0, 5)">
        <div class="image" :style="`background-image: url('${favorite.image}')`" />
        <h3>{{favorite.name}}</h3>
        <p>{{favorite.singer}}</p>
      </div>
    </div>


    <div class="user-info-head" v-if="subscribes?.length">
      <h2>Subscribes</h2>
      <span v-if="subscribes.length < 6">Show All</span>
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
      margin: 30px auto 15px;
      width: 120px;
      aspect-ratio: 1/1;
      background-color: #1f1f1f;
      border-radius: 50%;
      background-position: center;
      background-size: cover;
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