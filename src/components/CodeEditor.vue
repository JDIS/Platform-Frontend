<template>
  <span class="code-editor">
    <div class="header language-selector-section">
      <div>Éditeur de code</div>
      <select class="language-selector" v-model="selectedLanguage" @change="changeLang">
        <option v-for="language in languages" v-bind:value="language" :key="language.id">
          {{ language.name }}
        </option>
      </select>
    </div>
    <AceEditor
      style="width: 100%; height: 70vh;"
      :mode="highlightMode"
      theme="monokai"
      :onChange="codeChanged"
      name="ace-editor-1"
      :value="solution"
    />
  </span>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import brace from 'brace';
  import { Ace as AceEditor } from 'vue2-brace-editor';
  import { Language } from "@/models/Language";
 
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
    @Prop() private solution!: string;
    @Prop() private languages: Array<Language> = [];
    @Prop() private selectedLanguage!: Language;
    public $el!: HTMLElement;
    private editorWidth: number = 500;
    private highlightMode: string = 'python';

    private codeChanged(code: string) {
      this.$emit('updated', code)
    }

    private mounted() {
      this.editorWidth = this.$el.offsetWidth;
    }

    private changeLang(langChange: Event) {
      this.highlightMode = this.selectedLanguage.highlight;
      this.$emit('langUpdated', this.selectedLanguage)
    }
  }
</script>

<style lang="less">
.language-selector-section {
  display: flex;
  justify-content: space-between;
}
</style>
