<!--
Component that displays a list of challenges.
-->

<template>
  <div class="challenges">
    <div class="container-fluid">
      <div class="row">
          <div class="container-fluid">
              <div class="row" v-for="challenge of challenges">
                  <pre>{{ challenge | json }}</pre>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
export default class ChallengesComponent extends Vue {
    @Prop() private challenges!: Challenge[];
}
</script>
