<!--
View to display a single challenge to solve.
-->

<template>
  <div class="challenge-view">
    <h1 class="spaced">Challenge</h1>
      <MarkdownRender markdown="**test**"/>
      <CodeEditor/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import CodeEditor from '@/components/CodeEditor.vue';
  import MarkdownRender from '@/components/MarkdownRender.vue';

  @Component({
    components: {
      MarkdownRender,
      CodeEditor,
    },
  })
  export default class ChallengeView extends Vue {
    challenge: any = null;
  }
</script>
