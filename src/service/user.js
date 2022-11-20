import http from './index';

export function getUserList(params) {
  return http.post('/getUserList', params);
}

export function deleteUser(params) {
  return http.post('/deleteUser', params);
}

export default {};
