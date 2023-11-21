<script setup>
import {reactive, ref, watch} from "vue";
import axios from "axios";
import router from "../router";
import {musicStore} from "../stores/MusicStore";

const isRegister = ref(false)
const errors = ref([]);
const serverResp = ref()

const changeRegister = () => {
  isRegister.value =! isRegister.value;

  registrationData.email = '';
  registrationData.username = '';
  registrationData.password = '';

  loginData.email = '';
  loginData.password = '';
  loginData.keepLogged = false;

  errors.value = [];
}

const loginData = reactive({
  email: '',
  password: '',
})

const keepLogged = ref(false)

const LogIn = async () => {
  errors.value = []

  if (!loginData.email.trim() || !loginData.password.trim()) {
    errors.value.push("Fill in all the fields")
    return
  }
  if (loginData.email.trim().length < 6) {
    errors.value.push("Email must have at least 6 characters")
    return
  }
  if (loginData.password.trim().length < 6) {
    errors.value.push("Password must have at least 6 characters")
    return
  }

  try {
    const response = await axios.post('http://localhost:3000/login', loginData)
    localStorage.setItem("token", response.data.token)
    localStorage.setItem("email", response.data.email)
    localStorage.setItem("username", response.data.username);
    localStorage.setItem("avatar", response.data.avatar)
    await musicStore().fetchMainAlbums();
    await router.push('/')
  } catch (e) {
    errors.value.push(e?.response?.data?.message);
  }
}

const registrationData = reactive({
  email: '',
  username: '',
  password: ''
})
const isPrivacyRead = ref(false)

const register = async () => {
  errors.value = [];
    if (!isPrivacyRead.value) {
      errors.value.push("Not agree with privacy data")
      return
    }
    if (!registrationData.email.trim() || !registrationData.username.trim() || !registrationData.password.trim()) {
      errors.value.push('Enter all fields')
      return
    }
    if (registrationData.email.trim().length < 6) {
      errors.value.push("Email must have at least 6 characters")
      return
    }
    if (registrationData.username.trim().length < 4) {
      errors.value.push("Username must have at least 4 characters")
      return
    }
    if (registrationData.password.trim().length < 6) {
      errors.value.push("Password must have at least 6 characters")
      return
    }
    try {
      await axios.post('http://localhost:3000/register', registrationData)
      changeRegister();
    } catch (e) {
      console.log(e)
      if (e.response.data.message) {
        errors.value.push(e.response.data?.message)
      } else {
        errors.value.push(e.response.data.detail)
      }
    }
}
</script>

<template>
  <div class="window-control">
    <h3>Spotify</h3>
  </div>
  <div class="root">
    <div class="modal">
      <div class="form">
        <div class="input-layer">
            <h2>{{!isRegister ? 'Welcome Back.' : 'Hello, Newbie.'}}</h2>
            <p>
              {{!isRegister ? 'Don\'t have an account?' : 'Already have an account?'}}
              <b @click="changeRegister()">{{!isRegister ? 'Sign Up' : 'Log in'}}</b>
            </p>
          {{serverResp}}


          <transition name="v" mode="out-in">
            <form id="myForm" @submit.prevent="LogIn()" v-if="!isRegister" >
              <input type="text" placeholder="Your Email" maxlength="35" class="userdata" v-model="loginData.email" @input="errors = []">
              <input type="password" placeholder="Password" class="userdata" v-model="loginData.password" @input="errors = []">

              <div class="options" onsubmit="return false;" style="margin-bottom: 30px">
                <input type="checkbox" name="reminder" class="check" v-model="keepLogged" >
                <label for="reminder">Keep me logged in</label>
                <button>
                  Forgot Password?
                </button>
              </div>

              <h6>{{errors[0]}}</h6>

              <button type="submit" class="post">
                Sign In
              </button>
            </form>
            <form id="myForm" @submit.prevent="register()" v-else>
              <input type="text" placeholder="Your Email" class="userdata" v-model="registrationData.email" @input="errors = []">
              <input type="text" placeholder="Your Nickname" class="userdata" v-model="registrationData.username" @input="errors = []">
              <input type="password" placeholder="Password" class="userdata last" v-model="registrationData.password" @input="errors = []">

              <div class="options" :style="!errors.length ? 'margin-bottom: 10px;' : 'margin-bottom: 32px;'">
                <input type="checkbox" name="reminder" class="check" v-model="isPrivacyRead">
                <label for="reminder">I accept the Privacy Policy and Politics of Spotify.com</label>
              </div>

              <h6>{{errors[0]}}</h6>

              <button type="submit" class="post" :style="errors.length ? '' : 'margin-top: 20px;'">
                Register
              </button>
            </form>
          </transition>
        </div>
      </div>
      <div class="image">
        <div class="parent-figure">
          <div class="child-figure">
            <img src="../public/auth.png" alt="">
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="">
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.window-control {
  z-index: 1;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  top: 0;
  position: fixed;
  background-color: #000000;
  -webkit-app-region: drag;

  h3 {
    margin-left: 8px;
    font-size: 0.8rem;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-weight: 400;
  }
}

