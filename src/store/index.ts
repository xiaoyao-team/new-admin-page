import Vue from "vue";
import Vuex from "vuex";
import { GroupListState } from "./modules/groupList";
import { LoginState } from "./modules/login";
import { GroupInfoState } from "./modules/groupInfo";
import { AddApkState } from "./modules/addApk";

Vue.use(Vuex);

export interface RootState {
  groupList: GroupListState;
  login: LoginState;
  groupInfo: GroupInfoState;
  addApk: AddApkState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<RootState>({});
