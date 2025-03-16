import { SystemInfo } from "@/config/setting";
import { useMenuStore } from "@/store/modules/menu";
import { useSettingStore } from "@/store/modules/setting";
import { useUserStore } from "@/store/modules/user";
import { useWorktabStore } from "@/store/modules/worktab";
import Home from "@views/index/index.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import type { App } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// 顶部进度条配置
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 600, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  parent: "body", //指定进度条的父容器
});

// 路由项扩展
export type AppRouteRecordRaw = RouteRecordRaw & {
  hidden?: boolean;
};

// 首页
export const HOME_PAGE = "/dashboard";

// 不需要权限的路由
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/dashboard",
    component: Home,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import(`@views/dashboard/console/index.vue`),
        meta: {
          title: "首页",
          title_en: "Home",
          icon: "\ue6e6",
          keepAlive: false,
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@views/login/index.vue"),
    meta: {
      title: "登录",
      isHideTab: true,
    },
  },
  {
    path: "/register",
    component: () => import("@views/register/index.vue"),
    meta: {
      title: "注册",
      isHideTab: true,
      noLogin: true,
    },
  },
  {
    path: "/forget-password",
    component: () => import("@views/forget-password/index.vue"),
    meta: {
      title: "忘记密码",
      isHideTab: true,
      noLogin: true,
    },
  },
  {
    path: "/exception",
    component: Home,
    meta: {
      title: "异常页面",
      title_en: "Exception",
    },
    children: [
      {
        path: "403",
        component: () => import("@/views/exception/403.vue"),
        meta: {
          title: "403",
          title_en: "403",
        },
      },
      {
        path: "404",
        component: () => import("@views/exception/404.vue"),
        meta: {
          title: "404",
          title_en: "404",
        },
      },
      {
        path: "500",
        component: () => import("@views/exception/500.vue"),
        meta: {
          title: "500",
          title_en: "500",
        },
      },
    ],
  },
] as AppRouteRecordRaw[];

// 1. 先定义所有路由，不再动态生成
const allRoutes = [
  {
    path: "/dashboard",
    component: Home,
    meta: {
      title: "首页",
      title_en: "Home",
      icon: "\ue6e6",
      keepAlive: false,
    },
  },
  {
    path: "/approval",
    component: Home,
    name: "Approval",
    meta: {
      title: "通知看板",
    },
    children: [
      {
        path: "/approval/template",
        name: "Template",
        component: () => import("@views/approval/approval-template/index.vue"),
        meta: {
          title: "消息通知",
        },
      },
      {
        path: "/approval/workflow",
        name: "Workflow",
        component: () => import("@views/approval/workflow/index.vue"),
        meta: {
          title: "我的待办",
        },
      },
      {
        path: "/approval/list",
        name: "ApprovalList",
        component: () => import("@views/approval/approval-list/index.vue"),
        meta: {
          title: "我处理的",
        },
      },
      {
        path: "/approval/myCc",
        name: "ApprovalMyCc",
        component: () => import("@views/approval/myCc/index.vue"),
        meta: {
          title: "抄送我的",
        },
      },
    ],
  },
  {
    path: "/HSBind",
    component: Home,
    meta: {
      title: "家校绑定",
      icon: "\ue6e6",
      keepAlive: false,
    },
  },
  {
    path: "/studentManage",
    component: Home,
    meta: {
      title: "学生管理",
      icon: "\ue6e6",
      keepAlive: false,
    },
  },
  {
    path: "/system",
    component: Home,
    name: "System",
    meta: {
      title: "系统管理",
    },
    children: [
      {
        path: "/system/user",
        name: "User",
        component: () => import("@views/system/user.vue"),
        meta: {
          title: "用户管理",
        },
      },
      {
        path: "/system/role",
        name: "Role",
        component: () => import("@views/system/role.vue"),
        meta: {
          title: "角色管理",
        },
      },
      {
        path: "/system/menu",
        name: "Menu",
        component: () => import("@views/system/menu.vue"),
        meta: {
          title: "菜单管理",
        },
      },
      {
        path: "/system/teaching",
        name: "Teaching",
        component: () => import("@views/system/teaching.vue"),
        meta: {
          title: "教学管理",
        },
      },
    ],
  },
  {
    path: "/member",
    component: Home,
    name: "Member",
    meta: {
      title: "会员中心",
    },
    children: [
      {
        path: "/member/card",
        name: "MemberCard",
        component: () => import("@views/member/member-card/index.vue"),
        meta: {
          title: "会员卡管理",
        },
        roles: ["admin", "company"],
      },
      {
        path: "/member/manage",
        name: "MemberManage",
        component: () => import("@views/member/member-manage/index.vue"),
        meta: {
          title: "会员管理",
        },
        roles: ["admin", "company"],
      },
      {
        path: "/member/course",
        name: "Course",
        component: () => import("@views/member/course.vue"),
        meta: {
          title: "课程管理",
        },
        roles: ["admin", "company"],
      },
    ],
  },
  {
    path: "/salary",
    component: Home,
    name: "SalaryManage",
    meta: {
      title: "薪资管理",
    },
    children: [
      {
        path: "/salary/list",
        name: "SalaryList",
        component: () => import("@views/salary-manage/index.vue"),
        meta: {
          title: "薪资列表",
        },
      },
    ],
  },
  {
    path: "/revenue",
    component: Home,
    name: "Revenue",
    meta: {
      title: "营收中心",
    },
    children: [
      {
        path: "/revenue/manage",
        name: "RevenueManage",
        component: () => import("@views/revenue/index.vue"),
        meta: {
          title: "营收管理",
        },
        roles: ["admin", "company"],
      },
    ],
  },
]

