<script>
import SearchInput from '@/components/SearchInput.vue'
import { useWeatherStore } from '@/stores/weather'
import { LocationInformation } from '@element-plus/icons-vue'
export default {
  name: 'StatsLayout',
  components: {
    SearchInput,
    LocationInformation,
  },
  data() {
    return {
      city: '',
      weatherStore: useWeatherStore(),
    }
  },
  computed: {
    weather() {
      return this.weatherStore.weatherInfo
    },
    error() {
      return this.weatherStore.error
    },
  },
  methods: {
    getWeatherData() {
      this.weatherStore.getWeather(this.city)
      this.weatherStore.getDaysForecastWeather(this.city)
      this.city = ''
    },
    handleCityChange(newCity) {
      this.city = newCity
    },
    async getWeatherByCoords() {
      if (!navigator.geolocation) {
        this.error = 'Geolocation is not supported by your browser.'
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          await this.weatherStore.getWeatherByCoords(latitude, longitude)
        },
        (error) => {
          this.error = error.response?.data?.message || 'Error receiving geolocation'
        },
        {
          enableHighAccuracy: true,
        },
      )
    },
  },
}
</script>

<template>
  <div class="wrapper">
    <div class="header-box">
      <div class="location">
        <button class="location__btn">
          <LocationInformation @click="getWeatherByCoords" class="location__icon" />
        </button>
        <h3 v-if="weather" class="location__city">In {{ weather.name }}</h3>
      </div>

      <SearchInput :city="city" @update:city="handleCityChange" @submit="getWeatherData" />
      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.error {
  position: absolute;
  bottom: -70%;
  left: 15%;
  color: red;
  font-size: 22px;
}
.wrapper {
  width: 576px;
  height: 100%;
  padding: 40px 40px 0px 40px;
  background: radial-gradient(
    107.32% 141.42% at 0% 0%,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}

.header-box {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.location {
  display: flex;
  align-items: flex-end;

  &__btn {
    position: relative;
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #fff;
    border-radius: 20px;
    background: transparent;
    cursor: pointer;

    &:hover {
      background: #91bef3;
    }
  }

  &__icon {
    position: absolute;
    height: 35px;
    color: #fff;
    width: 35px;
    height: 35px;
  }

  &__city {
    margin-left: 16px;
    font-size: 32px;
    font-weight: 300;
  }
}
</style>
