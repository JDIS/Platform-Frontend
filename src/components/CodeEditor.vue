<template>
  <span class="code-editor">
    <div class="header language-selector-section">
      <div>Éditeur de code</div>
      <div>
        <select class="language-selector" v-model="selectedLanguage" @change="changeLang">
          <option v-for="language in languages" v-bind:value="language" :key="language.id">
            {{ language.name }}
          </option>
        </select>
        <img v-on:click="fullscreen" class="fullscreen" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD/SURBVGhD7dg9agJBHIbxTaEkCopViE3A3sYTBDyBoBJyiNxEwUMEJYdI5SXEO0Txo018ZsRGZmX/yrCi7wM/cAoH38rVRCl13z2gZlDFORURui9NGabcB/s3msDSK1YI3ZXmC6YOQ/7wm9EQlp4xQ+iuYxtcNGTpT/n3AQ3RkAhpiIZESkNuZkgF7o0Lf8q/d5w1xDWG9bEjVi+You9PSimllFLqamqgvn95FbXwtH+ZvQLWmPtT/rXhHuNH/mRIvxAjpSEaEikN0ZBIachhyBa9DLpw/z1Ze0PovmPuG/2iIRY/sNRE6J5TzENK+DbqwNIjBgjdleYTSqn7LUl2Bci5+aD+MsEAAAAASUVORK5CYII=">
      </div>
    </div>
    <AceEditor
      style="width: 100%; height: 70vh;"
      :mode="highlightMode"
      theme="monokai"
      :onChange="codeChanged"
      name="ace-editor-1"
      :value="solution"
      :showPrintMargin="false"
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
  private highlightMode: string = 'python';
  
  private codeChanged(code: string) {
    this.$emit('updated', code)
    // Dirty hack. This "fix" a bug that would prevent the editor from showing the h scroll bar.
    // The bug is triggered by the `style="width: 100%"`. It f-up the width calculation.
    // It might break at any time and might be costly.
    // @ts-ignore
    this.$children[0].editor.resize()
  }

  private changeLang(langChange: Event) {
    this.highlightMode = this.selectedLanguage.highlight;
    this.$emit('langUpdated', this.selectedLanguage)
  }
  
  private fullscreen() {
    this.$emit('fullscreen');
  }
}
</script>

<style lang="less">
.language-selector-section {
  display: flex;
  justify-content: space-between;
}
.code-editor {
  width: 100%;
}

.fullscreen {
  margin-left: 10px;
  width: 25px;
  height: 25px;
  filter: invert(100%);
  cursor: pointer;
  background: transparent;

  &:hover{
    box-shadow: 0 0 10px black;
  }  
}
</style>
