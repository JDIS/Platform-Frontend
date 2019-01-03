<!--
View to display the challenges list.
-->

<template>
  <div class="challenges-view">
    <h1 class="spaced">Challenges</h1>
    <ChallengesComponent :challenges="challenges" :categories="categories" />
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import ChallengesComponent from "@/components/Challenges.vue";
  import {HelperMethods} from "@/functions";
  import {Challenge} from "@/models/Challenge";
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

    groupChallenges(challenges: Challenge[]) {
      let categories = HelperMethods.groupByArray(challenges, "category");
      categories.forEach((category) => category.isVisible = true);
      return categories;
    }

    mounted() {
        axios.get(process.env.VUE_APP_BACKEND_URL + '/categories', {withCredentials: true})
            .then((response) => {
                if(response.status === 200) {
                    this.categories = response.data.reduce((dict, category) => {
                        dict[category.id] = category.name;
                        return dict;
                    }, {});
                }
                axios.get(process.env.VUE_APP_BACKEND_URL + '/challenges', {withCredentials: true})
                    .then((response) => {
                        if(response.status === 200) {
                            this.challenges = this.groupChallenges(response.data);
                        }
                    });
            });
    }
  }
</script>
