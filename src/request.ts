import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';
import { Message } from 'element-ui';
import { filterEmpty } from './utils';

const secretKey = '$2a$10$KfqTAwzvSEWyxDDXejMcJOEK.Etikne2gReHgi76csKakDWxKUopS';

const JSONAXIOS = axios.create({
  timeout: 50000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=utf-8',
    'secret-key': secretKey,
  },
  transformRequest: [data => JSON.stringify(filterEmpty(data))],
  paramsSerializer(params) {
    return qs.stringify(filterEmpty(params));
  },
});

const FORMAXIOS = axios.create({
  timeout: 50000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
  transformRequest: [data => qs.stringify(filterEmpty(data), { arrayFormat: 'repeat' })],
});

const FORMDATAAXIOS = axios.create({
  timeout: 50000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'multipart/form-data',
  },
});

function responseSuccessInterceptor(response: any) {
  const { data } = response;
  if (data && data.code >= 200 && data.code < 400) {
    if (data.message) {
      Message.success(data.message);
    }
    return Promise.resolve(data);
  }

  const err = new Error(`code: ${data.code}; message: ${data.message}; url: ${response.config.url}`);
  err.name = '后端请求错误';

  const { handleRequestError = null } = Vue.ksvue || {};

  if (handleRequestError) {
    handleRequestError(data, err);
  }

  if (data.message) {
    Message.error(data.message);
  }
  return Promise.reject(data);
}

function responseErrorInterceptor(error: any) {
  if (error.response) {
    Message.error('请求失败');
  }
  return Promise.reject(error);
}

FORMAXIOS.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);
JSONAXIOS.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);
FORMDATAAXIOS.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);

export const formApi = FORMAXIOS;
export const jsonApi = JSONAXIOS;
export const formdataApi = FORMDATAAXIOS;
