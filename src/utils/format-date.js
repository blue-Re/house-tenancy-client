import dayjs from 'dayjs';

export function formatFullDate(date) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

export function getDay(date) {
  return dayjs(date).$d.toString().slice(0, 3); // Sat
  // return dayjs(date).$d.toString(); // Sat Nov 12 2022 18:51:22 GMT+0800 (中国标准时间)
}

export default {};
