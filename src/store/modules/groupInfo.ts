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
  /**
   * groupId: 活动组ID
   * groupName: 活动组名称
   * groupInfoData: 活动组数据
   * activityTabs: 活动Tabs
   * activityTable: 活动数据
   * activityTable: 活动数据
   * activityTabsValue: 活动Tabs下标
   * rewardTabs: 礼包Tabs
   * rewardTabsValue: 礼包Tabs下标
   * */
  groupId: string;
  groupName: string;
  groupInfoData: any;
  activityTabs: any;
  activityTable: any;
  activityTabsValue: string;
  rewardTabs: any;
  rewardTabsValue: string;
}

@Module({ dynamic: true, store, name: "groupInfo" })
class GroupInfo extends VuexModule implements GroupInfoState {
  public groupId = "";
  public groupName = "";
  public groupInfoData = [];
  public activityTabs = [];
  public activityTable = [];
  public activityTabsValue = "0";
  public rewardTabs = [];
  public rewardTabsValue = "0";

  @Mutation
  private SET_GROUPINFODATA(data: any) {
    this.groupInfoData = data;
    this.groupId = data.activityGroupBase.activityGroup.groupId;
    this.groupName = data.activityGroupBase.activityGroup.groupName;
    (this.activityTable as any) = [...data.activityDetailList];
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
          rate: 0
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
  get activityData() {
    const actData: any = this.activityTable[this.activityTabsValue as any];
    if (actData) {
      return Object.assign(actData.activity, {
        conditionDetailList: actData.conditionDetailList,
        giftPackageList: actData.giftPackageList,
        giftPackageDetailList: actData.giftPackageDetailList
      });
    } else {
      return {
        activityId: "",
        activityName: "",
        groupId: "",
        beginTime: "",
        endTime: "",
        activityType: 0,
        activityStatus: 0,
        activityDesc: "",
        sort: 0,
        conditionDetailList: "",
        giftPackageList: [],
        giftPackageDetailList: []
      };
    }
  }
  get rewardData() {
    const actData: any = this.activityTable[this.activityTabsValue as any];
    if (actData) {
      return (this.groupInfoData as any).activityDetailList[
        this.activityTabsValue
      ].giftPackageDetailList[this.rewardTabsValue];
    } else {
      return {
        activityId: "",
        cdkeys: "",
        conditionList: "",
        currentNum: 0,
        diamondInc: 0,
        diamondInit: 0,
        diamondRate: 0,
        diamondUpper: 0,
        giftDesc: "1",
        giftPackageId: "",
        giftPackageName: "",
        giftPackageType: "",
        icon: "",
        itemNum: 0,
        num: 0,
        rate: 0,
        sort: 0
      };
    }
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
