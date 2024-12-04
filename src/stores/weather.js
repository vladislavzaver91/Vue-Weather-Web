import {
  AIR_POLLUTION,
  DAYS_WEATHER_BY_CITY_NAME,
  UV_INDEX,
  WEATHER_BY_CITY_NAME,
} from '@/constants'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weatherInfo: null,
    daysWeather: null,
    UVIndexInfo: null,
    airPollutionInfo: null,
    scale: 'C',
    coords: null,
    error: null,
  }),
  actions: {
    setCoords(coords) {
      this.coords = coords
    },
    async getWeather(city) {
      try {
        const res = await axios.get(`${WEATHER_BY_CITY_NAME}&q=${city}`)
        this.weatherInfo = res?.data
        this.error = null
        if (this.weatherInfo?.coord) {
          this.setCoords(this.weatherInfo.coord)
        }
        await this.getUVIndex()
        await this.getAirPollution()
      } catch (error) {
        this.showError(error.response?.data?.message || 'Failed to fetch weather data.')
      }
    },
    async getWeatherByCoords(lat, lon) {
      try {
        const res = await axios.get(`${WEATHER_BY_CITY_NAME}&lat=${lat}&lon=${lon}`)
        this.weatherInfo = res?.data
        this.error = null
        this.setCoords({ lat, lon })
        await this.getUVIndex()
        await this.getAirPollution()
      } catch (error) {
        this.showError(
          error.response?.data?.message || 'Failed to fetch weather data by coordinates.',
        )
      }
    },
    async getDaysForecastWeather(city) {
      try {
        const res = await axios.get(`${DAYS_WEATHER_BY_CITY_NAME}&q=${city}`)
        this.daysWeather = res?.data
        this.error = null
      } catch (error) {
        this.showError(error.response?.data?.message || 'Failed to fetch forecast data.')
      }
    },
    async getDaysForecastWeatherByCoords(lat, lon) {
      try {
        const res = await axios.get(`${DAYS_WEATHER_BY_CITY_NAME}&lat=${lat}&lon=${lon}`)
        this.daysWeather = res?.data
        this.error = null
      } catch (error) {
        this.showError(
          error.response?.data?.message || 'Failed to fetch forecast data by coordinates.',
        )
      }
    },
    async getUVIndex() {
      if (!this.coords || !this.coords.lat || !this.coords.lon) {
        this.showError('Coordinates are missing. Cannot execute UV Index query.')
        return
      }

      try {
        const res = await axios.get(`${UV_INDEX}&lat=${this.coords.lat}&lon=${this.coords.lon}`)
        this.UVIndexInfo = res?.data
        this.error = null
      } catch (error) {
        this.showError(error.response?.data?.message || 'Error when querying the UV index')
      }
    },
    async getAirPollution() {
      if (!this.coords || !this.coords.lat || !this.coords.lon) {
        this.showError('Coordinates are missing. Cannot execute UV Index query.')
        return
      }

      try {
        const res = await axios.get(
          `${AIR_POLLUTION}&lat=${this.coords.lat}&lon=${this.coords.lon}`,
        )
        this.airPollutionInfo = res?.data
        this.error = null
      } catch (error) {
        this.showError(error.response?.data?.message || 'Error during request')
      }
    },
    showError(message) {
      this.error = message
      setTimeout(() => {
        this.error = null
      }, 5000)
    },
    toggleScale() {
      this.scale = this.scale === 'C' ? 'C' : 'F'
    },
    convertTemperature(tempCelsius) {
      return this.scale === 'C'
        ? tempCelsius
        : (tempCelsius = Math.round((tempCelsius * 9) / 5 + 32))
    },
  },
})
