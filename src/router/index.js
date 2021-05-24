import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
 
export const routerPath = [
  {
    path: 'menu',
    component: () => import('../pages/menu/menu'),
    meta: {
      title: "菜单管理"
    }
  },
  {
    path: 'role',
    component: () => import('../pages/role/role'),
    meta: {
      title: "角色管理"
    }
  },
  {
    path: 'manage',
    component: () => import('../pages/manage/manage'),
    meta: {
      title: "管理员管理"
    }
  },
  {
    path: 'cate',
    component: () => import('../pages/cate/cate'),
    meta: {
      title: "商品分类"
    }
  },
  {
    path: 'specs',
    component: () => import('../pages/specs/specs'),
    meta: {
      title: "商品规格"
    }
  },
  {
    path: 'goods',
    component: () => import('../pages/goods/goods'),
    meta: {
      title: "商品管理"
    }
  },
  {
    path: 'banner',
    component: () => import('../pages/banner/banner'),
    meta: {
      title: "轮播图管理"
    }
  },
  {
    path: 'seckill',
    component: () => import('../pages/seckill/seckill'),
    meta: {
      title: "秒杀活动"
    }
  },
  {
    path: 'member',
    component: () => import('../pages/member/member'),
    meta: {
      title: "会员管理"
    }
  },
]
const routes = [{
    path: "/login",
    component: () => import('../pages/login/login')
  },
  {
    path: "/index",
    component: () => import('../pages/index/index'),
    children: [{
        path: 'home',
        component: () => import('../pages/home/home')
      },
      ...routerPath,
      {
        path: '',
        redirect: 'home'
      }
    ]
  },
  {
    path: "*",
    redirect: "/login"
  },
]

const router = new VueRouter({
  routes
})

export default router