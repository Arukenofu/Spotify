<script setup>
import router from "../router";
import {ref} from "vue";

const avatar = ref(localStorage.getItem('avatar'))


</script>

<template>
  <div class="nav">
    <div class="back-option material-symbols-outlined" @click="router.back()">
      arrow_back_ios
    </div>

    <div class="other">
      <div class="bell">
          <span class="material-symbols-outlined" @click="$router.push('/starlight')">
            stars
          </span>
      </div>
      <div class="user" @click="$router.push('/settings')" :style="`background-image: url('${avatar}')`">

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav {
  box-sizing: inherit;
  top: 0;
  width: calc(100% - 100px);
  padding: 0 21px;
  position: fixed;
  margin-top: 28px;
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
  z-index: 5;

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
      background-position: center;
      background-size: cover;
      height: 35px;
      aspect-ratio: 1/1;
      border-radius: 50%;
      background-color: #FFFFFF;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>