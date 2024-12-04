import { format, fromUnixTime } from 'date-fns'

export function checkIsDaytime(weatherInfo) {
  if (!weatherInfo || !weatherInfo.sys) return true
  const currentTime = Math.floor(Date.now() / 1000)
  const { sunrise, sunset } = weatherInfo.sys
  return currentTime > sunrise && currentTime < sunset
}

export function getFormattedSys(sunriseUnix, sunsetUnix) {
  const sunrise = fromUnixTime(sunriseUnix)
  const sunset = fromUnixTime(sunsetUnix)
  return {
    sunrise: format(sunrise, 'HH:mm'),
    sunset: format(sunset, 'HH:mm'),
  }
}
