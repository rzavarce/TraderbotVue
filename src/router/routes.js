

import store from '../store'

const ifAuthenticated = (to, from, next) => {
  if (store.state.isAuthenticated) {
    next();
    return
  }
  next('/')
}

const logout = (to, from, next) => {
  store.state.isAuthenticated = false
}

const routes = [

  {
    path: '/',
    name: 'login',
    // beforeEnter: logout,
    component: () => import('pages/Login.vue')
  },
  {
    path: '/Register',
    component: () => import('pages/RegisterUser.vue')
  },


  {
    path: '/Dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '/Dashboard', name:"dashboard", component: () => import('pages/Dashboard.vue'), beforeEnter: ifAuthenticated,},
      {path: '/UserProfile', component: () => import('pages/UserProfile.vue'), beforeEnter: ifAuthenticated,},
      {path: '/PageTest', component: () => import('pages/PageTest.vue'), beforeEnter: ifAuthenticated,},

      {path: '/Configs/General', name:"config_general", component: () => import('pages/configs/General.vue'), beforeEnter: ifAuthenticated,},
      {path: '/Configs/Currencies', name:"config_currencies", component: () => import('pages/configs/Currencies.vue'), beforeEnter: ifAuthenticated,},
      {path: '/Configs/Exchanges', name:"config_exchanges", component: () => import('pages/configs/Exchanges.vue'), beforeEnter: ifAuthenticated,},
      {path: '/Configs/Markets', name:"config_markets", component: () => import('pages/configs/Markets.vue'), beforeEnter: ifAuthenticated,},


      // {path: '/Strategies', name:"strategies_index", component: () => import('pages/strategies/Index.vue'), beforeEnter: ifAuthenticated,},
      // {path: '/Strategies/List', name:"strategies_list", component: () => import('pages/strategies/List.vue'), beforeEnter: ifAuthenticated,},
      {path: '/Strategies/BTC/List', name:"strategies_btc_list", component: () => import('pages/strategies/BTC/List.vue'), beforeEnter: ifAuthenticated,},
      {path: '/Strategies/BTC/Add', name:"strategies_btc_add", component: () => import('pages/strategies/BTC/Add.vue'), beforeEnter: ifAuthenticated,},
      {path: '/Strategies/BTC/Edit/:id', name:"strategies_btc_edit", component: () => import('pages/strategies/BTC/Edit.vue'), beforeEnter: ifAuthenticated,},

      {path: '/Strategies/ETH/List', name:"strategies_eth_list", component: () => import('pages/strategies/ETH/List.vue'), beforeEnter: ifAuthenticated,},
      {path: '/Strategies/ETH/Add', name:"strategies_eth_add", component: () => import('pages/strategies/ETH/Add.vue'), beforeEnter: ifAuthenticated,},
      {path: '/Strategies/ETH/Edit/:id', name:"strategies_eth_edit", component: () => import('pages/strategies/ETH/Edit.vue'), beforeEnter: ifAuthenticated,},
      
      // {path: '/Strategies/Edit', name:"strategies_edit", component: () => import('pages/strategies/Edit.vue'), beforeEnter: ifAuthenticated,},

      {path: '/Portfolios/List', name:"portfolios_list", component: () => import('pages/portfolios/List.vue'), beforeEnter: ifAuthenticated,},
      {path: '/Portfolios/Add', name:"portfolios_add", component: () => import('pages/portfolios/Add.vue'), beforeEnter: ifAuthenticated,},
      {path: '/Portfolios/Edit/:id', name:"portfolios_edit", component: () => import('pages/portfolios/Edit.vue'), beforeEnter: ifAuthenticated,},
      {path: '/Portfolios/Accounts', name:"portfolios_accounts", component: () => import('pages/portfolios/Accounts.vue'), beforeEnter: ifAuthenticated,},


      {path: '/Reports/Operations', name:"report_operations", component: () => import('pages/reports/Operations.vue'),},
      {path: '/Reports/Balances', name:"report_balances", component: () => import('pages/reports/Balances.vue'),},


      {path: '/Dashboard2', component: () => import('pages/Dashboard2.vue')},
      {path: '/Profile', component: () => import('pages/UserProfile.vue')},

      // Not completed yet
      // {path: '/Taskboard', component: () => import('pages/TaskBoard.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  },
  {
    path: '/Mail',
    component: () => import('layouts/Mail.vue')
  },
  {
    path: '/Maintenance',
    component: () => import('pages/Maintenance.vue')
  },

  {
    path: '/Login-1',
    component: () => import('pages/Login-1.vue')
  },
  {
    path: '/Lock',
    component: () => import('pages/LockScreen.vue')
  },
  {
    path: '/Lock-2',
    component: () => import('pages/LockScreen-2.vue')
  }
]

export default routes
