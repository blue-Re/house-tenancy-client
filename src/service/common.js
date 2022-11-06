import http from './index';

export function getMenuList(type) {
  return http.get('/getMenuList', {
    params: {
      type,
    },
  });
}

export function login(params) {
  return http.post('/login', params);
}

export function register(params) {
  return http.post('/register', params);
}

export default null;