// 2. 创建路由实例时注册所有路由
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...routes, // 公共路由
    ...allRoutes    // 所有权限路由
  ]
})

// 3. 在路由守卫中根据用户角色过滤路由
router.beforeEach(async (to, from, next) => {
  if (useSettingStore().showNprogress) {
    NProgress.start();
  }

  const userStore = useUserStore();
  const worktabStore = useWorktabStore();
  const { meta, path, params, query } = to;
  const { title, title_en: titleEn, isHideTab, noLogin } = meta;

  console.log("路由守卫触发:", to.path);
  console.log("登录状态:", userStore.isLogin);
  // 修改判断逻辑：如果是登录页或不需要登录的页面，直接通过
  if (path === "/login" || noLogin) {
    next();
    return;
  }

  // 未登录状态跳转到登录页
  if (!userStore.isLogin && path !== "/login") {
    userStore.logOut();
    next("/login");
    return;
  }

  // const userRole = userStore.userInfo?.role

  // if (!userRole) {
  //   next('/login')
  //   return
  // }

  // // 检查用户是否有权限访问该路由
  // if (to.meta.roles && !to.meta.roles.includes(userRole)) {
  //   next('/exception/403') // 无权限
  //   return
  // }

  if (to.matched.length === 0) {
    next("/exception/404");
    return;
  }

  if (!isHideTab) {
    worktabStore.router({
      title: title as string,
      title_en: titleEn as string,
      path,
      params,
      query,
    });
  }

  if (title) {
    document.title = `${title} - ${SystemInfo.name}`;
  }

  next();
});

router.afterEach(() => {
  if (useSettingStore().showNprogress) {
    NProgress.done();
  }
});

// 4. 菜单显示过滤
const filterMenuByRole = (menus: any, role: any) => {
  return menus.filter((menu: any) => {
    if (menu.meta?.roles && !menu.meta.roles.includes(role)) {
      return false
    }

    if (menu.children) {
      menu.children = filterMenuByRole(menu.children, role)
    }

    return true
  })
}

// 获取菜单时过滤
async function getMenus() {
  const userStore = useUserStore()
  const userRole = userStore.userInfo?.role

  // 过滤掉用户无权访问的菜单
  const filteredMenus = filterMenuByRole(allRoutes, userRole)
  useMenuStore().setMenuList(filteredMenus)
}

export function initRouter(app: App<Element>) {
  app.use(router);
}
