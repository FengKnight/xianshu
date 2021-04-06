import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "views/home/Home";
import Login from "views/login/Login";
import Register from "views/register/Register";
import Admin from "views/admin/Admin";
import Category from "views/category/Category";
import Detail from "views/detail/Detail";
import ExchangeDetail from "views/detail/ExchangeDetail";

import Cart from "views/cart/Cart";
import Profile from "views/profile/Profile";
import SelectBooks from "views/selectBooks/SelectBooks";
import Messages from "views/messages/Messages";
import Order from "views/order/Order";
import OrderContent from "views/order/OrderContent";
import Exchange from "views/exchange/Exchange";
import Echars from "@/views/admin/childComps/Echars";
import Test from "@/views/Test";
import Test1 from "@/views/Test";
import Activity from "@/views/activity/Activity";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'

  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/admin',
    component: Admin,
    meta:{requireAuth:true}
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/exchangeDetail',
    component: ExchangeDetail
  },
  {
    path: '/cart',
    component: Cart,
    meta:{requireAuth:true}
  },
  {
    path: '/profile',
    component: Profile,
    meta:{requireAuth:true}
  },
  {
    path: '/select',
    component: SelectBooks
  },
  {
    path: '/messages',
    component: Messages
  },
  {
    path: '/order',
    component: Order,
    meta:{requireAuth:true}
  },
  {
    path: '/orderContent',
    component: OrderContent,
    meta:{requireAuth:true}
  },
  {
    path: '/exchange',
    component: Exchange
  },
  {
    path: '/echars',
    component: Echars,
    meta:{requireAuth:true}
  },
  {
    path: '/test',
    component: Test,
    meta:{requireAuth:true}
  },
  {
    path: '/test1',
    component: Test1,
    meta:{requireAuth:true}
  },
  {
    path: '/activity',
    component: Activity,
    meta:{requireAuth:true}
  }
]





const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


//路由守卫
router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if(sessionStorage.getItem('username')){ //判断本地是否存在access_token


      next();
    }else {
      alert('未登录，请先登陆或注册再查看此页面')
      next({

        path:'/login'
      })
    }
  }
  else {
    next();
  }

});

export default router