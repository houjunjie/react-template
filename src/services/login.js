import request from '../utils/request';
import config from '../config/index'

const { api } = config
const { userLogin, userService } = api

// 登录
// export async function login(data) {
//   return request('/user/token/password', {
//     method: 'POST',
//     data
//   });
// }
export function login (data) {
  return request({
    url: userLogin,
    method: 'post',
    data,
  })
}

export function getService (params) {
  return request({
    url: userService.replace(':id', params.user_id),
    method: 'get',
  })
}
