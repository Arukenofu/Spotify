<script setup>
import SearchBar from "../components/SearchBar.vue";
import SideBar from "../components/SideBar.vue";
import MusicCard from "../components/MusicCard.vue";
import GenresFilter from "../components/GenresFilter.vue";
import TracksOfTheWeek from "../components/TracksOfTheWeek.vue";
import RecentArtists from "../components/RecentArtists.vue";
</script>

<template>
    <SearchBar/>
    <main>
      <div class="content">
        <MusicCard />
        <div class="recommendations">
          <GenresFilter />
          <TracksOfTheWeek />
          <RecentArtists />
        </div>
      </div>
      <SideBar/>
    </main>
</template>

<style lang="scss">
main {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 25px;

  .content {
    flex: 80;

    .recommendations {
      display: flex;
      gap: 30px;
    }
  }
}
</style>