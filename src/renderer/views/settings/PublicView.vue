<script setup>
import {ref} from "vue";

const user = ref({
  email: localStorage.getItem('email'),
  username: localStorage.getItem('username'),
  avatar: localStorage.getItem('avatar')
})

const preview = ref(null);

const previewImage = (event) => {
  const input = event.target;

  if (input.files) {
    let reader = new FileReader();

    reader.onload = (e) => {
      preview.value = e.target.result;
      console.log(preview.value)
    }
    reader.readAsDataURL(input.files[0]);
  }
}

</script>

<template>
  <div class="content">

    <h3>Public Profile</h3>

    <div class="options">
      <div class="text-options">

        <div class="form">
          <label for="username">
            Name
          </label>
          <input type="text" name="username" :placeholder="user.username">
        </div>

        <div class="form">
          <label for="description">
            Description
          </label>
          <textarea name="description">

          </textarea>
        </div>

        <div class="form">
          <label for="gender">
            Gender
          </label>
          <select name="gender">
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div class="form">
          <label for="location">
            Location
          </label>
          <input type="text" name="location">
        </div>
      </div>

      <div class="photo-options">
        <p>
          Profile Picture
        </p>
        <div class="avatar" :style="preview ? `background-image: url('${preview}')` : `background-image: url('${user.avatar}')`">
          <div class="table">
            <label class="input-file">
              <input type="file" accept="image/*" @change="previewImage">
              <span> <span class="material-symbols-outlined">photo_camera</span> Take a file...</span>
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
    width: 100%;

    .text-options {
      width: 75%;

      .form {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        input, select, textarea {
          background-color: #1a1a1a;
          border: none;
          outline: 1px solid #2c2c2c;
          width: 450px;
          transition: 0.2s ease-in-out;
          border-radius: 5px;

          &:focus {
            outline: 2px solid #2BD268;
            background-color: #2f2f2f;
          }
        }
        label {
          margin-bottom: 5px;
        }

        input {
          padding: 10px;
          height: 30px;
        }
        textarea {
          padding: 5px 5px;
          height: 70px;
        }
        select {
          height: 30px;
        }
      }
    }
    .photo-options {
      width: 30%;

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