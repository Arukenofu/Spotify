<script setup>
import {ref} from "vue";

const user = ref({
  email: localStorage.getItem('email'),
  username: localStorage.getItem('username'),
  avatar: localStorage.getItem('avatar')
})

</script>

<template>
  <div class="container">
    <div class="sidebar">
      <div class="user">
        <div class="avatar" :style="`background-image: url('${user.avatar}')`" />
        <div class="user-info">
          <h2>
            {{user.username}}
          </h2>
          <p>Your personal account</p>
        </div>
      </div>

      <div class="routes">
        <ul>
            <router-link to="/public">
              <li>
                Public Page
              </li>
            </router-link>
        </ul>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: calc(100vw - 100px);
  padding: 0 50px;
  margin-top: 25px;
  display: flex;

  .sidebar {
    width: 20%;

    .user {
      display: flex;
      align-items: center;
      width: 100%;
      height: 70px;
      gap: 15px;
      margin-bottom: 25px;

      .avatar {
        height: 50px;
        aspect-ratio: 1/1;
        background-color: #FFFFFF;
        background-position: center;
        background-size: cover;
        border-radius: 50%;
      }

      .user-info {
        h2 {
          cursor: pointer;
          font-size: 1.2rem;
          font-weight: 600;

          span {
            font-size: 0.6rem;
          }

          &:hover {
            text-decoration: underline;
          }
        }
        p {
          font-size: 0.9rem;
          font-weight: 400;
          color: #8f8f8f;
        }
      }
    }
    .routes {
      ul {
        list-style: none;

        .router-link-active li {
          background-color: #0d0d0d;
        }

        li {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          height: 35px;
          border-radius: 3px;

          &:hover {
            background-color: #1e1e1e;
          }
          a {
            color: #FFFFFF;
            text-decoration: none;
          }
        }
      }
    }
  }


}
</style>