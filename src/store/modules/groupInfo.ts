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
  public rewardTabs = [];
  public activityTabsValue = "0";
  public rewardTabsValue = "0";

  @Mutation
  private SET_GROUPINFODATA(data: any) {
    this.groupInfoData = data;
    (this.activityTabs as any) = [...data.activityDetailList];
    if ((this.activityTabs as any)[this.activityTabsValue]) {
      (this.rewardTabs as any) = [
        ...(this.activityTabs as any)[this.activityTabsValue]
          .giftPackageDetailList
      ];
    }
  }
  @Mutation
  public SET_ACTIVITYTABSVALUE(type: any) {
    this.activityTabsValue = type + "";
    if ((this.activityTabs as any)[this.activityTabsValue]) {
      (this.rewardTabs as any) = [
        ...(this.activityTabs as any)[this.activityTabsValue]
          .giftPackageDetailList
      ];
    }
  }
  @Mutation
  public SET_REWARDTABSVALUE(type: any) {
    this.rewardTabsValue = type + "";
  }
  @Mutation
  public SET_ACTIVITYTABS(type: any) {
    switch (type) {
      case "add":
        (this.activityTabs as any).push({
          activity: {
            activityId: "",
            activityName: "new",
            groupId: "",
            beginTime: "",
            endTime: "",
            activityType: "",
            activityStatus: 0,
            activityDesc: "",
            sort: ""
          },
          addNewAct: true,
          conditionDetailList: "",
          giftPackageList: [],
          giftPackageDetailList: []
        });
        break;
      case "del":
        this.activityTabsValue = 0 + "";
        (this.activityTabs as any).pop();
        break;
      default:
        this.activityTabs = type;
        break;
    }
  }
  @Mutation
  public SET_REWARDTABS(type: any) {
    switch (type) {
      case "add":
        (this.rewardTabs as any).push({
          addNewRea: true,
          activityId: "",
          cdkeys: "",
          conditionList: "",
          currentNum: 0,
          diamondInc: 0,
          diamondInit: 0,
          diamondRate: 0,
          diamondUpper: 0,
          giftDesc: "",
          giftPackageId: "",
          giftPackageName: "",
          giftPackageType: "",
          icon: "",
          itemNum: 0,
          num: 0,
          rate: 0,
        });
        break;
      case "del":
        this.rewardTabsValue = 0 + "";
        (this.rewardTabs as any).pop();
        break;
      default:
        this.rewardTabs = type;
        break;
    }
  }

  get groupId() {
    return (this.groupInfoData as any).activityGroupBase.activityGroup.groupId;
  }
  get activityTable() {
    return [...(this.groupInfoData as any).activityDetailList];
  }
  // get activityTabs() {
  //   return (this.groupInfoData as any).activityDetailList;
  // }
  get activityData() {
    const actData: any = (this.groupInfoData as any).activityDetailList[
      this.activityTabsValue
    ];
    return Object.assign(actData.activity, {
      conditionDetailList: actData.conditionDetailList,
      giftPackageList: actData.giftPackageList,
      giftPackageDetailList: actData.giftPackageDetailList
    });
  }
  // get rewardTabs() {
  //   return (this.groupInfoData as any).activityDetailList[
  //     this.activityTabsValue
  //   ].giftPackageDetailList;
  // }
  get rewardData() {
    return (this.groupInfoData as any).activityDetailList[
      this.activityTabsValue
    ].giftPackageDetailList[this.rewardTabsValue];
  }

  @Action
  public async getGroupInfo(params: object) {
    await getGroupInfo(params).then((res: any) => {
      this.SET_GROUPINFODATA(res.state);
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
