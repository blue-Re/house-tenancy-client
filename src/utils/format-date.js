import dayjs from 'dayjs';

export function formatFullDate(date) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

export default {};
