<script>
import TechStackIcons from './TechStackIcons.vue'

export default {
  name: 'WelcomeContent',
  components: {
    TechStackIcons,
  },
}
</script>

<template>
  <div class="content">
    <p class="text">Welcome to</p>
    <div class="head-box">
      <h1 class="head-box__title">Weather Web</h1>
      <img src="/src/assets/images/02d.png" width="250" height="220" class="head-box__img" />
    </div>
    <div class="center-thumb">
      <p class="text">Developed using a technology stack</p>
      <TechStackIcons />
    </div>
    <div class="center-thumb">
      <a
        href="https://github.com/vladislavzaver91"
        target="_blank"
        rel="noopener noreferrer"
        class="signature"
        >VladZaver2024&#169;</a
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/variables.scss';

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.head-box {
  position: relative;
  &__title {
    position: relative;
    font-size: 80px;
    font-weight: 700;
    z-index: 999;
  }

  &__img {
    position: absolute;
    bottom: 0;
    right: 10%;
  }
}

.text {
  font-size: 36px;
  font-weight: 400;
}

.center-thumb {
  margin: 0 auto;
}

.signature {
  font-size: 20px;
  font-weight: 500;
  text-decoration: none;
  color: transparent;
  background-image: linear-gradient(
    90deg,
    variables.$sec-accent-color,
    variables.$sec-bg-color,
    variables.$accent-color,
    variables.$third-accent-color,
    variables.$fours-accent-color,
    variables.$light-sec-bg-color,
    variables.$sec-accent-color
  );
  background-size: 300%;
  background-clip: text;
  -webkit-background-clip: text;
  animation: gradient-shift 5s infinite linear;
  transition:
    transform 0.3s ease-in-out,
    filter 0.3s ease-in-out;

  display: inline-block;
  perspective: 1000px; /* Устанавливаем перспективу */

  &:hover,
  &:focus {
    transform: scale(1.1) translateZ(20px); /* Увеличиваем и "выдвигаем" вперед */
    filter: drop-shadow(variables.$third-box-shadow); /* Добавляем тень */
  }

  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
}
</style>
