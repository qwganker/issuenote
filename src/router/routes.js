const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    redirect: "/setting/repo",
    children: [
      {
        path: "blog/:label",
        component: () => import("src/pages/Blog.vue"),
      },
      {
        path: "new",
        component: () => import("src/pages/NewNote.vue"),
      },
      {
        path: "setting/label",
        component: () => import("src/pages/setting/Label.vue"),
      },
      {
        path: "setting/repo",
        component: () => import("src/pages/setting/Repo.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
