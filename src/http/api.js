import request from './request'
const userApi = {
  Login: '/user',
  getUserInfo: '/user/list',
  adduser: '/user/adduser',
  updateuser: '/user/update',
  deleteuser: '/user/delete'
}
export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}
export function getuserinfo (parameter) {
  console.log(parameter)
  return request({
    url: userApi.getUserInfo,
    method: 'get',
    params: parameter
  })
}
export function adduser (parameter) {
  console.log('这里是api-adduser')
  return request({
    url: userApi.adduser,
    method: 'post',
    data: parameter
  })
}
export function updateuser (parameter) {
  console.log('这里是api-adduser')
  return request({
    url: userApi.updateuser,
    method: 'put',
    data: parameter
  })
}
export function deleteuser (parameter) {
  console.log('这里是api-adduser')
  return request({
    url: userApi.deleteuser,
    method: 'post',
    params: parameter
  })
}
