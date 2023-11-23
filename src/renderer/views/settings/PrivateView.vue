<script setup>

</script>

<template>
  <div class="content">
    <section>
      <h3>
        Private Settings
      </h3>

      <div class="checkbox">
        <input type="checkbox">
        <div>
          <h6>Make sure that i'll be havent't seen on public search</h6>
          <p>This setting will hide your account and keep it private</p>
        </div>
      </div>

      <div class="checkbox">
        <input type="checkbox">
        <div>
          <h6>Don't show my lastly listened song</h6>
          <p>This setting will hide information about your lastly listened song</p>
        </div>
      </div>

    </section>

    <section>
      <h3>
        Change email
      </h3>
      <p>
        Changing your email will have unintended side effects
      </p>
      <button>
        Change username
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
      <button>
        Change username
      </button>
    </section>
  </div>
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
      margin-bottom: 10px;
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
</style>