import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * meta : {
    title: 'title'               the title show in submenu and breadcrumb (recommend set)
  }
 **/
export const constantRouterMap = [
    {path: '/', redirect: '/login', hidden: true},
    {path: '/login', component: _import('login/index'), hidden: true},
    {path: '/signUp', component: _import('login/signUp'), hidden: true},
    {path: '/addBrand', component: _import('brandManage/addBrand'), hidden: true, name: 'registerAddBrand'},
    {path: '/404', component: _import('404'), hidden: true},

    {
        path: '/dashboard',
        component: Layout,
        redirect: '/dashboard/index',
        hidden: true,
        children: [
            {
                path: 'index',
                component: _import('dashboard/index'),
                meta: {title: '首页'}
            }
        ]
    },

    {
        path: '/goodsManage',
        component: Layout,
        name: '商品管理',
        redirect: '/goodsManage/GoodsList',
        meta: {title: '商品管理'},
        children: [
            {
                path: 'GoodsList',
                component: _import('goodsManage/GoodsList'),
                meta: {title: '商品列表'}
            },
            {
                path: 'upload',
                component: _import('goodsManage/uploadGoods/upload'),
                meta: {title: '上传商品'},
                hidden: true
            },
            {
                path: 'edit',
                name: 'edit',
                component: _import('goodsManage/uploadGoods/upload'),
                meta: {title: '商品编辑'},
                hidden: true
            },
            {
                path: 'fodderManage',
                component: _import('goodsManage/fodderList'),
                meta: {title: '素材管理'},
                hidden: true
            },
            {
                path: 'addFodder',
                component: _import('goodsManage/addFodder'),
                meta: {title: '素材添加'},
                hidden: true
            },
            {
                path: 'editFodder',
                component: _import('goodsManage/addFodder'),
                meta: {title: '素材编辑'},
                hidden: true,
                name: 'editFodder'
            },
            {
                path: 'fodderDetails',
                component: _import('goodsManage/fodderDetails'),
                meta: {title: '素材详情'},
                hidden: true,
                name: 'fodderDetails'
            },

        ]
    },
    {
        path: '/orderManage',
        component: Layout,
        redirect: '/orderManage/index',
        meta: {title: '订单管理'},
        name: '订单管理',
        children: [
            {
                path: 'index',
                component: _import('orderManage/index'),
                meta: {title: '所有订单'}
            },
            {
                path: 'send',
                component: _import('orderManage/index'),
                meta: {title: '已发货订单'}
            },
            {
                path: 'success',
                component: _import('orderManage/index'),
                meta: {title: '已完成订单'}
            }
        ]
    },
    {
        path: '/brandManage',
        component: Layout,
        redirect: '/brandManage/brandList',
        meta: {title: '品牌管理'},
        children: [
            {
                path: 'brandList',
                component: _import('brandManage/brandList'),
                meta: {title: '品牌列表'}
            },
            {
                path: 'addBrand',
                component: _import('brandManage/addBrand'),
                meta: {title: '添加品牌'},
                hidden: true
            },
            {
                path: 'editBrand',
                component: _import('brandManage/addBrand'),
                meta: {title: '编辑品牌'},
                hidden: true,
                name: 'editBrand'
            }
        ]
    },
    {
        path: '/storeManage',
        component: Layout,
        redirect: '/storeManage/index',
        meta: {title: '店铺管理'},
        name: '店铺管理',
        children: [
            {
                path: 'index',
                component: _import('storeManage/applyForActive'),
                meta: {title: '平台活动申请'}
            },
            {
                path: 'goodsList',
                component: _import('storeManage/GoodsList'),
                meta: {title: '已申请商品列表'},
                hidden: true
            },
            {
                path: 'applyGoods',
                component: _import('storeManage/addGoods'),
                meta: {title: '添加商品到活动'},
                hidden: true
            },
            {
                path: 'showDetails',
                component: _import('storeManage/addGoods'),
                meta: {title: '查看报名详情'},
                hidden: true,
                name: 'showDetails'
            }
        ]
    },
    {
        path: '/couponManage',
        component: Layout,
        redirect: '/couponManage/index',
        meta: {title: '商家优惠券'},
        name: '商家优惠券',
        children: [
            {
                path: 'index',
                component: _import('couponManage/couponManage'),
                meta: {title: '优惠券管理'}
            },
            {
                path: 'new',
                component: _import('couponManage/editCoupon'),
                meta: {title: '新建优惠券'},
                hidden: true
            },
            {
                path: 'edit',
                component: _import('couponManage/editCoupon'),
                meta: {title: '优惠券编辑'},
                name: 'editCoupon',
                hidden: true
            }
        ]
    },
    {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})

