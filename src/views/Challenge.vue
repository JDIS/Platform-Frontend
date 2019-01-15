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
        @langUpdated="onLanguageChange"
        v-bind:solution="solution"
        :languages="languages"
        :selectedLanguage="selectedLanguage"
      />
      <div>
        <button v-on:click="save()">Enregistrer</button>
        <button v-on:click="submit()">Soumettre</button>
      </div>
      <div>{{ bannerContent }}</div>
      <div v-for="(testResult, index) in testResults">
        <div><b>Test {{ index + 1 }} ({{ testResult.isSuccess ? "réussi" : "échec"}})</b></div>
        <pre v-if='testResult.output != ""'>{{ testResult.output }}</pre>
        <pre v-if='testResult.error != ""'>{{ testResult.error }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CodeEditor from "@/components/CodeEditor.vue";
import MarkdownRender from "@/components/MarkdownRender.vue";
import axios from "axios";
import { Challenge } from "@/models/Challenge";
import { TestResult } from "@/models/TestResult";
import { Language } from "@/models/Language";
import { Code } from "@/models/Code";

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
  private testResults: Array<TestResult> = [];
  private codes: Array<Code> = [];
  private languages: Array<Language> = [];
  private selectedLanguage: Language = new Language();

  mounted() {
    this.challengeId = this.$route.params["id"];

    axios
      .all([
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/challenges/${this.challengeId}`, { withCredentials: true }),
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/codes?challenge=${this.challengeId}`, { withCredentials: true }),
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/languages`, { withCredentials: true })
      ])
      .then(axios.spread((challenge, codes, languages) => {
        this.challenge = challenge.data;
        this.codes = codes.data;
        this.languages = languages.data;

        // Find selected language
        const defaultLanguage = this.languages[0];
        if (this.codes.length) {
          this.selectedLanguage = this.languages.find((l) => l.id === this.codes[0].language) || defaultLanguage;
        } else {
          this.selectedLanguage = defaultLanguage;
        }
        
        // Display code if possible
        if (this.codes.length) {
          this.solution = this.codes[0].code;
        } else if (this.challenge.boilerplates.length) {
          const boilerplate = this.challenge.boilerplates.find((b) => b.language === this.selectedLanguage.id);
          this.solution =  (boilerplate && boilerplate.code) || "";
        }
      }))
      .catch(error => console.log("Error when fetching challenge: ", error));
  }

  submit() {
    axios({
      method: "POST",
      url: `${process.env.VUE_APP_BACKEND_URL}/codes/submit`,
      data: {
        challenge: this.challengeId,
        language: this.selectedLanguage.id,
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
        this.testResults = response.data.tests;

        const challengeSolved = this.testResults.every(test => test.isSuccess)
        if (challengeSolved) {
          this.displayBanner("Defi reussi!")
        } else {
          this.displayBanner("Mauvaise reponse. Essayez de nouveau.")
        }
      })
      .catch(error => console.log("Error when submitting solution: ", error));
  }

  save() {
    axios({
      method: "POST",
      url: `${process.env.VUE_APP_BACKEND_URL}/codes`,
      data: {
        challenge: this.challengeId,
        language: this.selectedLanguage.id,
        code: this.solution
      },
      headers: {
        withCredentials: true
      }
    }).then(response => {
      axios.get(
        `${process.env.VUE_APP_BACKEND_URL}/codes?challenge=${this.challengeId}`,
        { withCredentials: true }
      ).then(response => {
        this.codes = response.data;
      });
    });
  }

  displayBanner(content) {
    this.bannerContent = content;
  }

  onSolutionChange(value) {
    this.solution = value;
  }

  onLanguageChange(value) {
    this.selectedLanguage = value;

    // Update solution
    let solution = "";
    if (this.codes.length) {
      const code = this.codes.find((c) => c.language === this.selectedLanguage.id)
      solution = (code && code.code) || "";
    }
    if (!solution.length && this.challenge.boilerplates.length) {
      const boilerplate = this.challenge.boilerplates.find((b) => b.language === this.selectedLanguage.id);
      solution =  (boilerplate && boilerplate.code) || "";
    }
    this.solution = solution;
  }
}
</script>

<style scoped lang="less">
.challenge__description {
  margin-top: 27px;
  margin-right: 20px;
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
