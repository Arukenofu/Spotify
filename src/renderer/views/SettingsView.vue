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
          <p>Ваша учётная запись</p>
        </div>
      </div>

      <div class="routes">
        <ul>

          <router-link to="/public">
            <li>
              <span class="material-symbols-outlined">
                person
              </span>
              Профиль
            </li>
          </router-link>

          <router-link to="/private">
            <li>
                <span class="material-symbols-outlined">
                  settings
                </span>
              Приватность
            </li>
          </router-link>

          <router-link to="/appearance">
            <li>
                <span class="material-symbols-outlined">
                  brush
                </span>
              Тема
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
  width: calc(100vw - 125px);
  margin-top: 25px;
  padding: 0 30px;
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
        list-style-type: none;

        a {
          text-decoration: none;
        }

        .router-link-active li {
          background-color: #0d0d0d;
        }

        li {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          height: 40px;
          border-radius: 3px;
          margin-bottom: 3px;

          span {
            margin-left: 7px;
            margin-right: 4px;
            font-size: 1.3rem;
            margin-bottom: 1px;
          }

          &:hover {
            background-color: #1e1e1e;
          }
        }
      }
    }
  }


}
</style>