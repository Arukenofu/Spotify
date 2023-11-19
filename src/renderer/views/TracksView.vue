<script setup>
import {onMounted} from "vue";
import {UserStore} from "../stores/UserStore";
import axios from "axios";

const store = UserStore();

onMounted(async () => {
  store.users = await axios.get('http://localhost:3000/users')
  console.log(store.users.data.rows);
})
</script>

<template>

</template>

<style scoped lang="scss">

</style>