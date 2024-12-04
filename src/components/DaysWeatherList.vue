<script>
import { useWeatherStore } from '@/stores/weather'
import { getCustomIcon } from '@/utils'
import { format, fromUnixTime } from 'date-fns'
import { Navigation } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/scss/navigation'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'

export default {
  name: 'DaysWeatherList',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      weatherStore: useWeatherStore(),
    }
  },
  computed: {
    daysWeather() {
      return this.weatherStore.daysWeather
    },
    coords() {
      return this.weatherStore.coords
    },
    scale() {
      return this.weatherStore.scale
    },
    filteredDaysWeather() {
      return this.daysWeather?.list.filter((item, index) => index % 2 === 0) || []
    },
    formattedTemperatures() {
      const temperatureStore = this.weatherStore
      return this.daysWeather.list.map((day) => {
        const feelsLikeTemp = day.main?.feels_like || 0
        return temperatureStore.convertTemperature(Math.round(feelsLikeTemp))
      })
    },
    formattedTimes() {
      return this.filteredDaysWeather.map((day) => {
        const date = fromUnixTime(day.dt)
        return {
          day: format(date, 'E'),
          time: format(date, 'HH:mm'),
        }
      })
    },
  },
  methods: {
    getCustomIcon,
  },
  watch: {
    coords: {
      immediate: true,
      handler(newCoords) {
        if (newCoords) {
          this.weatherStore.getDaysForecastWeatherByCoords(newCoords.lat, newCoords.lon)
        } else {
          this.weatherStore.getDaysForecastWeather(this.weatherStore.weatherInfo?.name)
        }
      },
    },
  },
  setup() {
    const prev = ref(null)
    const next = ref(null)
    return {
      modules: [Navigation],
      prev,
      next,
    }
  },
}
</script>

<template>
  <div v-if="daysWeather" class="days-list">
    <swiper
      :slidesPerGroup="4"
      :space-between="40"
      :width="150"
      :speed="400"
      :navigation="{
        prevEl: prev,
        nextEl: next,
      }"
      :modules="modules"
    >
      <swiper-slide v-for="(day, index) in filteredDaysWeather" :key="day.dt" class="item">
        <p v-if="scale === 'F'">{{ formattedTemperatures[index] }}&deg;F</p>
        <p v-else>{{ formattedTemperatures[index] }}&deg;C</p>
        <img
          :src="getCustomIcon(day.weather[0].icon)"
          :alt="day.weather[0].description"
          width="67px"
          height="56px"
          loading="lazy"
        />
        <div>
          <p>{{ formattedTimes[index].day }}</p>
          <p>{{ formattedTimes[index].time }}</p>
        </div>
      </swiper-slide>
    </swiper>
    <div ref="prev" class="swiper-button-prev"></div>
    <div ref="next" class="swiper-button-next"></div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/main.scss';
@use '../assets/styles/variables.scss';

.days-list {
  position: relative;
  margin-top: 70px;
  display: flex;
  align-items: center;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0px;
  border-radius: 11px;
  width: 110px;
  height: 200px;
  background-color: variables.$prime-bg-color;

  &__temp {
    font-size: 24px;
    font-weight: 400;
    text-align: center;
  }

  & p {
    font-size: 20px;
    font-weight: 300;
    text-align: center;
  }
}
</style>
