import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { Loading } from "element-ui";
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: "http://172.16.10.103:3000/",
  // baseURL: "http://172.16.3.171:9002/",
  baseURL: '/dev-api',
  timeout: 5000
});
const options = {
  text: "拼命加载中...",
  spinner: "el-icon-loading",
  background: 'rgba(0, 0, 0, 0.7)',
  lock: true
};
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    Loading.service(options);
    // 向每个请求添加X-Access-Token标头，您可以在此处添加其他自定义标头
    // if (UserModule.token) {
    //   config.headers['X-Access-Token'] = UserModule.token
    // }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    Loading.service(options).close();
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // UserModule.ResetToken()
          location.reload() // 防止来自vue-router的错误
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response.data
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    Loading.service(options).close();
    return Promise.reject(error)
  }
)

export default service
