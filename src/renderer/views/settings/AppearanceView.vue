<script setup>
import {ref} from "vue";

const themes = [
  {
    id: 1,
    description: 'Green Basic',
    color: '#45dc60'
  },
  {
    id: 2,
    description: 'Celestial Azure',
    color: '#1065c0'
  },
  {
    id: 3,
    description: 'Crimson Blaze',
    color: '#e12525'
  },
  {
    id: 4,
    description: 'Mystic Orchid',
    color: '#a564d3'
  },
  {
    id: 5,
    description: 'Golden Radiance',
    color: '#efb827'
  },
  {
    id: 6,
    description: 'Pearl Frost',
    color: '#aaa2b1'
  },
];

const currentTheme = localStorage.getItem('theme');

const changeStyle = (theme) => {
  currentChoose.value = theme.id;

  document.documentElement.style.setProperty('--main', theme.color);

  localStorage.setItem('theme', theme.color);

  console.log(currentChoose.value);
}

const currentChoose = ref(themes.find((element) => element.color === currentTheme)?.id)
</script>

<template>
  <div class="content">
    <h3>
      Ваши предпочтения
    </h3>

    <p>
      Выберите, какую базовую тему выбрать для Spotify.
    </p>

    <section>
      <div class="themes">
        <form @submit.prevent>

          <div class="theme"
               v-for="theme in themes" :key="theme.id"
               @click="changeStyle(theme)"
               :class="currentChoose === theme.id ? 'active' : ''"
          >
            <div class="picture" :style="`background-color: ${theme.color}`" />
            <div class="choose">
              <input type="radio" name="theme" :checked="currentChoose === theme.id">
              <span>{{theme.description}}</span>
            </div>
          </div>

        </form>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.content {
  width: 70%;
  margin-left: 35px;

  h3 {
    width: 100%;
    padding-bottom: 12px;
    margin-top: 16px;
    border-bottom: #1a1a1a 1px solid;
    margin-bottom: 20px;
  }

  p {
    font-size: .9rem;
    margin-bottom: 20px;
  }

  section {
    width: 95%;
    h5 {
      font-size: 1.1rem;
      margin-bottom: 30px;
    }

    .themes {

      form {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;

        .theme {
          flex: 1;
          min-width: 30%;
          aspect-ratio: 16/10.5;
          background-color: #1a1a1a;
          border-radius: 7px;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          border: 1px #1a1a1a solid;

          &:hover {
            border: 1px #646464 solid;
          }

          &:hover {
            transform: translateY(-5px);
          }

          .picture {
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
            width: 100%;
            aspect-ratio: 16/8;
            background-color: #4b4b4b;
          }

          .choose {
            height: 45px;
            display: flex;
            align-items: center;

            input {
              margin-left: 10px;
              width: 12px;
              height: 12px;
              -webkit-appearance: none;
              appearance: none;
              font: inherit;
              color: currentColor;
              border: 0.1em solid currentColor;
              border-radius: 50%;
              display: grid;
              place-content: center;

              &::before {
                content: "";
                width: 12px;
                height: 12px;
                border-radius: 50%;
                transform: scale(0);
                transition: 120ms transform ease-in-out;
                box-shadow: inset 1em 1em #FFFFFF;
              }

              &:checked::before {
                transform: scale(1);
              }
            }
            span {
              margin-left: 5px;
              font-size: .8rem;
              font-weight: 700;
            }
          }
        }

        .active {
          border: 1px #646464 solid;
        }
      }
    }
  }
}
</style>