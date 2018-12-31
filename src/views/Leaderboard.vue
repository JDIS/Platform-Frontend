<!--
View to display the leaderboard.
-->

<template>
  <div class="leaderboard">
    <LeaderboardComponent :ranking="ranking"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LeaderboardComponent from '@/components/Leaderboard.vue'; // @ is an alias to /src

@Component({
  components: {
    LeaderboardComponent,
  },
})
export default class Leaderboard extends Vue {

  data() {
    return {
      ranking: [
        {
          "name": "Émilio de la Gonzalez",
          "rank": 1,
          "points": 42
        },
        {
          "name": "Émilio Gonzalez",
          "rank": 2,
          "points": 0
        }
      ]
    }
    }
}
</script>
