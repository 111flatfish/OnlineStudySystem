export default {
    path:"/register",
    component:()=>import("../../view/register/index.vue"),
    children:[
        {
            path:"userregister",
            component:()=>import("../../view/userregister")
        },
        {
            path:"workerregister",
            component:()=>import("../../view/workerregister")
        },
        {
            path:"adminregister",
            component:()=>import("../../view/adminregister")
        },
    ]
}