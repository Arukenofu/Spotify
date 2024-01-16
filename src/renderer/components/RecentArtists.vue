<script setup>
const artists = [
  {
    id: 1,
    picture: 'https://cdns-images.dzcdn.net/images/cover/eea9f7fc913300e40307a0ff70dc73cf/264x264.jpg'
  },
  {
    id: 2,
    picture: 'https://f4.bcbits.com/img/a2145598503_10.jpg'
  },
  {
    id: 3,
    picture: 'https://www.udiscovermusic.com/wp-content/uploads/2017/08/Nirvana-Nevermind.jpg'
  },
  {
    id: 4,
    picture: 'https://www.figma.com/file/gTfTPLSZqjVKHMWEYu8kad/image/7956bfa0d9442fb981384e6e3f59da0788351640'
  }
]
</script>

<template>
  <div class="recent-artists">
    <h3>Также рекомендуем</h3>
    <div class="artists">
      <div class="artist" v-for="artist in artists" :key="artist.id" :style="`background-image: url(${artist.picture}) `">

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