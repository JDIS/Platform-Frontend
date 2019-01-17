<!--
Component that displays a table with a ranking of players.
-->

<template>
  <div class="leaderboard">
    <div class="container-fluid">
      <div class="row">
        <div class="container-fluid">
          <div class="row header">
            <div class="col">Position</div>
            <div class="col">Nom</div>
            <div class="col">Points</div>
          </div>
          <div class="row ranking-row" v-for="rank of ranking">
            <div class="col">{{ rank.rank }}</div>
            <div class="col">{{ rank.name }}</div>
            <div class="col">{{ rank.points }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
  import {Rank} from "@/models/Rank";

  @Component
export default class LeaderboardComponent extends Vue {
    @Prop() private ranking!: Rank[];
}
</script>

<style scoped lang="less">
.leaderboard {
  margin: 10px;
  border: solid 1px;
}
.header {
  background-color: #2d9d5f;
  border: solid 1px;
}
.ranking-row {
  border: solid 1px;
}
 .ranking-row:nth-child(even) {
   background-color: white;
 }
 .ranking-row:nth-child(odd) {
   background-color: #eee;
 }
</style>
