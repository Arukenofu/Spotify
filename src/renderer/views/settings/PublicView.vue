<script setup>
import {onMounted, reactive, ref} from "vue";
import axios from "axios";

const user = ref({

})
const isLoaded = ref(false)
onMounted(async () => {
  const data = await axios.post('http://localhost:3000/user', {id: id.value}, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    }
  });

  user.value = data.data[0];
  formData.value.name = user.value.username
  formData.value.description = user.value.description;
  formData.value.location = user.value.location
  formData.value.gender = user.value.gender
  isLoaded.value = true;
})

const id = ref(localStorage.getItem('id'))

const preview = ref(null);

const previewImage = (event) => {
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

</script>

<template>
  <div class="content" v-if="isLoaded">

    <h3>Public Profile</h3>

    <div class="options">

      <form @submit="updateProfile()">
        <div class="text-options">

          <div class="form">
            <label for="username">
              Name
            </label>
            <input type="text" name="username" v-model="formData.name">
            <p>
              Your nickname can be used for public communication and identification in the online environment,
              as well as to create a unique virtual image or character.
            </p>
          </div>

          <div class="form">
            <label for="description">
              Description
            </label>
            <textarea name="description" v-model="formData.description">

            </textarea>
            <p>
              Profile description is brief information about you.
              This is your online business card, helping other users better understand
              who you are and what inspires you.
            </p>
          </div>

          <div class="form">
            <label for="gender">
              Gender
            </label>
            <select name="gender" v-model="formData.gender">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div class="form">
            <label for="location">
              Location
            </label>
            <input placeholder="Your Country" type="text" name="location" v-model="formData.location">
          </div>

          <button type="submit">
            Submit
          </button>
        </div>
      </form>

      <div class="photo-options">
          <p>
            Profile Picture
          </p>
          <div class="avatar" :style="formData.image ? `background-image: url('${formData.image}')` : `background-image: url('${user.avatar}')`">
            <div class="table">
              <label class="input-file">
                <input type="file" accept="image/png" @change="previewImage">
                <span>
                  <span class="material-symbols-outlined">photo_camera</span>
                  Take a file...
                </span>
              </label>
            </div>
          </div>
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
        background-color: #2BD268;
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
              outline: 2px solid #2BD268;
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

      p {
        margin-top: 5px;
        font-size: .9rem;
      }

      .avatar {
        position: relative;
        margin: 15px auto 0 auto;
        background-color: #2c2c2c;
        background-size: cover;
        background-position: center;
        clip-path: circle(50% at center);
        border: 1px #2c2c2c solid;
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
    }
  }
}
</style>