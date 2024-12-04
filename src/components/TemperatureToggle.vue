<script>
import { useWeatherStore } from '@/stores/weather'

export default {
  data() {
    return {
      startX: 0,
      isSwiping: false,
    }
  },
  computed: {
    isFahrenheit: {
      get() {
        const temperatureStore = useWeatherStore()
        return temperatureStore.scale === 'F'
      },
      set(value) {
        const temperatureStore = useWeatherStore()
        temperatureStore.scale = value ? 'F' : 'C'
      },
    },
  },
  methods: {
    handleTouchStart(event) {
      this.startX = event.touches[0].clientX
      this.isSwiping = true
    },
    handleTouchMove(event) {
      if (!this.isSwiping) return
      const currentX = event.touches[0].clientX
      const deltaX = currentX - this.startX

      if (deltaX > 50) {
        this.isFahrenheit = true
        this.isSwiping = false
      } else if (deltaX < -50) {
        this.isFahrenheit = false
        this.isSwiping = false
      }
    },
    handleTouchEnd() {
      this.isSwiping = false
    },
  },
}
</script>

<template>
  <div
    class="toggle-switch"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @click="isFahrenheit = !isFahrenheit"
  >
    <div class="switch">
      <div class="switch-knob" :class="{ 'knob-right': isFahrenheit }"></div>
    </div>
    <div class="labels">
      <span :class="{ active: !isFahrenheit }">C</span>
      <span :class="{ active: isFahrenheit }">F</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/variables.scss';

.toggle-switch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 120px;
  padding: 10px;
  user-select: none;
  cursor: pointer;
}

.switch {
  position: relative;
  width: 60px;
  height: 30px;
  background-color: variables.$third-bg-color;
  border-radius: 15px;
  transition: background-color 0.3s ease;
}

.switch-knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  background-color: variables.$fours-bg-color;
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: variables.$sec-box-shadow;
}

.knob-right {
  transform: translateX(30px);
}

.labels {
  display: flex;
  justify-content: space-between;
  width: 60px;
  margin-top: 5px;
}

span {
  font-size: 14px;
  color: variables.$third-grey-color;
  font-weight: bold;
  opacity: 0.5;
  transition: all 0.3s ease;

  &.active {
    color: variables.$prime-color;
    opacity: 1;
  }
}
</style>
