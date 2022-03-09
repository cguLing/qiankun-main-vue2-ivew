import axios from '@/libs/api.request'
// 服务分类
export const serviceTypeGet = (params) => {
  return axios.request({
    url: '/api/v1/service/serviceType',
    method: 'get',
    params
  })
}
export const serviceTypePost = (data) => {
  return axios.request({
    url: '/api/v1/service/serviceType',
    method: 'post',
    data
  })
}
export const serviceTypePut = (data) => {
  return axios.request({
    url: '/api/v1/service/serviceType',
    method: 'put',
    data
  })
}
export const serviceTypeDelete = (data) => {
  return axios.request({
    url: '/api/v1/service/serviceType',
    method: 'delete',
    data
  })
}
// 微服务
export const microListGet = (params) => {
  return axios.request({
    url: '/api/v1/service/microList',
    method: 'get',
    params
  })
}
export const microListPost = (data) => {
  return axios.request({
    url: '/api/v1/service/microList',
    method: 'post',
    data
  })
}
export const microListPut = (data) => {
  return axios.request({
    url: '/api/v1/service/microList',
    method: 'put',
    data
  })
}
export const microListDelete = (data) => {
  return axios.request({
    url: '/api/v1/service/microList',
    method: 'delete',
    data
  })
}
// 服务列表
export const serviceListGet = (params) => {
  return axios.request({
    url: '/api/v1/service/serviceList',
    method: 'get',
    params
  })
}
export const serviceListPost = (data) => {
  return axios.request({
    url: '/api/v1/service/serviceList',
    method: 'post',
    data
  })
}
export const serviceListPut = (data) => {
  return axios.request({
    url: '/api/v1/service/serviceList',
    method: 'put',
    data
  })
}
export const serviceListDelete = (data) => {
  return axios.request({
    url: '/api/v1/service/serviceList',
    method: 'delete',
    data
  })
}
// 服务收藏
export const userEnshrineGet = (params) => {
  return axios.request({
    url: '/api/v1/service/enshrineList',
    method: 'get',
    params
  })
}
export const userEnshrinePost = (data) => {
  return axios.request({
    url: '/api/v1/service/enshrineList',
    method: 'post',
    data
  })
}
export const userEnshrineDelete = (data) => {
  return axios.request({
    url: '/api/v1/service/enshrineList',
    method: 'delete',
    data
  })
}
