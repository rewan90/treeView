import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddFolder from '../views/AddFolder.vue'
import EditFolder from '../views/EditFolder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/AddFolder/:FolderId',
      name: 'AddFolder',
      component: AddFolder
    },
     {
      path: '/Edit/:FolderId',
      name: 'EditFolder',
      component: EditFolder
    },
  
  ]
})

export default router
