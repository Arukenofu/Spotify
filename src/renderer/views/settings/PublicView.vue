<script setup>
import {onMounted, reactive, ref} from "vue";
import axios from "axios";

const user = ref({

})

const isStarlight = ref();

const isLoaded = ref(false)
onMounted(async () => {
  const data = await axios.post('http://localhost:3000/user', {id: id.value}, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    }
  });

  isStarlight.value = (await axios.post('http://localhost:3000/isStarlight', {
    id: localStorage.getItem('id')
  }, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    }
  })).data;

  user.value = data.data[0];
  formData.value.name = user.value.username
  formData.value.description = user.value.description;
  formData.value.location = user.value.location
  isLoaded.value = true;
})

const id = ref(localStorage.getItem('id'))

const preview = ref(null);

const previewImage = (event) => {
  gif64.value = '';
  const input = event.target;

  if (input.files) {
    let reader = new FileReader();

    reader.onload = (e) => {
      formData.value.image = e.target.result;
      console.log(preview.value)
    }
    reader.readAsDataURL(input.files[0]);
  }
}

const formData = ref({
  id: localStorage.getItem('id'),
  name: '',
  description: '',
  gender: '',
  location: '',
  image: ''
})


const updateProfile = async () => {
  const response = await axios.post('http://localhost:3000/update', formData.value, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    }
  })
  localStorage.setItem("username", response.data.username);
  console.log(localStorage.getItem('username'))
  localStorage.setItem("avatar", response.data.avatar)
}

const gif64 = ref();

const focusInput = () => {
  document.getElementById('gif').click();
}

const previewGif = (event) => {
  const input = event.target;

  if (input.files) {
    let reader = new FileReader();

    reader.onload = (e) => {
      gif64.value = e.target.result;
      sendGif();
      localStorage.setItem('avatar', `http://localhost:3000/images/users/${localStorage.getItem('id')}/avatar.gif`)
      location.reload()
    }
    reader.readAsDataURL(input.files[0]);
  }
}

const sendGif = async () => {
  await axios.post('http://localhost:3000/setGif', {
    id: localStorage.getItem('id'),
    gif: gif64.value
  })
}

</script>

<template>
  <div class="content" v-if="isLoaded">

    <h3>Профиль</h3>

    <div class="options">

      <form @submit="updateProfile()">
        <div class="text-options">

          <div class="form">
            <label for="username">
              Никнейм
            </label>
            <input type="text" name="username" v-model="formData.name">
            <p>
              Ваш никнейм может быть использован для публичного общения и идентификации в онлайн-среде.
              а также для создания уникального виртуального образа или персонажа.
            </p>
          </div>

          <div class="form">
            <label for="description">
              Описание
            </label>
            <textarea name="description" v-model="formData.description">

            </textarea>
            <p>
              Описание профиля – это краткая информация о вас.
              Это ваша онлайн-визитка, помогающая другим пользователям лучше понять
              кто вы и что вас вдохновляет.
            </p>
          </div>

          <div class="form">
            <label for="gender">
              Пол
            </label>
            <select name="gender" v-model="formData.gender">
              <option>Male</option>
              <option>Female</option>
            </select>
            <p>
              Существует только два пола.
            </p>
          </div>

          <div class="form">
            <label for="location">
              Страна
            </label>
            <input placeholder="Страна" type="text" name="location" v-model="formData.location">
            <p>
              Ваша текущая страна, местоположение.
            </p>
          </div>

          <button type="submit">
            Отправить
          </button>
        </div>
      </form>

      <div class="photo-options">
        <h2>
          Аватарка
        </h2>
        <div class="avatar" :style="formData.image ? `background-image: url('${gif64 ? gif64 : formData.image}')` : `background-image: url('${gif64 ? gif64 : user.avatar}')`">
            <div class="table">
              <label class="input-file">
                <input type="file" accept="image/png" @change="previewImage">
                <span>
                  <span class="material-symbols-outlined">photo_camera</span>
                  Выбрать файл...
                </span>
              </label>
            </div>
          </div>

        <button @click="focusInput()" class="starlight-button" v-if="isStarlight">
          Выбрать Gif
        </button>
        <input type="file" accept="image/gif" id="gif" style="opacity: 0" @change="previewGif">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  margin-left: 35px;
  width: 60%;

  h3 {
    width: 100%;
    padding-bottom: 12px;
    margin-top: 16px;
    border-bottom: #1a1a1a 1px solid;
    margin-bottom: 20px;
  }

  .options {
    display: flex;
    gap: 15px;

    form {
      flex: 7;

      button[type=submit] {
        margin-top: 5px;
        padding: 10px 27px;
        background-color: var(--main);
        border: none;
        border-radius: 4px;

        &:active {
          opacity: 0.9;
        }
      }

      .text-options {
        width: 75%;

        .form {
          display: flex;
          flex-direction: column;
          margin-bottom: 12px;

          input, select, textarea {
            background-color: #1a1a1a;
            border: none;
            outline: 1px solid #2c2c2c;
            width: 450px;
            transition: 0.2s ease-in-out;
            border-radius: 5px;
            font-weight: 400;

            &:focus {
              outline: 2px solid var(--main);
              background-color: #2f2f2f;
            }
          }
          label {
            font-size: 1.05rem;
            margin-bottom: 5px;
          }

          p {
            width: 450px;
            font-size: 0.8rem;
            font-weight: 400;
            color: #6d706d;
            margin-top: 9px;
          }

          input {
            padding: 10px;
            height: 30px;
          }
          textarea {
            padding: 10px 10px;
            height: 70px;
          }
          select {
            padding: 0 6px;
            height: 30px;
          }
        }
      }
    }
    .photo-options {
      flex: 3;
      min-width: 250px;

      h2 {
        margin-top: 5px;
        font-size: .9rem;
      }

      .avatar {
        position: relative;
        margin: 15px auto 0 auto;
        background-size: cover;
        background-position: center;
        clip-path: circle(50% at center);
        background-color: #FFFFFF;
        width: 90%;
        aspect-ratio: 1/1;

        &:hover .table {
          opacity: 0.8;
        }

        .table {
          opacity: 0;
          position: absolute;
          bottom: -1px;
          height: 45px;
          width: 100%;
          background-color: #000000;
          transition: 0.1s;
        }
      }

      .input-file {
        position: relative;
        display: flex;
        justify-content: center;

        & > span {
          margin-top: 7px;
          position: relative;
          width: 90%;
          height: 28px;
          border-radius: 3px;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.8rem;

          &:active {
            opacity: 0.9;
          }

          span {
            margin-right: 5px;
            margin-bottom: 1px;
            font-size: 1.1rem;
          }
        }

        input {
          position: absolute;
          z-index: -1;
          opacity: 0;
          width: 0;
          height: 0;
        }
      }

      p {
        font-size: 0.8rem;
        font-weight: 400;
        color: #6d706d;
        margin-top: 9px;
      }
    }
  }
}

.starlight-button {
  display: flex;
  width: 90%;
  padding: 10px 0;
  align-items: center;
  justify-content: center;
  margin: 15px auto 0;
  border: none;
  border-radius: 3px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientAnimation 3s infinite;
}

.send {
  display: flex;
  width: 40%;
  margin: 9px auto 0;
  padding: 6px 0;
  align-items: center;
  justify-content: center;
  background-color: #ee7752;
  border: none;
  border-radius: 3px;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>