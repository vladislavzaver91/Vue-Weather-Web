<script>
import HighlightsLayout from '@/layouts/HighlightsLayout.vue'
import StatsLayout from '@/layouts/StatsLayout.vue'
import { useWeatherStore } from '@/stores/weather'
import WeatherHighlightsPanel from './WeatherHighlightsPanel.vue'
import WeatherStatsPanel from './WeatherStatsPanel.vue'
import WelcomeContent from './WelcomeContent.vue'

export default {
  name: 'MainComponent',
  components: {
    WelcomeContent,
    WeatherHighlightsPanel,
    WeatherStatsPanel,
    HighlightsLayout,
    StatsLayout,
  },
  data() {
    return {
      weatherStore: useWeatherStore(),
    }
  },
  computed: {
    weatherInfo() {
      return this.weatherStore.weatherInfo
    },
    scale() {
      return this.weatherStore.scale
    },
    error() {
      return this.weatherStore.error
    },
  },
}
</script>

<template>
  <div class="box">
    <HighlightsLayout>
      <WeatherHighlightsPanel v-if="weatherInfo" :weather="weatherInfo" :scale="scale" />
      <WelcomeContent v-else />
    </HighlightsLayout>
    <StatsLayout>
      <WeatherStatsPanel v-if="weatherInfo" />
      <div v-else class="info-thumb">
        <p class="info-thumb__text">
          Use the city <span>search</span> or turn on <span>geolocation</span> for weather in your
          city
        </p>
      </div>
    </StatsLayout>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/main.scss';
@use '../assets/styles/variables.scss';
.box {
  display: flex;
  align-items: flex-start;
  height: 100%;
}

.info-thumb {
  margin-top: 120px;
  &__text {
    font-size: 46px;
    font-weight: 500px;
    filter: drop-shadow(variables.$sec-box-shadow);

    & span {
      color: variables.$accent-color;
      filter: drop-shadow(variables.$third-box-shadow);
      animation: color-shift 3s infinite linear;
    }

    @keyframes color-shift {
      0% {
        color: variables.$accent-color;
      }
      50% {
        color: variables.$light-sec-bg-color;
      }
      100% {
        color: variables.$accent-color;
      }
    }
  }
}
</style>
