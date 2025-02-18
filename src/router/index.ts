import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/Login/LoginPage.vue';
import DashboardPage from '../pages/Dashboard/DashboardPage.vue';

// TODO: Implement Proper Routing Format

const routes = [
  { path: '/', name: 'login', component: LoginPage },
  { path: '/dashboard', name: 'dashboard', component: DashboardPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
