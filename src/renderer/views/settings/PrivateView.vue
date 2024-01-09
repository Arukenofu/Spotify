<script setup>
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import router from "../../router";

onMounted(async () => {
  const res = await axios.post('http://localhost:3000/private', {
    id: localStorage.getItem('id')
  },{
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    }
  })

  console.log(res.data);

  visibility.value.user = !res.data[0].showinsearch;
  visibility.value.music = !res.data[0].showlastmusic;

  console.log(visibility.value)
})

const isModal = ref(false)
const confirmValue = ref('')

const formData = reactive({
  id: localStorage.getItem('id'),
  email: '',
  password: '',
})

const errors = ref('')

const deleteProfile = async () => {
  try {
    const res = await axios.post('http://localhost:3000/deleteAccount',
        formData,
        {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          }
        }
    )
    if (res.data.message === 'Account deleted.') {
      localStorage.clear();
      router.push('/auth');
    }
  } catch (e) {
    console.error(e?.response?.data)
    errors.value = e.response.data.message;
  }
}

const visibility = ref({
  user: null,
  music: null
})

const changeUserVisibility = async () => {
  const value = visibility.value.user;

  await axios.post('http://localhost:3000/userVisibility', {
    id: localStorage.getItem('id'),
    value: value
  }, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    }
  });
}

const changeMusicVisibility = async () => {
  const value = visibility.value.music;

  await axios.post('http://localhost:3000/musicVisibility', {
    id: localStorage.getItem('id'),
    value: value
  }, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    }
  });
}

const clearData = () => {
  localStorage.clear();

  location.reload();
}
</script>

<template>
  <div class="content">
    <section>
      <h3>
        Private Settings
      </h3>

      <div class="checkbox">
        <input type="checkbox" v-model="visibility.user" @input="changeUserVisibility()">
        <div>
          <h6>Make sure that i'll be havent't seen on public search</h6>
          <p>This setting will hide your account and keep it private</p>
        </div>
      </div>

      <div class="checkbox">
        <input type="checkbox" v-model="visibility.music" @input="changeMusicVisibility()">
        <div>
          <h6>Don't show my lastly listened song</h6>
          <p>This setting will hide information about your lastly listened song</p>
        </div>
      </div>

    </section>

    <section>
      <h3>
        Logout
      </h3>
      <p>
        You will be logged out from your account.
      </p>
      <button @click="clearData()">
        Logout
      </button>
    </section>

    <section>
      <h3>
        Change password
      </h3>
      <p>
        Changing your password will have unintended side effects
      </p>
      <button>
        Change password
      </button>
    </section>

    <section>
      <h3>
        Delete account
      </h3>
      <p>
        Once you delete your account, there is no back to restore your account.
      </p>
      <button @click="isModal = true">
        Delete account
      </button>
    </section>
  </div>

  <teleport to="body">
    <div class="modal-bg" v-if="isModal">
      <div class="modal">
        <div class="overlay-header">
          <h3>
            Are you really sure to do this?
          </h3>
          <button class="material-symbols-outlined" @click="isModal = false">
            close
          </button>
        </div>
        <div class="warning">
          You can no longer restore your account after finish this.
        </div>

        <label for="email">
          Email
        </label>
        <input type="text" v-model="formData.email">

        <label for="password">
          Password
        </label>
        <input type="password" v-model="formData.password">

        <label>
          Type "ICONFIRM"
        </label>
        <input type="text" v-model="confirmValue">

        <span>
          {{errors}}
        </span>

        <button
            :disabled="confirmValue !== 'ICONFIRM'"
            :class="confirmValue !== 'ICONFIRM' ? 'disabled' : ''"
            @click="deleteProfile()"
        >
          Delete my account
        </button>
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.content {
  width: 60%;
  margin-left: 35px;

  section {
    width: 100%;
    margin-top: 30px;

    &:first-child h3 {
      margin-bottom: 20px;
    }

    h3 {
      width: 100%;
      padding-bottom: 12px;
      margin-bottom: 12px;
      margin-top: 16px;
      border-bottom: #1a1a1a 1px solid;
    }


    & > p {
      font-size: 0.9rem;
      font-weight: 400;
      margin-bottom: 15px;
    }

    & > button {
      border-radius: 5px;
      background-color: #1a1a1a;
      outline: 1px solid #2c2c2c;
      border: none;
      padding: 10px 15px;
      transition: 0.05s ease-in-out;
      font-size: 0.8rem;
      color: #bebebe;

      &:active {
        opacity: .9;
        outline: 1px solid #bebebe;
      }
    }

    .checkbox {
      display: flex;
      align-items: start;
      gap: 10px;
      margin-bottom: 18px;

      input {
        box-sizing: border-box;
        width: 14px;
        aspect-ratio: 1/1;
        margin-top: 4px;
        display: flex;
        border: 1px solid #dddddd;
        background-color: #2E2E2C;
      }

      h6 {
        font-size: 1rem;
      }
      p {
        font-size: 0.8rem;
        font-weight: 400;
        color: #6d706d
      }
    }
  }

  section:last-child {
    h3 {
      font-weight: 700;
      color: #ff2929;
    }

    button {
      color: #ff2929;

      &:active {
        outline: 1px solid #ff2929;
      }
    }
  }
}

.modal-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  top: 0;
  width: 100%;
  position: absolute;
  height: 100%;
  background-color: rgb(1,1,1, 0.8);

  .modal {
    display: flex;
    flex-direction: column;
    padding: 20px 30px;
    width: 460px;
    min-height: 370px;
    border-radius: 7px;
    background-color: #090909;
    border: 1px solid #2E2E2C;

    .overlay-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;

      h3 {
        font-size: 1rem;
      }

      button {
        font-size: 1.1rem;
        padding: 5px;
        background: none;
        border-radius: 2px;
        border: none;

        &:hover {
          background-color: #2E2E2C;
        }
      }
    }

    .warning {
      background-color: rgba(255,41,41, 0.2);
      border: #9f1919 1.5px solid;
      padding: 21px 10px;
      border-radius: 3px;
      font-size: .8rem;
      font-weight: 300;
      text-align: center;
      margin-bottom: 15px;
    }

    label {
      user-select: none;
      font-size: .9rem;
      margin-bottom: 8px;
    }

    input {
      background-color: #1a1a1a;
      border: none;
      outline: 1px solid #2c2c2c;
      transition: 0.2s ease-in-out;
      border-radius: 3px;
      font-weight: 400;
      padding: 7px 10px;
      margin-bottom: 15px;

      &:focus {
        outline: 1px solid #ff2929;
        background-color: #2f2f2f;
      }
    }

    span {
      font-size: .9rem;
      color: #ff2929;
      margin-bottom: 3px;
    }

    button {
      margin-top: 7px;
      padding: 10px 0;
      border-radius: 3px;
      border: 1px solid #1a1a1a;
      background-color: #1a1a1a;
      transition: 0.7s;

      &:active {
        border: 1px solid #ff0000;
      }
    }

    .disabled {
      opacity: 0.4;
    }
  }
}
</style>