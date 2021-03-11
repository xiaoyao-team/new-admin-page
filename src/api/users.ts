import request from "../utils/request";
import qs from 'qs'

// 登录
export const login = (params: any) =>
  request({
    url: "/admin/login",
    method: "post",
    data: qs.stringify(params)
  });

// 获取活动列表
export const getGroupList = () => 
  request({
    url: "/manager/group/basic",
    method: "post",
  });

// 获取游戏列表
export const getAppList = () =>
  request({
    url: "/manager/app/list",
    method: "post"
  });

// 新建活动组
export const createGroup = (params: object) =>
  request({
    url: "/manager/group/add",
    method: "post",
    data:qs.stringify(params),
  });

// 删除活动组 
export const deleteGroup = (params: object) =>
  request({
    url: "/manager/group/del",
    method: "post",
    data: qs.stringify(params)
  });

// 复制活动组
export const copyGroup = (params: object) =>
  request({
    url: "manager/group/copy",
    method: "post",
    data: qs.stringify(params)
  });

// 获取活动组详情
export const getGroupInfo = (params: object) =>
  request({
    url: "/manager/group/detail",
    method: "post",
    data: qs.stringify(params)
  });

// 修改活动组信息
export const editGroupInfo = (params: object) =>
  request({
    url: "/manager/group/update",
    method: "post",
    data: qs.stringify(params)
  });

//添加新活动
export const addActivity = (params: object) =>
  request({
    url: "/manager/activity/add",
    method: "post",
    data: qs.stringify(params)
  });

//删除活动
export const deleteActivity = (params: object) =>
  request({
    url: "/manager/activity/del",
    method: "post",
    data: qs.stringify(params)
  });

//修改活动
export const editActivity = (params: object) =>
  request({
    url: "/manager/activity/update",
    method: "post",
    data: qs.stringify(params)
  });

//添加礼包
export const addReward = (params: object) =>
  request({
    url: "/manager/giftPackage/add",
    method: "post",
    data: qs.stringify(params)
  });

//修改礼包
export const editReward = (params: object) =>
  request({
    url: "/manager/giftPackage/update",
    method: "post",
    data: qs.stringify(params)
  });

//删除礼包
export const deleteReward = (params: object) =>
  request({
    url: "/manager/giftPackage/del",
    method: "post",
    data: qs.stringify(params)
  });

