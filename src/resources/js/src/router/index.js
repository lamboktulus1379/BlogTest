import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/blogs",
        // route level code-splitting
        // this generates a separate chunk (admin.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function() {
            return import(/* webpackChunkName: "admin" */ "../views/Blog.vue");
        }
    },
    {
        path: "/blogs/:id",
        // route level code-splitting
        // this generates a separate chunk (admin.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function() {
            return import(/* webpackChunkName: "admin" */ "../views/blog/Index.vue");
        }
    },
    {
        path: "/admin",
        // route level code-splitting
        // this generates a separate chunk (admin.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function() {
            return import(/* webpackChunkName: "admin" */ "../views/Admin.vue");
        },
        children: [
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: "/",
                component: function() {
                    return import(
                        /* webpackChunkName: "donate" */ "../views/admin/home/Index.vue"
                    );
                }
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: "blog",
                component: function() {
                    return import(
                        /* webpackChunkName: "donate" */ "../views/admin/blog/Index.vue"
                    );
                }
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (login.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function() {
            return import(/* webpackChunkName: "login" */ "../views/Login.vue");
        }
    }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router
