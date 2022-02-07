import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "@/views/Home.vue";
import Blog from "@/views/Blog.vue";
import BlogView from "@/views/BlogView.vue";
import AdminLogin from "../views/AdminLogin.vue";
import Admin from "../views/Admin.vue";
import AdminEditPost from "../views/AdminEditPost.vue";
import AdminCreatePost from "../views/AdminCreatePost.vue";
import StorageLocal from "@/services/localStorage";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta:{
            title:"Главная"
        },
    },
    {
        path: "/posts",
        name: "posts",
        component: Blog,
        meta:{
            title:"Блог"
        }
    },
    {
        path: "/post/:id",
        name: "post",
        component: BlogView,
        meta:{
            title:"Статья"
        }
    },
    {
        path: "/admin/login",
        name: "login",
        component: AdminLogin,
        meta:{
            title:"Авторизация"
        }
    },
    {
        path: "/admin",
        name: "admin",
        component: Admin,
        meta:{
            title:"Администрирование"
        }
    },
    {
        path: "/admin/post/:id",
        name: "editPost",
        component: AdminEditPost,
        meta:{
            title:"Редактирование статьи"
        }
    },
    {
        path: "/admin/createPost",
        name: "createPost",
        component: AdminCreatePost,
        meta:{
            title:"Создание статьи"
        },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.name == "home" || to.name == "posts" || to.name == "post" || to.name == "login") {
        // console.log("norm");
        next();
    } else if (!StorageLocal.getData("token")) {
        // console.log("not auth");
        next({ name: "login" });
    }else if (StorageLocal.getData("token")){     
        next();
    }
});
export default router;