.root {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  width: 100vw;
  height: 100vh;

  .modal {
    display: flex;
    height: 70%;
    aspect-ratio: 16/9;
    border-radius: 15px;

    .form {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #050605;
      height: 100%;
      width: 53%;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;

      .input-layer {
        width: 360px;
        margin-left: 20px;
        display: flex;
        flex-direction: column;

        h2 {
          font-weight: 900;
          font-size: 3rem;
          margin-bottom: 10px;
        }

        h6 {
          color: red;
          position: relative;
          bottom: 15px;
          font-weight: 400;
        }

        p {
          font-size: 0.8rem;
          font-weight: 700;
          color: #f3f5ff;
          margin-bottom: 45px;

          b {
            cursor: pointer;
            font-size: 0.8rem;
            font-weight: 900;
            color: #1be01a;
          }
        }

        .userdata {
          background-color: #292c31;
          color: #abaeb6;
          border: none;
          width: 100%;
          padding: 15px;
          font-weight: 600;
          border-radius: 3px;
          outline: none;

          &:first-child {
            margin-bottom: 15px;
          }
          &:nth-child(2) {
            margin-bottom: 15px;
          }
        }

        .last {
          margin-bottom: 15px;
        }

        .options {
          display: flex;
          justify-content: space-between;
          align-items: center;

          input {
            accent-color: #333333;

            &:checked {
              //accent-color: #c7c7c7;
            }
          }
          label {
            margin-left: 5px;
            flex: 1;
            color: #c7c7c7;
            font-size: 0.75rem;
            font-weight: 600;
          }
          button {
            cursor: pointer;
            position: relative;
            -webkit-appearance: none;
            background-color: initial;
            border: none;
            font-size: 0.75rem;
            color: #c7c7c7;
            font-weight: 600;

            :hover {
              cursor: pointer;
            }
          }
        }

        span {
          font-size: 0.75rem;
          color: red;
        }

        .post {
          width: 100%;
          text-align: center;
          border: none;
          height: 50px;
          background-color: #169632;
          border-radius: 3px;

          &:active {
            opacity: 0.9;
          }
        }
      }
    }
    .image {
      display: flex;
      align-items: center;
      background-color: #292c31;
      height: 100%;
      width: 47%;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;

      .parent-figure {
        position: relative;
        background-color: #169632;
        width: 90%;
        aspect-ratio: 1/1.1;
        -webkit-box-shadow: 4px 4px 9px 3px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 4px 4px 9px 3px rgba(0, 0, 0, 0.1);
        box-shadow: 4px 4px 9px 3px rgba(0, 0, 0, 0.1);

        .child-figure {
          position: absolute;
          bottom: 0;
          background-color: #65bb64;
          height: 75%;
          aspect-ratio: 1/1.1;
          -webkit-box-shadow: 4px 0 9px 3px rgba(0, 0, 0, 0.1);
          -moz-box-shadow: 4px 0 9px 3px rgba(0, 0, 0, 0.1);
          box-shadow: 4px 0 9px 3px rgba(0, 0, 0, 0.1);
          
          img:first-child {
            position: absolute;
            bottom: 0;
            left: -60px;

            width: 430px;
          }
          img:last-child {
            position: absolute;
            width: 90px;
            right: -75px;
            top: -95px;
          }
        }
      }
    }
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>