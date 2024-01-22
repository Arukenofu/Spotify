<script setup>

import {onMounted, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";

const isStarlight = ref(false);

onMounted(async () => {
  isStarlight.value = (await axios.post('http://localhost:3000/isStarlight', {
    id: localStorage.getItem('id')
  }, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    }
  })).data;
})

const perks = [
  {
    h: 'Анимированный Аватар',
    p: 'Выразительные и динамичные изображения, придающие вашему онлайн-профилю неповторимый стиль.'
  },
  {
    h: 'Уникальный Значок',
    p: 'Уникальный анимированный значок для вашего профиля и придайте онлайн-личности свою неповторимую энергию.'
  },
  {
    h: 'Создание своего альбома',
    p: 'Собери свою собственную музыкальную историю с нашим сервисом по созданию альбомов.'
  },
  {
    h: 'Скачивание музыки',
    p: 'Предоставляем возможность получать вашу любимую музыку в один клик.'
  },
  {
    h: 'Поддержка нас',
    p: 'Помоги нам улучщить Spotify!'
  }
]

const subscribe = async () => {
  const res = await axios.post('http://localhost:3000/subscribeStarlight', {
    id: localStorage.getItem('id')
  }, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    }
  })

  console.log(res.data)
}

const route = useRoute();
</script>

<template>
  <div class="content">
    <h3>
      Подписка Starlight
    </h3>
    <div class="currentPlan">
      <h3>Текущий план</h3>
      <div class="twoColumn">
        <span>
          {{isStarlight ? 'Премиум' : 'Бесплатный'}}
        </span>
        <button @click="!isStarlight ? subscribe() : ''" :class="isStarlight && 'active'">
          {{!isStarlight ? 'Улучшить' : 'Улучшено!'}}
        </button>
      </div>
    </div>

    <h3 class="perks">
      Преимущества подписки
    </h3>
    <div class="card-wrap">
      <div class="card" v-for="card in perks">
        <h5>{{card.h}}</h5>
        <p>
          {{card.p}}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  margin-top: 15px;
  margin-left: 35px;
  margin-bottom: 40px;

  & > h3 {
    margin-bottom: 15px;
  }

  .currentPlan {
    width: 600px;
    background-color: #101010;
    border-radius: 15px;
    padding: 20px 15px;
    height: min-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;

    h3 {
      font-size: 1.1rem;
      padding: 0 0 6px 0;
      text-transform: uppercase;
      font-weight: 700;
    }

    .twoColumn {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-size: .9rem;
        font-weight: 400;
      }

      button {
        padding: 9px 15px;
        background-color: #b669ff;
        border: none;
        border-radius: 4px;

        &:active {
          opacity: .9;
        }
      }

      .active {
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
        background-size: 400% 400%;
        animation: gradientAnimation 3s infinite;
      }
    }
  }

  .perks {
    margin-bottom: 15px;
    color: #b669ff;
    font-size: 1.15rem;
  }

  .card-wrap {
    width: 600px;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;

    .card {
      width: 290px;
      height: 180px;
      background-color: #101010;
      border-radius: 6px;
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      transition: scale 0.2s ;
      cursor: pointer;

      &:hover {
        scale: 1.03;
      }

      h5 {
        font-size: 1.5rem;
        font-weight: 600;
      }
      p {
        font-size: .99rem;
        font-weight: 400;
      }
    }
  }
}

@keyframes gradientAnimation {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>