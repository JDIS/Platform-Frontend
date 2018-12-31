<!--
Component that displays a table with a ranking of players.
-->

<template>
  <div class="leaderboard">
    <div class="container-fluid">
      <div class="row">
        <div class="container-fluid">
          <div class="row">
            <div class="col">Position</div>
            <div class="col">Nom</div>
            <div class="col">Points</div>
          </div>
          <div class="row" v-for="rank of ranking">
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

    @Component
export default class LeaderboardComponent extends Vue {
    @Prop() private ranking!: Rank[];
}
</script>
