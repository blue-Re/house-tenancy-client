import http from './index';

export function getOrderList(params) {
  return http.post('/getOrderList', params);
}

export function createOrder(params) {
  return http.post('/createOrder', params);
}

export function updateOrder(params) {
  return http.post('/updateOrder', params);
}

export function getOrderDetail(params) {
  return http.post('/getOrderDetail', params);
}

export default {};
