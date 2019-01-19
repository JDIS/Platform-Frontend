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
        <div class="banner"
          v-if="bannerContent"
          v-bind:class="{'banner--success': bannerSuccess, 'banner--error': !bannerSuccess}">
          {{ bannerContent }}
        </div>
      </div>
    </div>
    <div class="challenge-bottom">
      <Tests
        class="challenge__tests"
        @selectedTest="onSelectedTestChange"
        v-bind:tests="tests"
        v-bind:percentage="percentage"
        v-bind:points="points"
      />
      <Console
        class="challenge-console"
        v-bind:test="selectedTest"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CodeEditor from "@/components/CodeEditor.vue";
import MarkdownRender from "@/components/MarkdownRender.vue";
import Tests from "@/components/Tests.vue";
import Console from "@/components/Console.vue";
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
    Tests,
    Console
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
  private selectedTest: ChallengeTest = new ChallengeTest();
  private bannerSuccess: boolean = false;
  protected percentage: number = 0;
  protected points: number = 0;

  destroyed() {
    const app = document.getElementById("app");
    app!.style["background-color"] = "white";
  }

  mounted() {
    const app = document.getElementById("app");
    app!.style["background-color"] = "#202020";

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
        this.tests = tests.data.map((t) => {
          const test = new ChallengeTest();
          test.id = t.id;
          test.name = t.name;
          test.isPublic = t.isPublic;
          return test;
        });

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
        this.percentage = response.data.percent;
        this.points = response.data.points;

        for (const test of this.tests) {
          const result = testResults.find((t) => t.test === test.id);
          this.$set(test, 'isSuccess', result!.isSuccess);
          this.$set(test, 'isTimeout', result!.isTimeout);
          this.$set(test, 'isCompilationError', result!.isCompilationError);
          this.$set(test, 'output', result!.output);
          this.$set(test, 'error', result!.error);
        }

        let testsPassed = 0;
        testResults.forEach(test => {if(test.isSuccess) testsPassed += 1});
        if (testsPassed == testResults.length) {
          this.bannerSuccess = true;
          this.displayBanner("Défi reussi!");
        } else if(testsPassed > 0) {
          this.bannerSuccess = true;
          this.displayBanner(`${testsPassed}/${testResults.length} tests réussis!`);
        } else {
          this.bannerSuccess = false;
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
        this.bannerSuccess = true;
        this.displayBanner("Code sauvegardé.")
      });
    });
  }

  displayBanner(content) {
    this.bannerContent = content;
  }

  onSelectedTestChange(value) {
    this.selectedTest = this.tests.find((t) => t.id === value)!;
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
  margin-right: 20px;
  flex: 3;
}

.challenge-console {
  margin-top: 20px;
  flex: 2;
}

.challenge-bottom {
  display: flex;
}

.challenge-top {
  display: flex;
}

.challenge {
  color: white;
  margin-top: 1em;
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

.banner {
  margin-top: 1em;
  color: white;
  padding: 0.85em 1.7em;
  width:100%;
  text-align: center;
  font-weight: bold;
  border-radius: 3px;

  &--success {
    background-color: #048202; 
  }

  &--error {
    background-color: #e01008; 
  }
}
</style>
