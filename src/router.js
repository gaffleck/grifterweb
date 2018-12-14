import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/customers",
      name: "customers",
      component: () =>
        import(/* webpackChunkName: "customers" */ "./views/Customers.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/customer/:id",
      name: "customer",
      component: () =>
        import(/* webpackChunkName: "customerview" */ "./views/CustomerView.vue")
    },
    {
      path: "/equipment/:equipmentid",
      name: "equipment",
      component: () =>
        import(/* webpackChunkName: "equipmentview" */ "./views/EquipmentView.vue")
    }
  ]
});
