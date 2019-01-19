<!--
Component that displays a test and it's result
-->

<template>
  <div>
    <div class="header">Console: {{ test.name }}</div>
    <div class="console-status-container">
      <div class="console-status row">
        <div class="console-status-indicator" v-bind:class="statusColorSelector('isSuccess', false)"></div>
        <div class="console-status-name">Succès</div>
      </div>
      <div class="console-status row">
        <div class="console-status-indicator" v-bind:class="statusColorSelector('isTimeout', false)"></div>
        <div class="console-status-name">Timeout</div>
      </div>
      <div class="console-status row">
        <div class="console-status-indicator" v-bind:class="statusColorSelector('isCompilationError', true)"></div>
        <div class="console-status-name">Compilation</div>
      </div>
      <div class="console-status row">
        <div class="console-status-indicator" v-bind:class="statusColorSelector('isPublic', false)"></div>
        <div class="console-status-name">Publique</div>
      </div>
    </div>
    <div class="console-container">
      <div>---------------------------------------------------------------------</div>
      <div>stdout: {{ test && test.output }}</div>
      <div>stderr: {{ test && test.error }}</div>
      <div>---------------------------------------------------------------------</div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import { ChallengeTest } from "@/models/ChallengeTest";

@Component
export default class Console extends Vue {
    @Prop() private test!: ChallengeTest;

    statusColorSelector(status, invert) {
      if (this.test[status]) {
        if (invert) {
          return { 'status-error': true };
        }
        return { 'status-success': true };
      } else if (this.test[status] !== undefined && !this.test[status]) {
        if (invert) {
          return { 'status-success': true };
        }
        return { 'status-error': true };
      }
    }
}
</script>

<style lang="less">
.header {
  background-color: #35362f;
  padding: 0.5em 1em;
}

.console-container {
  background-color: black;
}

.console-status-container {
  display: flex;
  background-color: #272822;
  padding-left: 5px;
}

.console-status {
  background-color: #A2A498;
  padding: 5px;
  margin: 5px;
  margin-left: 0px;
  flex: 1;
}

.console-status-name {
  color: black;
  margin-left: 5px;
}

.console-status-indicator {
  width: 10px;
  height: 10px;
  background-color: #0A1122;
  border: 1px solid white;
  margin-top: 7px;
}

.status-error {
  background: #e01008;
}

.status-success {
  background: #048202;
}
</style>
