<script>
export default {
  name: 'CustomClockLayout',
  props: {
    solarNoon: {
      type: String,
      required: false,
    },
    sys: {
      type: String,
      required: false,
    },
  },
  computed: {
    time() {
      const timeString = this.solarNoon || this.sys
      if (!timeString) {
        return null
      }
      const [hours, minutes] = timeString.split(':').map(Number)
      const date = new Date()
      date.setHours(hours, minutes, 0, 0)
      return date
    },
    hourStyle() {
      const hours = this.time.getHours() % 12
      const degrees = (hours + this.time.getMinutes() / 60) * 30
      return { transform: `rotate(${degrees}deg)` }
    },
    minuteStyle() {
      const minutes = this.time.getMinutes()
      const degrees = (minutes + this.time.getSeconds() / 60) * 6
      return { transform: `rotate(${degrees}deg)` }
    },
    secondStyle() {
      const seconds = this.time.getSeconds()
      const degrees = seconds * 6
      return { transform: `rotate(${degrees}deg)` }
    },
    clockClass() {
      if (this.solarNoon) {
        return 'big-clock'
      } else if (this.sys) {
        return 'small-clock'
      }
      return this.sys
    },
  },
}
</script>

<template>
  <div :class="clockClass">
    <div class="clock-thumb">
      <div class="hand hour" :style="hourStyle"></div>
      <div class="hand minute" :style="minuteStyle"></div>
      <div class="hand second" :style="secondStyle"></div>
      <div class="center-dot"></div>
    </div>
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/variables.scss';

.big-clock {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
  width: 130px;
  height: 245px;
  border-radius: 100px;
  background: variables.$prime-bg-color;
}

.small-clock {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 28px;
  width: 105px;
  height: 210px;
  border-radius: 100px;
  background: variables.$prime-bg-color;
}

.clock-thumb {
  position: relative;
}

.hand {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform-origin: bottom;
  transform: rotate(0deg);
  transition: transform 0.1s linear;
}

.hour {
  width: 4px;
  height: 40px;
  background-color: variables.$prime-grey-color;
}

.minute {
  width: 4px;
  height: 50px;
  background-color: variables.$sec-grey-color;
}

.second {
  width: 2px;
  height: 60px;
  background-color: variables.$accent-color;
}

.center-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: variables.$black-color;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

p {
  font-size: 29px;
  font-weight: 400;
}
</style>
