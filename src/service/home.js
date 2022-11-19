import http from './index';

export function getReduceUserData() {
  return http.get('/reduceUserData');
}

export function getReduceTroubleData() {
  return http.get('/reduceTroubleData');
}

export default {};
