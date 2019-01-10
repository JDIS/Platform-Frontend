<!--
View to display a single challenge to solve.
-->

<template>
  <div class="challenge">
    <MarkdownRender
      class="challenge__description"
      v-if="challenge.description"
      :markdown="challenge.description || ''"
    />
    <div class="challenge__solution">
      <CodeEditor
        @updated="onSolutionChange"
        v-model="solution"
        :languages="challenge.languagesAllowed"
      />
      <button v-on:click="submit()">Soumettre</button>
      <div>{{ bannerContent }}</div>
      <code>{{ output }}</code>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CodeEditor from "@/components/CodeEditor.vue";
import MarkdownRender from "@/components/MarkdownRender.vue";
import axios from "axios";
import { Challenge } from "@/models/Challenge";

@Component({
  components: {
    MarkdownRender,
    CodeEditor
  }
})
export default class ChallengeView extends Vue {
  protected challenge: Challenge = new Challenge();
  private challengeId: string = "";
  private bannerContent: string = "";
  private solution: string = "";
  private output: string = "";

  data() {
    return {
      solution: ""
    };
  }

  mounted() {
    this.challengeId = this.$route.params["id"];
    axios
      .get(
        `${process.env.VUE_APP_BACKEND_URL}/challenges/${this.challengeId}`,
        { withCredentials: true }
      )
      .then(response => {
        this.challenge = response.data;
        // TODO: hide blacklisted languages / only display whitelisted languages
      })
      .catch(error => console.log("Error when fetching challenge: ", error));
  }

  submit() {
    axios({
      method: "POST",
      url: `${process.env.VUE_APP_BACKEND_URL}/codes/submit`,
      data: {
        challenge: this.challengeId,
        language: "5c356002d609632cc1650081", // TODO: implement language getter
        code: this.solution
      },
      headers: {
        withCredentials: true
      }
    })
      .then(() =>
        axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/challenges/${
            this.challengeId
          }/result`,
          { withCredentials: true }
        )
      )
      .then(response => {
        const testResult = response.data.tests[0]
        this.output = testResult.output
        if (testResult.isSuccess) {
          this.displayBanner("Defi reussi!")
        } else {
          this.displayBanner("Mauvaise reponse. Essayez de nouveau.")
        }
      })
      .catch(error => console.log("Error when submitting solution: ", error));
  }

  displayBanner(content) {
    this.bannerContent = content;
  }

  onSolutionChange(value) {
    this.solution = value;
  }
}
</script>

<style scoped lang="less">
.challenge__description {
  text-align: left;
  flex: 1;
}

.challenge__solution {
  flex: 1;
}

.challenge {
  display: flex;
}
</style>
