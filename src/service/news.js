import http from './index';

export function getNewsList(params) {
  return http.post('/getNewsList', params);
}

export function createNews(params) {
  return http.post('/createNews', params);
}

export function updateNews(params) {
  return http.post('/updateNews', params);
}

export function getNewsDetail(params) {
  return http.post('/getNewsDetail', params);
}

export default {};
