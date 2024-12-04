<script>
import CountryName from '@/components/CountryName.vue'
import { useWeatherStore } from '@/stores/weather'
import { formatDayAndMonth, formatWeekdayAndTime, getCustomIcon } from '@/utils'
import DaysWeatherList from './DaysWeatherList.vue'
import TemperatureToggle from './TemperatureToggle.vue'

export default {
  name: 'WeatherHighlightsPanel',
  components: {
    TemperatureToggle,
    DaysWeatherList,
    CountryName,
  },
  props: {
    weather: {
      type: Object,
      required: true,
    },
    scale: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      intervalId: null,
      localTime: null,
    }
  },
  methods: {
    calculateLocalTime() {
      const timezoneOffsetInSeconds = this.weather.timezone || 0
      const currentUTC = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000
      const localTimeInMs = currentUTC + timezoneOffsetInSeconds * 1000
      this.localTime = new Date(localTimeInMs)
    },
    getTimeZoneFromOffset(offsetInSeconds) {
      const hours = offsetInSeconds / 3600
      const prefix = hours > 0 ? '+' : '-'
      return `Etc/GMT${prefix}${Math.abs(hours)}`
    },
    getCustomIcon,
  },
  computed: {
    formattedTemperature() {
      const temperatureStore = useWeatherStore()
      const feelsLikeTemp = this.weather?.main?.feels_like || 0
      return temperatureStore.convertTemperature(Math.round(feelsLikeTemp))
    },
    formattedDayAndMonth() {
      return this.localTime ? formatDayAndMonth(this.localTime) : ''
    },
    formattedWeekdayAndTime() {
      return this.localTime ? formatWeekdayAndTime(this.localTime) : { day: '', time: '' }
    },
  },
  watch: {
    weather: {
      immediate: true,
      handler() {
        this.calculateLocalTime()
      },
    },
  },
  mounted() {
    this.intervalId = setInterval(() => {
      this.calculateLocalTime()
    }, 60000)
  },
  beforeUnmount() {
    clearInterval(this.intervalId)
  },
}
</script>

<template>
  <div>
    <div class="top-thumb">
      <img
        :src="getCustomIcon(weather.weather[0].icon)"
        :alt="weather.weather[0].description"
        width="150px"
        height="120px"
        loading="lazy"
      />
      <TemperatureToggle />
    </div>
    <div class="main-thumb">
      <h2 class="temp">
        {{ formattedTemperature }}
        <span v-if="this.scale === 'F'" class="temp__celsius">&deg;F</span>
        <span v-else class="temp__celsius">&deg;C</span>
      </h2>
      <p class="name">
        {{ weather.name }}, <br />
        <span class="name__country">
          <CountryName :countryCode="weather.sys.country" />
        </span>
      </p>
    </div>

    <div class="date-box">
      <p class="date-top">{{ formattedDayAndMonth }}</p>
      <div class="date-bottom">
        <p class="weekday">{{ formattedWeekdayAndTime.day }}</p>
        <span class="divider"></span>
        <p class="time">{{ formattedWeekdayAndTime.time }}</p>
      </div>
    </div>

    <div class="stats-info">
      <div class="stats-info__item">
        <div class="stats-info__name-box">
          <img src="/src/assets/icons/wind.svg" alt="Wind" class="stats-info__icon" />
          <p class="stats-info__name">Wind</p>
        </div>
        <p>{{ weather.wind.speed }} km/h</p>
      </div>
      <span class="divider"></span>
      <div class="stats-info__item">
        <div class="stats-info__name-box">
          <img src="/src/assets/icons/hum.svg" alt="Hum" class="stats-info__icon" />
          <p class="stats-info__name">Hum</p>
        </div>
        <p>{{ weather.main.humidity }} %</p>
      </div>
      <span class="divider"></span>
      <div class="stats-info__item">
        <div class="stats-info__name-box">
          <img src="/src/assets/icons/cloudy.svg" alt="Cloudiness" class="stats-info__icon" />
          <p class="stats-info__name">Cloudiness</p>
        </div>
        <p>{{ weather.clouds.all }} %</p>
      </div>
    </div>

    <DaysWeatherList />
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/variables.scss';

.top-thumb {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-thumb {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.temp {
  position: relative;
  margin-top: 25px;
  font-size: 164px;
  font-weight: 100;
  line-height: 1.2;

  &__celsius {
    position: absolute;
    top: 30px;
    font-size: 32px;
    font-weight: 400;
  }
}

.name {
  font-weight: 300;
  font-size: 32px;

  &__country {
    font-size: 22px;
  }
}

.date-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.date-top {
  margin-top: 17px;
  font-size: 36px;
  font-weight: 300;
  line-height: 1.2;
}

.date-bottom {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
}

.divider {
  width: 1px;
  height: 1.5rem;
  background-color: variables.$prime-color;
  margin: 0px 20px;
}

.weekday,
.time {
  font-size: 24px;
  font-weight: 300;
}

.stats-info {
  display: flex;
  align-items: center;
  margin-top: 38px;

  &__item {
    display: flex;
    align-items: center;
    gap: 16px;

    & p {
      font-size: 22px;
      font-weight: 300;
    }
  }

  &__name-box {
    display: flex;
  }

  &__icon {
    margin-right: 8px;
    width: 22px;
    height: 22px;
    color: variables.$prime-color;
  }
}
</style>
