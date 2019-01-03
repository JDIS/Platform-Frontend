<!--
View to display a single challenge to solve.
-->

<template>
  <div class="challenge-view">
    <h1 class="spaced">Challenge</h1>
    haha
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";

  let axios = require('axios');

  @Component({
    components: {
    },
  })
  export default class ChallengeView extends Vue {

    challenge: any = null;

  }
</script>
