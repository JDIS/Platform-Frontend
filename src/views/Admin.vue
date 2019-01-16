<template>
  <div class="admin-view">
    <h1 class="spaced">Administration</h1>
    <div class="spaced admin-panel">
      <h2 style="margin: 5px">Seed</h2>
      <div>
        <button v-on:click="seed('languages')" class="btn btn-secondary admin-button">Languages</button>
        <button v-on:click="seed('categories')" class="btn btn-secondary admin-button">Catégories</button>
        <button v-on:click="seed('challenges')" class="btn btn-secondary admin-button">Défis</button>
        <p v-if="status" class="admin-response"><strong>Status:</strong> {{status}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component({})
export default class Admin extends Vue {
  private status: string = "";

  async seed(type: string) {
    const response = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/${type}/seed`);

    if (response.status === 200) {
      this.status = 'OK';
    } else {
      this.status = 'Erreur...';
    }
  }
}
</script>
<style scoped lang="less">
.admin-view {
  background-color: #f5f5f5;
  border-radius: 5px;
  border: 1px solid #dedede;
  margin: 20px 0 20px;
  padding: 20px 0 20px;
}
.admin-panel {
  border: 1px solid red;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #dedede;
  padding: 10px;
}
.admin-button {
  margin: 5px
}
.admin-response {
  margin: 5px;
}
</style>
