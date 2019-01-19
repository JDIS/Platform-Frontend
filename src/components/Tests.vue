<!--
Component that displays all tests
-->

<template>
  <div>
    <div class="header">Tests:  <strong> {{ percentage*100 }}% réussi ({{ points }} points)</strong></div>
    <div class="tests">
      <div v-for="(test, index) in tests">
        <Test
          class="test"
          @selected="selectedTestChanged"
          v-bind:id="test.id"
          v-bind:name="test.name"
          :number="index + 1 "
          v-bind:isSuccess="test.isSuccess"
          v-bind:isSelected="test.id === selectedTest"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import { ChallengeTest } from "@/models/ChallengeTest";
import Test from "@/components/Test.vue";

@Component({
  components: {
    Test
  }
})
export default class Tests extends Vue {
  @Prop() private tests!: Array<ChallengeTest>;
  @Prop() private percentage: number = 0;
  @Prop() private points: number = 0;
  private selectedTest: string = "";

  selectedTestChanged(id: string) {
    this.$emit('selectedTest', id);
    this.selectedTest = id;
  }
}
</script>

<style lang="less">
.header {
  background-color: #35362f;
  padding: 0.5em 1em;
}

.test {
  margin: 10px 10px 0px 0px;
}

.tests {
  padding: 0px 10px 10px 10px;
  display: flex;
  flex-flow: row wrap;
  background-color: #272822;
}
</style>
