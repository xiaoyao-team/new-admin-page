import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import {
  getGroupList,
  createGroup,
  deleteGroup,
  copyGroup
} from "@/api/users";
import { LoginModule } from "@/store/modules/login";


export interface GroupListState {
  groupList: any;
  appList: any;
}

@Module({ dynamic: true, store, name: "groupList" })
class App extends VuexModule implements GroupListState {
  public groupList = [];
  public appList = [];

  @Mutation
  private SET_GROUPLIST(data: any) {
    this.groupList = data;
  }

  get appTypeList() {
    const areaFun = (item: any) => {
      switch (item) {
        case "kr":
          return "韩国";
        case "th":
          return "泰国";
        case "de":
          return "德国";
        case "fr":
          return "法国";
        case "vn":
          return "越南";
        case "tw":
          return "港台";
        default:
          return "未知";
      }
    };
    LoginModule.appList.map((item: any) => {
      switch (item.appId) {
        case 1058:
          item.area = "vn";
          break;
        case 10002:
          item.area = "vn";
          break;
        case 10052:
          item.area = "th";
          break;
        case 10062:
          item.area = "vn";
          break;
        case 10086:
          item.area = "tw";
          break;
        case 10091:
          item.area = "de";
          break;
        case 10092:
          item.area = "fr";
          break;
        case 10096:
          item.area = "kr";
          break;
        default:
          break;
      }
    });
    return [...new Set(LoginModule.appList.map((item: any) => item.area))].map(
      (item: any) => {
        return { area: item, zhName: areaFun(item) };
      }
    );
  }

  @Action
  public async getGroupList() {
    await getGroupList().then((res: any) => {
      this.SET_GROUPLIST(res.state);
    });
  }
  @Action
  public async createGroup(params: object) {
    await createGroup(params).then(() => {
      getGroupList().then((res: any) => {
        this.SET_GROUPLIST(res.state);
      });
    });
  }
  @Action
  public async deleteGroup(params: object) {
    await deleteGroup(params).then(() => {
      getGroupList().then((res: any) => {
        this.SET_GROUPLIST(res.state);
      });
    });
  }
  @Action
  public async copyGroup(params: object) {
    await copyGroup(params).then(() => {
      getGroupList().then((res: any) => {
        this.SET_GROUPLIST(res.state);
      });
    });
  }
}
export const groupListModule = getModule(App);
