<script>
import { TECH_STACK_ICONS } from '@/constants'

export default {
  name: 'TechStackIcons',
  data() {
    return {
      icons: TECH_STACK_ICONS,
      hoveredIcon: null,
    }
  },
}
</script>

<template>
  <div class="tech-stack">
    <div
      v-for="icon in icons"
      :key="icon.name"
      class="icon-container"
      @mouseenter="hoveredIcon = icon.name"
      @mouseleave="hoveredIcon = null"
    >
      <img
        :src="icon.path"
        :alt="icon.name"
        :class="{ hovered: hoveredIcon === icon.name }"
        class="tech-icon"
      />
      <div v-if="hoveredIcon === icon.name" class="icon-label">
        {{ icon.name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/variables.scss';

.tech-stack {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
}

.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.tech-icon {
  width: 150px;
  height: 75px;
  filter: grayscale(100%) brightness(65%) blur(2px);
  transition: filter 0.3s ease;
  cursor: pointer;
}

.tech-icon.hovered {
  transform: scale(1.1);
  filter: grayscale(0%) brightness(100%) blur() drop-shadow(variables.$third-box-shadow);
}

.icon-label {
  position: absolute;
  bottom: -54px;
  font-size: 16px;
  color: variables.$third-grey-color;
  background: variables.$prime-grey-color;
  padding: 4px 8px;
  border-radius: 8px;
  box-shadow: variables.$box-shadow;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
