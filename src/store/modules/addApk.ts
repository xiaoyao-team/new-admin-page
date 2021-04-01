import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import {
  searchData,
  addApkPage,
  uploadIcon,
  delApkPage,
  updateApkPage
} from "@/api/addApk";

export interface AddApkState {
  apkPageData: string[];
  defaultData: object;
}

@Module({ dynamic: true, store, name: "groupInfo" })
class AddApk extends VuexModule implements AddApkState {
  public apkPageData = [];
  public defaultData = {};

  @Mutation
  private SET_APKPAGEDATA(data: any) {
    this.apkPageData = data;
  }
  @Mutation
  public SET_DEFAULTDATA(data: any) {
    this.defaultData = data;
  }

  @Action
  public async getApkPageData() {
    await searchData().then((res: any) => {
      this.SET_APKPAGEDATA(res.state);
    });
  }
  @Action
  public async addApkPage(params: object) {
    await addApkPage(params).then(() => {
      this.getApkPageData;
    });
  }
  @Action
  public async updateApkPage(params: object) {
    await updateApkPage(params).then(() => {
      this.getApkPageData;
    });
  }
  @Action
  public async delApkPage(params: object) {
    await delApkPage(params).then(() => {
      this.getApkPageData();
    });
  }
  @Action
  public async uploadIcon(params: object) {
    return new Promise((resolve, reject) => {
      uploadIcon(params)
        .then((res: any) => {
          resolve(res.state);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export const addApkModule = getModule(AddApk);