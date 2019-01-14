<template>
  <span>
    <h1>Description</h1>
    <div class="markdown-container" v-bar>
      <div>
         <vue-markdown class="markdown-render">{{markdown}}</vue-markdown>
      </div>
    </div>
  </span>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import VueMarkdown from 'vue-markdown'

  @Component({
    components: {
      VueMarkdown
    }
  })
  export default class MarkdownRender extends Vue {
    @Prop()
    private markdown!: string;
  }
</script>

<style lang="less">
  .markdown-container {
    background-color: #272822;
    height: 500px
  }

  .markdown-render {
    color: #f0f0f0;
    margin: 10px;
  }

  pre {
    display: block;
    padding: 9.5px;
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #333;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  code {
    padding: 2px 4px;
    font-size: 90%;
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 4px;
  }
</style>
