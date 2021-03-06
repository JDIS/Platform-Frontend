import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/challenges' },
    {
      path: '/logout',
      name: 'logout',
      component: () => import(/* webpackChunkName: "about" */ './views/Logout.vue'),
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Leaderboard.vue'),
    },
    {
      path: '/challenges',
      name: 'challenges',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Challenges.vue'),
    },
    {
      path: '/challenge/:id',
      name: 'challenge',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Challenge.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "about" */ './views/Admin.vue'),
    }
  ],
});
