<!--
View to display the leaderboard.
-->

<template>
  <div class="challenges-view">
    <h1 class="spaced">Challenges</h1>
    <ChallengesComponent :challenges="challenges" />
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import ChallengesComponent from "@/components/Challenges.vue";
    import {HelperMethods} from "@/functions";
    import {Challenge} from "@/models/Challenge";
    import {Category} from "@/models/Category"; // @ is an alias to /src
    let axios = require('axios');

  @Component({
    components: {
      ChallengesComponent,
    },
  })
  export default class Challenges extends Vue {

    challenges: Category[] = [];

    groupChallenges(challenges: Challenge[]) {
      let categories = HelperMethods.groupByArray(challenges, "category");
      categories.forEach((category) => category.isVisible = true);
      return categories;
    }

    mounted() {
      axios.get(process.env.VUE_APP_BACKEND_URL + '/challenges', {withCredentials: true})
              .then((response) => {
                console.log(response);
                if(response.status === 200) {
                  this.challenges = this.groupChallenges(response.data.challenges);
                }
              });
    }
  }
</script>
