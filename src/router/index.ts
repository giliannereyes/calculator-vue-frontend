import { createRouter, createWebHistory } from 'vue-router'
import ContactView from '@/views/ContactView.vue'
import CalculatorView from '@/views/CalculatorView.vue'
import SignInView from '@/views/SignInView.vue'
import CalculationHistoryView from '@/views/CalculationHistoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signin',
      component: SignInView,
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: CalculatorView,
    },
    {
      path: '/contactform',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/calculation-history',
      name: 'calculation-history',
      component: CalculationHistoryView,
    }
  ],
})

export default router
