<!--
Component that displays a list of challenges, grouped by category.
-->

<template>
  <div class="challenges">
    <div class="container-fluid">
      <div class="row">
        <div class="container-fluid">
          <div class="row align-items-center category" v-for="category of challenges">
            <div class="container-fluid category-header" @click="toggleCategory(category)">
              <h3>
                {{ categories[category.key] }} ({{ category.values.length }} challenges)
                <img class="bolt" />
                {{ categorySuccessCount(category) }}/{{ categoryTestCount(category) }}
              </h3>
              <img class="angle-right pull-right" :class="{rotate: category.isVisible}" />
            </div>
            <div class="container-fluid" :class="{hidden: !category.isVisible}">
              <div class="row challenge-preview" @click="openChallenge(challenge)" v-for="challenge of category.values">
                <div class="col-12">
                  <h2>{{ challenge.name }}</h2>
                </div>
                <div class="col-4">
                  <img class="bolt" />
                  {{ challengeTestSuccessCount(challenge) }}/{{ challenge.numberTests }}
                </div>
                <div class="col-4">
                  <strong><span v-if="challenge.isCodingChallenge">Correction automatique</span></strong>
                </div>
                <div class="col-4 pts">
                  <h4>{{ challenge.points }} point(s)</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
import {GroupedChallenges} from "@/models/GroupedChallenges";
import {Challenge} from "@/models/Challenge";
import {Category} from "@/models/Category";
import {Result} from "@/models/Result";

@Component
export default class ChallengesComponent extends Vue {
  @Prop() challenges!: GroupedChallenges[];
  @Prop() categories!: Category[];
  @Prop() results!: Result[];

  openChallenge(challenge: Challenge): void {
    this.$router.push(`/challenge/${challenge.id}`)
  }

  toggleCategory(category: GroupedChallenges) {
    category.isVisible = !category.isVisible;
  }

  challengeTestSuccessCount(challenge: Challenge): number {
    return this.results.reduce((acc, curr) => acc + (curr.challenge === challenge.id ? this.resultSuccessCount(curr) : 0) , 0);
  }

  resultSuccessCount(result: Result): number {
    return result.tests.reduce((acc, t) => acc + (t.isSuccess ? 1 : 0 ), 0);
  }

  categoryTestCount(category: GroupedChallenges): number {
    return category.values.reduce((acc, c) => acc + c.numberTests, 0);
  }

  categorySuccessCount(category: GroupedChallenges): number {
    return category.values.reduce((acc, c) => acc + this.challengeTestSuccessCount(c), 0);
  }
}
</script>
<style scoped lang="less">
.category {
  border: 1px solid red;
  margin: 10px 0 10px 0;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #dedede;
  padding: 0px 5px 0 10px;
}
.challenge-preview {
  background-color: #f5f5f5;
  border-radius: 5px;
  border: 1px solid #dedede;
  cursor: pointer;
  padding: 10px 0 0 0;
  margin: 10px 0 20px 0;
}

.category-header {
  cursor: pointer;
  padding: 20px 10px 15px 10px;
}

.bolt {
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQ3NS4wODRweCIgaGVpZ2h0PSI0NzUuMDg1cHgiIHZpZXdCb3g9IjAgMCA0NzUuMDg0IDQ3NS4wODUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ3NS4wODQgNDc1LjA4NTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTM2Mi4yOTYsMTI1LjA1NWMtMi44NTEtMi44NTMtNi4wOTItNC4yOC05LjcwNi00LjI4N2MtMC43NywwLTEuOTAyLDAuMTkzLTMuNDMyLDAuNTcyTDIzNi4xLDE0OS4zMTlMMjg0LjkxNywxNy4xMw0KCQljMC45NTEtMS45MDMsMS40MzEtMy42MTQsMS40MzEtNS4xMzljMC0zLjIzNC0xLjI0Mi02LjA0LTMuNzEzLTguNDJDMjgwLjE2MSwxLjE4OCwyNzcuMTE1LDAsMjczLjUwMSwwaC05My42NDUNCgkJYy0zLjA0NSwwLTUuNzA4LDAuODU1LTcuOTk0LDIuNTY4Yy0yLjI4NCwxLjcxNS0zLjgwOSwzLjkwNS00LjU2OCw2LjU2N2wtNTcuMzg2LDIzNS41NDZjLTAuOTUzLDQuNTY0LDAuMjg0LDguMjc3LDMuNzExLDExLjEzNQ0KCQljMi40NzMsMi4wOTksNS40MjEsMy4xMzksOC44NDgsMy4xMzljMS41MjQsMCwyLjY2Ni0wLjA4OSwzLjQyNy0wLjI4MWwxMTUuOTE0LTI4LjgzOGwtNTYuMjQ0LDIzMC42OTENCgkJYy0wLjc2LDMuMDQ1LTAuMzMzLDUuODk5LDEuMjg3LDguNTYyYzEuNjE5LDIuNjY5LDQuMDQ3LDQuNDc2LDcuMjgxLDUuNDI3YzEuOTAzLDAuMzc3LDMuMjM5LDAuNTY4LDMuOTk5LDAuNTY4DQoJCWM1LjUyLDAsOS41MTQtMi4zNzUsMTEuOTkxLTcuMTM2bDE1NC4xNzItMzMwLjMzMkMzNjYuMzg5LDEzMy4wNDksMzY1LjcyOCwxMjguODYsMzYyLjI5NiwxMjUuMDU1eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=');
  width: 20px;
  height: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
}

h3 {
  margin-bottom: 0;
  display: inline-block;
}

.angle-right {
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgaWQ9InN2ZzQ1NjgiCiAgIHZlcnNpb249IjEuMSIKICAgdmlld0JveD0iMCAwIDI1NiA1MTIiCiAgIHJvbGU9ImltZyIKICAgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWFuZ2xlLXJpZ2h0IGZhLXctOCIKICAgZGF0YS1pY29uPSJhbmdsZS1yaWdodCIKICAgZGF0YS1wcmVmaXg9ImZhcyIKICAgYXJpYS1oaWRkZW49InRydWUiPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTQ1NzQiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM0NTcyIiAvPgogIDxwYXRoCiAgICAgaWQ9InBhdGg0NTY2IgogICAgIGQ9Ik0yMjQuMyAyNzNsLTEzNiAxMzZjLTkuNCA5LjQtMjQuNiA5LjQtMzMuOSAwbC0yMi42LTIyLjZjLTkuNC05LjQtOS40LTI0LjYgMC0zMy45bDk2LjQtOTYuNC05Ni40LTk2LjRjLTkuNC05LjQtOS40LTI0LjYgMC0zMy45TDU0LjMgMTAzYzkuNC05LjQgMjQuNi05LjQgMzMuOSAwbDEzNiAxMzZjOS41IDkuNCA5LjUgMjQuNi4xIDM0eiIKICAgICBmaWxsPSJjdXJyZW50Q29sb3IiIC8+Cjwvc3ZnPgo=');
  width: 15px;
  height: 30px;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  float: right;
}
.rotate {
  transform: rotate(90deg);
}
.pts {
  text-align: right;
}
</style>
