<script setup>
import {ref} from "vue";
const value = ref('')
</script>

<template>
  <div class="header-top">
    <div class="search-field">

      <span class="material-symbols-outlined">
        radio_button_unchecked
      </span>

      <input type="text" placeholder="Search..." v-model="value" @input="$emit('event', value)" id="inputRoot" />

      <div class='spacer-box'></div>



      <div class="filters">
        <span class="material-symbols-outlined">
            page_info
        </span>
        <p>Filters</p>
      </div>
    </div>

    <div style="display: flex; flex: 20;">

      <div class="settings">
      <span class="material-symbols-rounded">
        verified_user
      </span>
        <span class="material-symbols-rounded">
        settings
      </span>
        <span class="material-symbols-rounded">
        notifications
      </span>
      </div>

      <div class="account">
        <div class="user-profile" />
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.header-top {
  margin: 20px 0 20px;
  height: 60px;
  display: flex;
  gap: 25px;
  align-items: center;
  width: 100%;

  .search-field {
    display: flex;
    align-items: center;
    max-width: 78.5%;
    width: 78%;
    min-width: 40.5%;
    height: 60px;
    background-color: #0D0D0D;
    border: 2px #333333 solid;
    border-radius: 40px;

    .spacer-box {
      flex: 1;
    }

    & > span {
      font-size: 1.35rem;
      color: #f9f9f9;
      margin-left: 18px;
    }

    input {
      width: 60%;
      height: 100%;
      background: none;
      border: none;
      outline: none;
      margin-left: 9px;
      color: white;
      font-family: 'Open Sans', sans-serif;
      font-size: 0.9rem;

      &::placeholder {
        opacity: 1;
      }
    }

    button {
      display: flex;
      align-items: center;
      margin-left: 8px;
      justify-content: center;
      font-family: 'Open Sans', sans-serif;
      text-align: center;
      background-color: #282828;
      border: 1.5px #494949 solid;
      border-radius: 7px;
      cursor: pointer;
      transition: 0.1s ease-in-out;

      &:active {
        opacity: 0.8;
      }

      &:nth-child(5) {
        margin-left: 10px;
      }

      span {
        padding: 5px 6px;
        font-size: 0.75rem;
        font-weight: 600;
      }
    }
    .filters {
      margin-left: 10px;
      display: flex;
      align-items: center;
      padding: 0 10px 0 10px;
      border-left: 2px #444444 dotted;
      font-family: 'Open Sans', sans-serif;
      cursor: pointer;


      .material-symbols-outlined {
        font-variation-settings:
            'FILL' 1,
            'wght' 400,
            'GRAD' 0,
            'opsz' 48
      }

      span {
        color: #bbbbbb;
        font-size: 1.3rem;
      }

      p {
        margin: 0 15px 0 7px;
        color: #bbbbbb;
        font-weight: 700;
        font-size: 0.9rem;
      }
    }
  }
  .settings {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 150px;
    border: 2px #333333 solid;
    border-radius: 45px;
    height: 60px;

    span {
      font-size: 1.4rem;
    }

    .material-symbols-outlined {
      font-variation-settings:
          'FILL' 1,
          'wght' 400,
          'GRAD' 200,
          'opsz' 48
    }
  }
  .account {
    margin-left: 12px;
    background-color: #333333;
    width: 100px;
    height: 60px;
    border-radius: 45px;

    .user-profile {
      margin-left: auto;
      height: 100%;
      aspect-ratio: 1/1;
      background-image: url("https://www.datocms-assets.com/55010/1631448986-1609827492810345-modelo.jpg?auto=format&fit=max&w=1200");
      background-position: center;
      background-size: cover;
      border-radius: 45px;
    }
  }
}
</style>