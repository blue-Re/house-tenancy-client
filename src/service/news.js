import http from './index';

export function getNewsList(params) {
  return http.post('/getNewsList', params);
}

export function createNews(params) {
  return http.post('/createNews', params);
}

export default {};
