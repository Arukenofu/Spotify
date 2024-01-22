<script setup>
const artists = [
  {
    id: 5,
    picture: 'http://localhost:3000/images/albums/The%20Weeknd/813XseYNw1L._UF894,1000_QL80_.jpg'
  },
  {
    id: 6,
    picture: 'http://localhost:3000/images/albums/Persona%205/folder.jpg'
  },
  {
    id: 7,
    picture: 'http://localhost:3000/images/albums/Anime/folder.jpg'
  },
  {
    id: 8,
    picture: 'https://www.figma.com/file/gTfTPLSZqjVKHMWEYu8kad/image/7956bfa0d9442fb981384e6e3f59da0788351640'
  }
]
</script>

<template>
  <div class="recent-artists">
    <h3>Также рекомендуем</h3>
    <div class="artists">
      <div class="artist"
           v-for="artist in artists"
           :key="artist.id"
           :style="`background-image: url(${artist.picture}) `"
           @click="$router.push(`/playlists/${artist.id}`)"
      >

      </div>
    </div>
  </div>
</template>

<style lang="scss">
.recent-artists {
  flex: 1;

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .artists {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    border-radius: 20px;
    gap: 10px;

    .artist {
      flex: 1;
      max-width: 50%;
      min-width: 45%;
      aspect-ratio: 1/1;
      background-position: center;
      background-size: cover;
      border-radius: 7px;
      cursor: pointer;
      transition: 0.2s ease-in-out;

      &:hover {
        scale: 1.03;
      }
    }
  }
}
</style>