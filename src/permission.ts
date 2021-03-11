import router from "./router";
import { Route } from "vue-router";
import { LoginModule } from "@/store/modules/login";

// 是否登录判断
router.beforeEach(async (to: Route, form: Route, next: any) => {
  if (LoginModule.token) {
    LoginModule.getAppList();
    if (to.path === "/login") {
      next(`/main`);
    } else {
      next();
    }
  } else {
    //如果当前页是登录页，就直接next(),否则退回到登录页
    if (to.path === "/login") {
      next();
    } else {
      LoginModule.ResetToken();
      next(`/login?redirect=${to.path}`);
    }
  }
})


