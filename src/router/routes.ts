export default [
  {
    path: '/',
    name: 'Login',
    component: () => import('../pages/login/LoginPage.vue'),
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../pages/dashboard/DashboardPage.vue'),
    meta: {
      title: 'Dashboard',
    },
  },
];
