import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getSystemSetting = (params) => {
  return axios.request({
    url: '/api/v1/system/userAdmin',
    method: 'get',
    params
  })
}

export const postSystemSetting = (data) => {
  return axios.request({
    url: '/api/v1/system/userAdmin',
    method: 'put',
    data
  })
}