<template>
  <div id="app">
    <ul id="nav" class="nav justify-content-end">
      <li class="nav-item">
        <router-link to="/">Home</router-link>
      </li>
      <li class="nav-item" v-if="authenticated">
        <router-link to="/about">About</router-link>
      </li>
    </ul>
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
                authenticated: false,
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
                    .then(() => this.authenticated = true);
            if(!this.authenticated) {
                console.log("not auth");
            }
        },
        methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
            logout() {
                this.authenticated = false;
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
#nav {
  background-color: #2d9d5f;
  padding: 15px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .nav-item {
    margin: 0 10px;
  }
}
</style>
