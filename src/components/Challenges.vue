<!--
Component that displays a list of challenges, grouped by category.
-->

<template>
  <div class="challenges">
    <div class="container-fluid">
      <div class="row">
          <div class="container-fluid">
              <div class="row align-items-center category" v-for="category of challenges">
                  <div class="container-fluid category-header" @click="toggleCategory(category)">
                      <h2>CATEGORIE: {{ categories[category.key] }}</h2>
                  </div>
                  <div class="container-fluid" :class="{hidden: !category.isVisible}">
                      <div class="row challenge-preview" @click="openChallenge(challenge)" v-for="challenge of category.values">
                          <div class="col-12">
                              <h2>{{ challenge.name }}</h2>
                          </div>
                          <div class="col-5">
                              <h5>Catégorie: <strong>{{ categories[challenge.category] }}</strong></h5>
                          </div>
                          <div class="col-4">
                              <strong><span v-if="challenge.isCodingChallenge">Correction automatique</span></strong>
                          </div>
                          <div class="col-3">
                              <h4>{{ challenge.points }} point(s)</h4>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {GroupedChallenges} from "@/models/GroupedChallenges";
    import {Challenge} from "@/models/Challenge";
    import {Category} from "@/models/Category";

    @Component
export default class ChallengesComponent extends Vue {
    @Prop() challenges!: GroupedChallenges[];
    @Prop() categories!: Category[];

    openChallenge(challenge: Challenge): void {
        this.$router.push(`/challenge/${challenge.id}`, (a) => console.log("yezzer",a))
    }

    toggleCategory(category: GroupedChallenges) {
        category.isVisible = !category.isVisible;
    }

}
</script>

<style scoped lang="less">
    .category {
        border: 1px solid red;
    }
    .challenge-preview {
        border: 1px solid black;
        cursor: pointer;
    }

    .category-header {
        cursor: pointer;
    }
</style>
