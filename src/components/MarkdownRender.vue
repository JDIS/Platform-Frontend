<template>
  <span>
    <h1>Description</h1>
    <div class="markdown-render" v-html="html"/>
  </span>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import snarkdown from 'snarkdown';

  @Component({})
  export default class MarkdownRender extends Vue {
    @Prop()
    private markdown!: string;
    private html!: string;

    private created() {
        this.html = snarkdown(this.markdown);
    }
  }
</script>

<style scoped lang="less">
    .markdown-render {
        overflow: scroll;
        word-wrap: break-word;
    }
</style>
