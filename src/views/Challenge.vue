<!--
View to display a single challenge to solve.
-->

<template>
  <div class="challenge-view">
    <MarkdownRender class="markdow-render" markdown="**test**"/>
    <CodeEditor class="code-editor"/>
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
    private challenge: any = null;
  }
</script>

<style scoped lang="less">
  .markdow-render {
    float: left;
    width: 50%;
  }

  .code-editor {
    float: right;
    width: 50%;
  }

  .challenge-view {
  }
</style>
