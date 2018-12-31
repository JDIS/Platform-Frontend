<!--
Component that displays a table with a ranking of players.
The ranking argument should be a list of objects like:
{
rank: 1,
name: "Émilio Gonzalez",
points: 42
}
-->

<template>
  <div class="leaderboard">
    <h1 class="spaced">Classement</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="container-fluid">
          <div class="row">
            <div class="col">Position</div>
            <div class="col">Nom</div>
            <div class="col">Points</div>
          </div>
          <div class="row" v-for="player of ranking">
              <div class="col">{{ player.rank }}</div>
              <div class="col">{{ player.name }}</div>
              <div class="col">{{ player.points }}</div>
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
    @Prop() private ranking!: any[];
}
</script>
