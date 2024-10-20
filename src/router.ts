
import {createRouter, createWebHistory} from "vue-router";


const routes = [
    {path: "/todo-cal", component: () => import("./components/ToDo/ToDoCal/ToDoCal.vue")},

    {path: "/", component: () => import("./components/Home.vue"), name: "Home"},

    {path: "/logout", component: () => import("./components/auth/Logout.vue"), name: "Logout"},

    {path: "/login", component: () => import("./components/auth/Login.vue"), name: "Login"},

    {
        path: "/card/:card_id(\\d+)",
        component: () => import("./components/CardInfo/CardInfo.vue"),
        props: true,
        name: "CardInfo",
    },
    {
        path: "/card",
        component: () => import("./components/CardPlay/CardPlay.vue"),
        name: "CardPlay",
    },
    {
        path: "/card/:card_id(\\d+)/edit",
        component: () => import("./components/CardInfo/Card/MdPreview.vue"),
        props: true,
        name: "CardEdit",

    },
    {
        path: "/try",
        component: () => import("./components/Try.vue"),
        name: "Try",
    },
    {
        path: "/board",
        component: () => import("./components/Board/Board.vue"),
        name: "Board",
        children: [
            {
                path: "",
                component: () => import("./components/Board/BoardCard.vue"),
                props: true,
                name: "Board",
            },
            {
                path: "timeline",
                component: () => import("./components/Board/TimeLine/TimeLine.vue"),
                props: true,
                name: "TimeLine",
            },
            {
                path: "todo",
                component: () => import("./components/Board/Todo.vue"),
                name: "ToDo",
            },
            {
                path: "calendar",
                component: () => import("./components/Board/Calendar/Calendar.vue"),
                name: "Calendar",
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title as string;
    } else {
        document.title = to.name as string;
    }
    next();
});

router.onError((error) => {
    console.error("路由错误:", error);
});

export default router;
