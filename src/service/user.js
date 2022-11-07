import http from './index';

export function getUserList(params) {
  return http.post('/getUserList', params);
}

export default {};
