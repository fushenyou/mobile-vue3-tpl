import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Toast } from "vant";
import { VanToast } from "vant/types/toast";

let loadngToast: VanToast;

export interface AxiosRequestOptionsType extends AxiosRequestConfig {
  /** 是否显示loading框 默认true */
  isLoading?: boolean;
  /** 是否显示错误信息 默认true */
  isShowErrMsg?: boolean;
}

export const CODE_MESSAGE: any = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 10000,
  // withCredentials: true // send cookies when cross-domain requests
});

const initParams = (params: any) => {
  return { ...params };
};

service.interceptors.request.use(
  (config) => {
    if (["get", "GET"].indexOf(<string>config.method) !== -1) {
      config.params = initParams(config.params);
    } else {
      config.data = initParams(config.params);
      delete config.params;
    }
    return config;
  },
  (error) => {
    loadngToast && loadngToast.clear();
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      const error: any = new Error(res.msg);
      error.code = res.code;
      error.response = response;
      return Promise.reject(error);
    } else {
      return res.data;
    }
  },
  (error) => {
    const response: AxiosResponse = error.response;
    if (response && !!CODE_MESSAGE[response.status]) {
      error.message = CODE_MESSAGE[error.response.status];
      error.code = error.response.status;
    } else {
      if (error.code === "ECONNABORTED") {
        error.message = "请求超时";
      }
    }
    return Promise.reject(error);
  }
);

export default <R>(url: string, options: AxiosRequestOptionsType): Promise<R> => {
  options = { isLoading: true, isShowErrMsg: true, ...options };
  if (options.isLoading)
    loadngToast = Toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0,
    });
  const responsePromise: Promise<any> = service(url, options);
  responsePromise
    .catch((error) => {
      Toast.clear();
      options.isShowErrMsg && Toast(error.message, { duration: 3000 });
    })
    .finally(() => Toast.clear());
  return responsePromise;
};
