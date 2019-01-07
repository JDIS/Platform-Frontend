<!--
View to display a single challenge to solve.
-->

<template>
  <div class="challenge-view">
    <MarkdownRender class="markdow-render" v-if="challenge.description" :markdown="challenge.description || ''"/>
    <CodeEditor class="code-editor"/>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import CodeEditor from "@/components/CodeEditor.vue";
    import MarkdownRender from "@/components/MarkdownRender.vue";
    import axios from "axios";
    import {Challenge} from "@/models/Challenge";

    @Component({
    components: {
      MarkdownRender,
      CodeEditor,
    },
  })
  export default class ChallengeView extends Vue {
    protected challenge: Challenge = new Challenge();
    private challengeId: string = "";

    mounted() {
      this.challengeId = this.$route.params["id"];
      axios.get(`${process.env.VUE_APP_BACKEND_URL}/challenges/${this.challengeId}`, {withCredentials: true})
              .then(response => {
                console.log("r", response);
                this.challenge = response.data;
                //this.fetchLanguages(this.challenge.)
              })
              .catch(error => console.log("Error when fetching challenge: ", error))
    }

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
