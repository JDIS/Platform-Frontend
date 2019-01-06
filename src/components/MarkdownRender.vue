<template>
  <div class="markdown-render" v-html="html">
  </div>
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
