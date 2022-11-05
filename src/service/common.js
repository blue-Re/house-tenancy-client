import http from './index';

export function getMenuList() {
  return http.get('/getMenuList');
}

export default null;
