const Page404 = () => import("pages/extras/Error404.vue");
const LoginPage = () => import("pages/main/auth/Login.vue");
const IndexPage = () => import("pages/Index.vue");
const routes = [
  {
    path: "/",
    component: () => import("layouts/Main.vue"),
    children: [{ path: "/", component: IndexPage }]
  },
  {
    path: "/login",
    name: "Login Page",
    component: LoginPage,
    meta: {
      public: true, // Allow access to even if not logged in
      onlyWhenLoggedOut: true
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: Page404
  }
];

export default routes;
