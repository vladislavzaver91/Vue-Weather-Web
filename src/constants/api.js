const API_KEY = import.meta.env.VITE_APP_API_KEY
const BASE_URL = 'https://api.openweathermap.org'

export const WEATHER_BY_CITY_NAME = `${BASE_URL}/data/2.5/weather?appid=${API_KEY}&units=metric`
export const DAYS_WEATHER_BY_CITY_NAME = `${BASE_URL}/data/2.5/forecast?appid=${API_KEY}&units=metric`
export const UV_INDEX = `${BASE_URL}/data/2.5/uvi?appid=${API_KEY}`
export const AIR_POLLUTION = `${BASE_URL}/data/2.5/air_pollution?appid=${API_KEY}`
