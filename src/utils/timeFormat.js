import { format, fromUnixTime } from 'date-fns'

/**
 * @param {Date} date
 * @returns {string}
 */
export function formatDayAndMonth(date) {
  return format(date, 'dd MMMM')
}

/**
 * @param {Date} date
 * @returns {{ day: string, time: string }}
 */
export function formatWeekdayAndTime(date) {
  return {
    day: format(date, 'EEEE'),
    time: format(date, 'hh:mm a'),
  }
}

export function formatWeekdayAndTimeAtList(unixTime) {
  const date = fromUnixTime(unixTime)
  return {
    day: format(date, 'E'),
    time: format(date, 'HH:mm'),
  }
}
