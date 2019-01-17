<!--
View to display a single challenge to solve.
-->

<template>
  <div class="challenge">
    <div class="challenge-top">
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
          class="code-editor"
        />
        <button class="button button--submit" v-on:click="submit()">Soumettre</button>
        <div>{{ bannerContent }}</div>
      </div>
    </div>
    <div class="challenge-bottom">
      <Tests
        class="challenge__tests"
        v-bind:tests="tests"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CodeEditor from "@/components/CodeEditor.vue";
import MarkdownRender from "@/components/MarkdownRender.vue";
import Tests from "@/components/Tests.vue";
import axios from "axios";
import { Challenge } from "@/models/Challenge";
import { ChallengeTest } from "@/models/ChallengeTest";
import { Language } from "@/models/Language";
import { Code } from "@/models/Code";
import { TestResult } from '@/models/TestResult';

@Component({
  components: {
    MarkdownRender,
    CodeEditor,
    Tests
  }
})
export default class ChallengeView extends Vue {
  protected challenge: Challenge = new Challenge();
  private challengeId: string = "";
  private bannerContent: string = "";
  private solution: string = "";
  private tests: Array<ChallengeTest> = [];
  private codes: Array<Code> = [];
  private languages: Array<Language> = [];
  private selectedLanguage: Language = new Language();

  mounted() {
    this.challengeId = this.$route.params["id"];

    axios
      .all([
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/challenges/${this.challengeId}`, { withCredentials: true }),
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/codes?challenge=${this.challengeId}`, { withCredentials: true }),
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/languages`, { withCredentials: true }),
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/challenges/${this.challengeId}/tests`, { withCredentials: true })
      ])
      .then(axios.spread((challenge, codes, languages, tests) => {
        this.challenge = challenge.data;
        this.codes = codes.data;
        this.languages = languages.data;
        this.tests = tests.data.map((t) => new ChallengeTest(t));

        // Filter languages
        const { whitelist, blacklist } = this.challenge.languagesAllowed;
        if (whitelist && whitelist.length) {
          this.languages = this.languages.filter((l) => whitelist.includes(l.id));
        } else if (blacklist && blacklist.length) {
          this.languages = this.languages.filter((l) => !blacklist.includes(l.id));
        }

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
    this.save();
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
        const testResults: Array<TestResult> = response.data.tests;

        for (const test of this.tests) {
          const a = testResults.find((t) => t.test === test.id);
          this.$set(test, 'isSuccess', a!.isSuccess);
        }

        const challengeSolved = testResults.every(test => test.isSuccess)
        if (challengeSolved) {
          this.displayBanner("Défi reussi!")
        } else {
          this.displayBanner("Mauvaise réponse. Essayez de nouveau.")
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
        this.displayBanner("Code sauvegardé.")
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

<style lang="less">

.challenge__description {
  margin-right: 20px;
  text-align: left;
  flex: 3;
}

.challenge__solution {
  flex: 2;
}

.challenge__tests {
  margin-top: 20px;
}

.challenge-bottom {
  //display: flex;
}

.challenge-top {
  display: flex;
}

.challenge {
  color: white;
  margin-top: 1em;
}

body {
  background: #202020;
}

.button {
  width:100%;
  border: 0;
  padding: 0.4em 0.8em;
  color: white;
  font-weight: bold;
  margin-right: 1em;
  cursor: pointer;
  border-radius: 3px;

  &--submit {
    background: #2d9d5f;
    &:hover{
      background: lighten(#2d9d5f, 5);
    }
  }

  &:hover {
  }
}

.code-editor {
  margin-bottom: 1em;
  display: block;
}

.header {
  background-color: #35362f;
  display: flex;
  align-items: center;
  height: 3em;
}
</style>
