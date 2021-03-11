import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import {
  getGroupInfo,
  editGroupInfo,
  addActivity,
  deleteActivity,
  addReward,
  editActivity,
  editReward,
  deleteReward
} from "@/api/users";

export interface GroupInfoState {
  groupInfoData: any; // 活动组数据
  activityTabs: any; // 活动tab数据
  activityTabsValue: string; //活动tab下标
  rewardTabs: any; //礼包tab数据
  rewardTabsValue: string; //礼包tab下标
}

@Module({ dynamic: true, store, name: "groupInfo" })
class GroupInfo extends VuexModule implements GroupInfoState {
  public groupInfoData = [];
  public activityTabs = [];
  public activityTabsBak = [];
  public rewardTabs = [];
  public rewardTabsBak = [];
  public activityTabsValue = "0";
  public rewardTabsValue = "0";

  @Mutation
  private SET_GROUPINFODATA(data: any) {
    this.groupInfoData = data;
  }
  @Mutation
  public SET_ACTIVITYTABSVALUE(type: any) {
    this.activityTabsValue = type - 1 + "";
    if ((this.activityTabsBak as any)[this.activityTabsValue]) {
      this.rewardTabs = (this.activityTabsBak as any)[
        this.activityTabsValue
      ].giftPackageDetailList;
      this.rewardTabsBak = [...this.rewardTabs];
    } else {
      this.rewardTabs = [];
      this.rewardTabsBak = [];
    }
  }
  @Mutation
  public SET_ACTIVITYTABS(type?: any) {
    switch (type) {
      case "add":
        (this.activityTabs as any).push({
          activityName: "创建中",
          content: { name: "New Tab content" },
          activityStatus: "0"
        });
        return;
      case "del":
        this.activityTabs.splice(this.activityTabs.length - 1, 1);
        return;
      default:
        this.activityTabs = [];
        (this.groupInfoData as any).activityDetailList.map((item: any) => {
          (this.activityTabs as any).push(
            Object.assign(item.activity, {
              conditionDetailList: item.conditionDetailList,
              giftPackageDetailList: item.giftPackageDetailList,
              giftPackageList: item.giftPackageList
            })
          );
        });
        this.activityTabsBak = [...this.activityTabs];
        return;
    }
  }
  @Mutation
  public SET_REWARDTABS(type?: any) {
    switch (type) {
      case "add":
        (this.rewardTabs as any).push({
          activityName: "创建中",
          content: { name: "New Tab content" },
          rewardDtatus: "0"
        });
        return;
      case "del":
        this.rewardTabs.splice(this.rewardTabs.length - 1, 1);
        return;
      default:
        if ((this.activityTabsBak as any)[this.activityTabsValue]) {
          this.rewardTabs = (this.activityTabsBak as any)[
            this.activityTabsValue
          ].giftPackageDetailList;
          this.rewardTabsBak = [...this.rewardTabs];
        } else {
          this.rewardTabs = [];
          this.rewardTabsBak = [];
        }
        return;
    }
  }

  get groupId() {
    return (this.groupInfoData as any).activityGroupBase.activityGroup.groupId;
  }

  @Action
  public async getGroupInfo(params: object) {
    await getGroupInfo(params).then((res: any) => {
      this.SET_GROUPINFODATA(res.state);
      this.SET_ACTIVITYTABS();
      this.SET_REWARDTABS();
    });
  }
  @Action
  public async editGroupInfo(params: object) {
    await editGroupInfo(params).then(() => {
      this.getGroupInfo({ groupId: this.groupId });
    });
  }
  @Action
  public async addActivity(params: object) {
    await addActivity(params).then(() => {
      this.getGroupInfo({ groupId: this.groupId });
    });
  }
  @Action
  public async editActivity(params: object) {
    await editActivity(params).then(() => {
      this.getGroupInfo({ groupId: this.groupId });
    });
  }
  @Action
  public async deleteActivity(params: object) {
    await deleteActivity(params).then(() => {
      this.getGroupInfo({ groupId: this.groupId });
    });
  }
  @Action
  public async addReward(params: object) {
    await addReward(params).then(() => {
      this.getGroupInfo({ groupId: this.groupId });
    });
  }
  @Action
  public async editReward(params: object) {
    await editReward(params).then(() => {
      this.getGroupInfo({ groupId: this.groupId });
    });
  }
  @Action
  public async deleteReward(params: object) {
    await deleteReward(params).then(() => {
      this.getGroupInfo({ groupId: this.groupId });
    });
  }
}
export const groupInfoModule = getModule(GroupInfo);
