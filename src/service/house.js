import http from './index';

export function getHouseList(params) {
  return http.post('/getHouseList', params);
}

export default null;
