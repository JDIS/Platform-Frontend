<!--
View to display the challenges list.
-->

<template>
  <div class="challenges-view">
    <h1 class="spaced">Challenges</h1>
    <ChallengesComponent :challenges="challenges" :categories="categories" :results="results" />
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import ChallengesComponent from "@/components/Challenges.vue";
  import {HelperMethods} from "@/functions";
  import {Challenge} from "@/models/Challenge";
  import {Result} from "@/models/Result";
  import {GroupedChallenges} from "@/models/GroupedChallenges";

  let axios = require('axios');

  @Component({
    components: {
      ChallengesComponent,
    },
  })
  export default class Challenges extends Vue {

    challenges: GroupedChallenges[] = [];
    categories: any = {};
    results: Challenge[] = [];

    groupChallenges(challenges: Challenge[]) {
      challenges.forEach((challenge) => challenge.numberTests |= 0)
      const categories = HelperMethods.groupByArray(challenges, "category");
      categories.forEach((category) => category.isVisible = true);
      return categories;
    }

    async mounted() {
      const [categories, challenges, results] = await Promise.all([
        axios.get(process.env.VUE_APP_BACKEND_URL + '/categories', {withCredentials: true}),
        axios.get(process.env.VUE_APP_BACKEND_URL + '/challenges', {withCredentials: true}),
        axios.get(process.env.VUE_APP_BACKEND_URL + '/results', {withCredentials: true}),
      ])

      if(categories.status === 200) {
        this.categories = categories.data.reduce((dict, category) => {
          dict[category.id] = category.name;
          return dict;
        }, {});
      }
      if(challenges.status === 200) {
        this.challenges = this.groupChallenges(challenges.data);
      }
      if(results.status === 200) {
        this.results = results.data;
      }
    }
  }
</script>
