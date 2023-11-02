<script setup>

import {useMouse} from "@vueuse/core/index";

const {x, y} = useMouse();

const isActive = false;

const selectionData = {
  musicAdd: [
    {
      svg: ['M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z', 'M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z'],
      span: 'Add to favorites',
      function() {

      }
    },
    {
      svg: ['M4.069.967h7.855L15.98 8l-4.057 7.034H4.069L.01 8 4.069.967zm.866 1.5L1.743 8l3.192 5.534h6.122L14.25 8l-3.192-5.533H4.935z', 'M7.246 9V4h1.5v5h-1.5zm0 3.025v-1.5h1.5v1.5h-1.5z'],
      span: 'Add to album',
      function() {

      }
    },
    {
      svg: ['M1 5.75A.75.75 0 0 1 1.75 5H4v1.5H2.5v8h11v-8H12V5h2.25a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75v-9.5z', 'M8 9.576a.75.75 0 0 0 .75-.75V2.903l1.454 1.454a.75.75 0 0 0 1.06-1.06L8 .03 4.735 3.296a.75.75 0 0 0 1.06 1.061L7.25 2.903v5.923c0 .414.336.75.75.75z'],
      span: 'Copy link',
      function() {

      }
    }
  ],
  myPlaylist: [
    {
      svg: ['M11.838.714a2.438 2.438 0 0 1 3.448 3.448l-9.841 9.841c-.358.358-.79.633-1.267.806l-3.173 1.146a.75.75 0 0 1-.96-.96l1.146-3.173c.173-.476.448-.909.806-1.267l9.84-9.84zm2.387 1.06a.938.938 0 0 0-1.327 0l-9.84 9.842a1.953 1.953 0 0 0-.456.716L2 14.002l1.669-.604a1.95 1.95 0 0 0 .716-.455l9.841-9.841a.938.938 0 0 0 0-1.327z'],
      span: 'Change',
      function() {

      }
    },
    {
      svg: ["M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z", 'M12 8.75H4v-1.5h8v1.5z'],
      span: 'Delete',
      function() {

      }
    },
    {
      svg: ['M1 5.75A.75.75 0 0 1 1.75 5H4v1.5H2.5v8h11v-8H12V5h2.25a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75v-9.5z', 'M8 9.576a.75.75 0 0 0 .75-.75V2.903l1.454 1.454a.75.75 0 0 0 1.06-1.06L8 .03 4.735 3.296a.75.75 0 0 0 1.06 1.061L7.25 2.903v5.923c0 .414.336.75.75.75z'],
      span: 'Copy link',
      function() {

      }
    }
  ],
  otherPlaylist: [
    {
      svg: ['M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1.5 8a6.5 6.5 0 1 1 11.395 4.277 3.504 3.504 0 0 0-1.163-1.088l-1.523-.88a.285.285 0 0 1-.076-.428l.086-.104v-.001c.549-.654.962-1.449 1.02-2.422.03-.526-.055-1.074-.165-1.395a3.23 3.23 0 0 0-.671-1.154 3.259 3.259 0 0 0-4.806 0 3.23 3.23 0 0 0-.672 1.154c-.109.32-.195.87-.163 1.395.057.973.47 1.768 1.018 2.422l.087.105a.285.285 0 0 1-.076.428l-1.523.88a3.506 3.506 0 0 0-1.163 1.088A6.475 6.475 0 0 1 1.5 8zm2.74 5.302c.173-.334.44-.62.778-.814l1.523-.88A1.784 1.784 0 0 0 7.02 8.92l-.088-.105-.002-.002c-.399-.476-.637-.975-.671-1.548a2.71 2.71 0 0 1 .087-.824 1.74 1.74 0 0 1 .357-.623 1.76 1.76 0 0 1 2.594 0c.155.17.274.378.357.623a2.716 2.716 0 0 1 .087.824c-.034.573-.272 1.072-.671 1.548l-.002.002-.088.105c-.709.85-.48 2.135.479 2.688l1.523.88c.338.195.605.48.779.814A6.47 6.47 0 0 1 8 14.5a6.47 6.47 0 0 1-3.76-1.198z'],
      span: 'Add to profile',
      function() {

      }
    },
    {
      svg: ['M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z'],
      span: 'Delete from my albums',
      function() {

      }
    },
    {
      svg: ['M1 5.75A.75.75 0 0 1 1.75 5H4v1.5H2.5v8h11v-8H12V5h2.25a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75v-9.5z', 'M8 9.576a.75.75 0 0 0 .75-.75V2.903l1.454 1.454a.75.75 0 0 0 1.06-1.06L8 .03 4.735 3.296a.75.75 0 0 0 1.06 1.061L7.25 2.903v5.923c0 .414.336.75.75.75z'],
      span: 'Copy link',
      function() {

      }
    }
  ],
  myAlbums: [
    {
      svg: ['M2 0v2H0v1.5h2v2h1.5v-2h2V2h-2V0H2zm11.5 2.5H8.244A5.482 5.482 0 0 0 7.966 1H15v11.75A2.75 2.75 0 1 1 12.25 10h1.25V2.5zm0 9h-1.25a1.25 1.25 0 1 0 1.25 1.25V11.5zM4 8.107a5.465 5.465 0 0 0 1.5-.593v5.236A2.75 2.75 0 1 1 2.75 10H4V8.107zM4 11.5H2.75A1.25 1.25 0 1 0 4 12.75V11.5z'],
      span: 'New playlist'
    }
  ]
}
</script>

<template>
  <div class="dropdown-menu" :style="`left: ${x}px; top: ${y}px;`" style="display: none">
    <ul class="options-list">
      <li v-for="option in selectionData.musicAdd">
        <button @click="option.function()">
          <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16">
            <path v-for="path in option.svg" :d="path" />
          </svg>
          <span>{{option.span}}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  .dropdown-menu {
    position: absolute;
    min-width: 200px;
    background-color: #1a1a1a;
    border-radius: 6px;

    .options-list {
      padding: 4px;
      box-shadow: 0 16px 24px rgba(0,0,0,.3),0 6px 8px rgba(0,0,0,.2);
      overflow-y: auto;

      li {
        overflow: hidden;
        border-radius: 2.5px;
        width: 100%;
        box-sizing: border-box;
        list-style: none;

        &:hover {
          background-color: #282727;
        }

        button {
          background-color: inherit;
          border: none;
          display: flex;
          height: 40px;
          justify-content: space-between;
          position: relative;
          padding: 12px;
          text-align: start;
          gap: 15px;

          svg {
            color: #FFFFFF;
            fill: #f3f5ff;
            width: 16px;
            aspect-ratio: 1/1;
          }

          span {

          }
        }
      }
    }
  }
</style>