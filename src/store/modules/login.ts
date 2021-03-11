import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators";
import { getToken, getUserName, setToken, removeToken, setUserName } from "@/utils/cookies";
import { login, getAppList } from "@/api/users";
import store from "@/store";
import md5 from "js-md5";
import router from "@/router/index";
export interface LoginState {
  token: string;
  userName: string;
}

@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements LoginState {
  public token = getToken() || "";
  public userName = getUserName() || "";
  public appList = [];

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }
  @Mutation
  private SET_USERNAME(userName: string) {
    this.userName = userName;
  }
  @Mutation
  private SET_APPLIST(appList: any) {
    this.appList = appList;
  }

  @Action
  public ResetToken() {
    removeToken();
    this.SET_TOKEN("");
  }
  // 登录
  @Action
  public async Login(userInfo: { account: string; password: string }) {
    const userName = userInfo.account.trim();
    const passWord = md5(userInfo.password);
    await login({ userName, passWord }).then(() => {
      setToken(passWord);
      setUserName(userName);
      this.SET_USERNAME(userName);
      this.SET_TOKEN(passWord);
      router.push({ name: "Main" });
    });
  }
  // 登出
  @Action
  public async LogOut() {
    if (this.token === "") {
      throw Error("LogOut: token is undefined!");
    }
    removeToken();
    this.SET_TOKEN("");
    router.push({ name: "Login" });
  }
  // 获取游戏列表
  @Action
  public async getAppList() {
    if (!this.appList.length) {
      getAppList().then((data: any) => {
        this.SET_APPLIST(data.state)
      });
    } 
  }
}

export const LoginModule = getModule(User);
