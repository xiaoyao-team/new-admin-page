import request from "@/utils/request.node";
import qs from "qs";

export  const updateApkPage =  (data: any) => {
    return request({
      url: "/update",
      method: "post",
      data: data
    });
  }

  export const uploadIcon = (data: any) => {
    return request({
      url: "/upload",
      method: "post",
      data
    });
  }

  export const delApkPage = (data: any) => {
    return request({
      url: "/delete",
      method: "post",
      data: qs.stringify(data)
    });
  }

  export const addApkPage = (data: any) => {
    return request({
      url: "/submit",
      method: "post",
      data: data
    });
  }

  export const searchData = (data?: any) => {
    return request({
      url: "/search",
      method: "post",
      data: qs.stringify(data)
    });
  }

  export function COPY(data?: any) {
    return request({
      url: "/copy",
      method: "post",
      data: qs.stringify(data)
    });
  }