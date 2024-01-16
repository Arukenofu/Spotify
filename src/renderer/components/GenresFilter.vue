<script setup>
import {musicStore} from "../stores/MusicStore";
import {computed, ref} from "vue";

const store = musicStore();

const genreToggle = ref(false);

const genreView = computed(() => {
  const genre = [...store.genres]

  if (!genreToggle.value) {
    return genre.slice(0, 8)
  }
  else {
    return genre
  }
})
</script>

<template>
  <div class="genres">
    <h3>Жанры</h3>
    <div class="genre-wrap">
      <transition name="genreHeightAnimation">
        <div class="buttons" :class="genreToggle ? 'active' : 'inactive'">
          <transition-group name="genreAnimation">
            <button class="genre"
                    v-for="genre in genreView"
                    :key="genre.name"
                    @click="genre.isActive = !genre.isActive"
                    :class="genre.isActive ? 'genre-true' : 'genre-false'"
            >
              {{genre.name}}
            </button>
          </transition-group>
        </div>
      </transition>
      <button class="button-all-genres" @click="genreToggle = !genreToggle">
        {{!genreToggle ? 'Все жанры' : 'Закрыть'}}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.genres {
  flex: 1;

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .genre-wrap {

    .buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 2px;
      transition: max-height 0.1s ease-in-out;

      .genre {
        font-weight: 600;
        padding: 9px 13.5px;
        border-radius: 13px;
        transition: 0.1s ease-in-out;
      }
      .genre-false {
        background-color: #0D0D0D;
        color: #FFFFFF;
        border: 1px #333333 solid;
      }
      .genre-true {
        background-color: #FFFFFF;
        color: #0D0D0D;
        border: #FFFFFF 1px solid;
      }

      .genreAnimation-enter-active {
        transition: all 0.5s ease;
      }

      .genreAnimation-enter-from {
        opacity: 0;
      }
    }

    .genreHeightAnimation-enter-active {
      transition: all 0.1s ease-in-out;
    }
    .genreHeightAnimation-enter-from {
      opacity: 0;
    }
    .active {
      max-height: 260px;
    }
    .inactive {
      max-height: 130px;
    }


    .button-all-genres {
      z-index: 1;
      transition: ease-in-out 0.2s;
      margin-top: 10px;
      width: 100%;
      background-color: #1a1a1a;
      border: none;
      border-radius: 15px;
      height: 60px;
    }
  }
}
</style>