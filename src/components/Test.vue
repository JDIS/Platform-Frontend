<!--
Component that displays a test and it's result
-->

<template>
  <div v-bind:style="{ background: isSelected ? 'rgb(0,100,200)' : ''}" class="test-container row" @click="selectTest()">
    <div class="number" v-bind:class="numberColorSelector()">{{number}}</div>
    <div class="name">{{name}}</div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class Test extends Vue {
    @Prop() private id!: string;
    @Prop() private number!: Number;
    @Prop() private name!: string;
    @Prop() private isPublic!: boolean;
    @Prop() private isSuccess?: boolean;
    @Prop() private isSelected?: boolean;

    selectTest() {
      this.$emit('selected', this.id);
    }

    numberColorSelector() {
      if (this.isSuccess) {
        return { 'test-success': true };
      } else if (this.isSuccess !== undefined && !this.isSuccess) {
        return { 'test-error': true };
      }
    }
}
</script>

<style lang="less">
.test-container {
  background: #A2A498;
  padding: 5px;
  cursor: pointer;

  &:hover {
    background: darken(#A2A498, 10);
  }

  .selected {
    border: 4px solid green;
  }
}

.number {
  border: 1px solid white;
  background: #0A1122;
  padding: 10px;
  width: 40px;
  height: 40px;
  line-height: 20px;
  text-align: center;
}

.name {
  width: 200px;
  line-height: 40px;
  margin-left: 10px;
  color: black;
}

.test-error {
  background: #e01008;
}

.test-success {
  background: #048202;
}
</style>
