import http from './index';

export function createTrouble(params) {
  return http.post('/createTrouble', params);
}

export function getTroubleList(params) {
  return http.post('/getTroubleList', params);
}

export function updateTrouble(params) {
  return http.post('/updateTrouble', params);
}

export function getTroubleDetail(params) {
  return http.post('/getTroubleDetail', params);
}
export default {};
