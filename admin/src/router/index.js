import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue' 
import CategoryList from '../views/CategoryList.vue' 

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {path: 'categories/create', component: CategoryEdit},
      {path: 'categories/list', component: CategoryList},
      {path: 'categories/edit/:id', component: CategoryEdit, props: true}
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
