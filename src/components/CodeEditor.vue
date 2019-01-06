<template>
  <div class="code-editor">
    <AceEditor
      :fontSize="14"
      :showPrintMargin="true"
      :showGutter="true"
      :highlightActiveLine="true"
      mode="python"
      theme="monokai"
      :onChange="onChange"
      name="editor"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import brace from 'brace';
  import { Ace as AceEditor } from 'vue2-brace-editor';
 
  import 'brace/mode/python';
  import 'brace/theme/monokai';

  @Component({
    components: {
      AceEditor,
    },
  })
  export default class CodeEditor extends Vue {
  }
</script>
