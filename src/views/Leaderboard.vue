<!--
View to display the leaderboard.
-->

<template>
  <div class="leaderboard-view">
    <h1 class="spaced">Classement</h1>
    <LeaderboardComponent :ranking="ranking"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import LeaderboardComponent from "@/components/Leaderboard.vue";
import { Rank } from "@/models/Rank";
import { User } from "@/models/User";
import axios from "axios";

@Component({
  components: {
    LeaderboardComponent,
  },
})
export default class Leaderboard extends Vue {
  private users: Array<User> = [];
  private ranking: Array<Rank> = [];

  async mounted() {
    this.users = await axios.get(process.env.VUE_APP_BACKEND_URL + '/users', {withCredentials: true})
                            .then((response) => response.data);

    this.ranking = []
    for (const [i, user] of this.users.entries()) {
      const rank = new Rank();
      rank.rank = i + 1;
      rank.name = user.cip;
      rank.points = user.totalPoints;
      this.ranking.push(rank);
    }
  }
}
</script>
