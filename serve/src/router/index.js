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

//测试效果专用

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
    component: Admin
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
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
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
    component: Order
  },
  {
    path: '/orderContent',
    component: OrderContent
  },
  {
    path: '/exchange',
    component: Exchange
  },
  {
    path: '/echars',
    component: Echars
  },
  {
    path: '/test',
    component: Test
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
