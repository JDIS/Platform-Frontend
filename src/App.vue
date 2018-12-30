<template>
  <div id="app">
    <div class="container-fluid" id="nav-container">
      <div class="row align-items-center" id="nav">
        <div class="col-8">
          <img alt="JDIS logo" src="./assets/jdis.png" style="height: 30px"></img>
          <span style="margin: 0 10px">Sélection CSGames 2019</span>
        </div>
        <div class="col-4">
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <router-link to="/">Home</router-link>
            </li>
            <li class="nav-item" v-if="authenticated">
              <router-link to="/leaderboard">Classement</router-link>
            </li>
            <li class="nav-item" v-if="authenticated">
              <router-link to="/challenges">Liste des défis</router-link>
            </li>
            <li class="nav-item" v-if="!authenticated">
              <a href="#" v-on:click="login">Connexion</a>
            </li>
            <li class="nav-item" v-if="authenticated">
              <a href="#" v-on:click="logout">Déconnexion</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="main-container" class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
    import * as axios from "axios";

    export default {
        name: 'App',
        data() {
            return {
                authenticated: window.localStorage.getItem("authenticated"),
            }
        },
        mounted() {
            console.log(process.env);
            axios.get(process.env.VUE_APP_BACKEND_URL + '/users/me')
                    .then(response => console.log(response))
                    .catch((error) => {
                      if(error.response.status === 401) {
                          //window.location.replace(process.env.VUE_APP_BACKEND_URL + "/auth/cas");
                      }})
                    .then(() => {
                      //this.setAuthenticated(true)
                    });
            if(!this.authenticated) {
                console.log('not auth');
            }
        },
        methods: {
          setAuthenticated(status) {
            window.localStorage.setItem("authenticated", status);
            this.authenticated = status;
          },
          logout() {
            this.setAuthenticated(false);
          },
          login() {
            this.setAuthenticated(true);
          }
        }
    }
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  #main-container {
    max-width: 1600px;
  }
}
#nav-container {
  #nav {
    padding: 15px;
    max-width: 1600px;
  }
  color: aliceblue;
  background-color: #2d9d5f;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      text-decoration: underline;
      color: white;
    }
  }
  .nav-item {
    margin: 0 10px;
  }
}
</style>
