<template>
  <span class="code-editor">
    <h1>Editeur</h1>
    <select @change="changeLang">
      <option v-for="lang in langs" :value="lang">
        {{ lang }}
      </option>
    </select>
    <AceEditor
      style="width: 100%;"
      :mode="highlightMode"
      theme="monokai"
      :onChange="codeChanged"
      name="ace-editor-1"
    />
  </span>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import brace from 'brace';
  import { Ace as AceEditor } from 'vue2-brace-editor';
 
  import 'brace/mode/python';
  import 'brace/mode/javascript';
  import 'brace/mode/ruby';
  import 'brace/mode/c_cpp';
  import 'brace/mode/csharp';
  import 'brace/mode/java';
  import 'brace/mode/rust';
  import 'brace/theme/monokai';

  @Component({
    components: {
      AceEditor,
    },
  })
  export default class CodeEditor extends Vue {
    public $el!: HTMLElement;
    private editorWidth: number = 500;
    private langs: Array<string> = ['python', 'javascript', 'ruby', 'c_cpp', 'csharp', 'java', 'rust'];
    private highlightMode: string = 'python';

    private codeChanged(code: string) {
      this.$emit('updated', code)
    }

    private mounted() {
      this.editorWidth = this.$el.offsetWidth;
    }

    private props() {
      return ['languagesAllowed'];
    }

    private changeLang(langChange: Event) {
      if (langChange
         && (langChange.srcElement as HTMLSelectElement).selectedOptions[0]) {
        this.highlightMode = (langChange.srcElement as HTMLSelectElement).selectedOptions[0].value;
      }
    }
  }
</script>
