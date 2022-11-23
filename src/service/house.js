import http from './index';

export function getHouseList(params) {
  return http.post('/getHouseList', params);
}

export function createHouse(params) {
  return http.post('/createHouse', params);
}

export function updateHouse(params) {
  return http.post('/updateHouse', params);
}

export function getHouseDetail(params) {
  return http.post('/getHouseDetail', params);
}

export function deleteHouse(params) {
  return http.post('/deleteHouse', params);
}

export default null;
