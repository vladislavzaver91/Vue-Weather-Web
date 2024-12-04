<script>
import { useWeatherStore } from '@/stores/weather'
import {
  calculateSolarNoon,
  checkIsDaytime,
  getAirPollutionColor,
  getFormattedSys,
  getUVIndexColor,
} from '@/utils'
import { storeToRefs } from 'pinia'
import CustomClockLayout from './CustomClockLayout.vue'

export default {
  components: {
    CustomClockLayout,
  },
  // props: {
  //   temperatureCelsius: {
  //     type: String,
  //     required: true,
  //   },
  // },
  data() {
    return {
      weatherStore: useWeatherStore(),
    }
  },
  computed: {
    weatherInfo() {
      return this.weatherStore.weatherInfo
    },
    solarNoon() {
      if (!this.weatherInfo || !this.weatherInfo.sys) return null

      const sunrise = this.weatherInfo.sys.sunrise * 1000
      const sunset = this.weatherInfo.sys.sunset * 1000

      return calculateSolarNoon(sunrise, sunset)
    },
    formattedSys() {
      if (!this.weatherInfo || !this.weatherInfo.sys) return {}
      return getFormattedSys(this.weatherInfo.sys.sunrise, this.weatherInfo.sys.sunset)
    },
    isDayTime() {
      const { weatherInfo } = storeToRefs(this.weatherStore)
      return checkIsDaytime(weatherInfo.value)
    },
    airPollution() {
      return this.weatherStore.airPollutionInfo?.list?.[0]?.main?.aqi || 1
    },
    airPollutionWidth() {
      return ((this.airPollution - 0.5) / 4) * 100
    },
    airPollutionColor() {
      return getAirPollutionColor(this.airPollution)
    },
    UVIndex() {
      return this.weatherStore.UVIndexInfo?.value
        ? Math.round(this.weatherStore.UVIndexInfo.value)
        : 1
    },
    UVIndexWidth() {
      return ((this.UVIndex - 0.5) / 9) * 100
    },
    UVIndexColor() {
      return getUVIndexColor(this.UVIndex)
    },
  },
  watch: {
    isDayTime(newValue) {
      document.body.className = newValue ? 'day' : 'night'
    },
  },
  mounted() {
    document.body.className = this.isDayTime ? 'day' : 'night'
  },
}
</script>

<template>
  <div v-if="weatherInfo">
    <div class="clock-thumb">
      <div class="clock-thumb__item">
        <h3 class="title">Sunrise</h3>
        <CustomClockLayout :sys="formattedSys.sunrise">
          {{ formattedSys.sunrise }}
        </CustomClockLayout>
      </div>
      <div class="clock-thumb__item">
        <h3 class="title">Solar Noon</h3>
        <CustomClockLayout :solarNoon="solarNoon">
          {{ solarNoon }}
        </CustomClockLayout>
      </div>
      <div class="clock-thumb__item">
        <h3 class="title">Sunset</h3>
        <CustomClockLayout :sys="formattedSys.sunset">
          {{ formattedSys.sunset }}
        </CustomClockLayout>
      </div>
    </div>

    <div class="divider"></div>

    <div class="index-thumb">
      <div class="quality-box">
        <h3>Air Quality</h3>
        <div class="pollution-tube">
          <div
            class="tube-fill"
            :style="{
              width: airPollutionWidth + '%',
              backgroundColor: airPollutionColor,
            }"
          ></div>
        </div>
        <p>{{ airPollution }}/5</p>
      </div>

      <div class="uv-box">
        <h3>UV Index</h3>
        <div class="uv-tube">
          <div
            class="tube-fill"
            :style="{
              width: UVIndexWidth + '%',
              backgroundColor: UVIndexColor,
            }"
          ></div>
        </div>
        <p>{{ UVIndex }}/10</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/main.scss';
@use '../assets/styles/variables.scss';

.title {
  font-weight: 300;
  font-size: 28px;
}

.divider {
  width: 420px;
  height: 1px;
  background-color: variables.$prime-color;
  margin: 0 auto;
}
</style>
