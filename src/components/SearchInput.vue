<script>
import { Search } from '@element-plus/icons-vue'

export default {
  components: {
    Search,
  },
  props: {
    city: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      expanded: false,
      localCity: this.city,
    }
  },
  methods: {
    expandInput() {
      this.expanded = true
    },
    collapseInput() {
      if (!this.localCity.trim()) {
        this.expanded = false
      }
    },
    sendInput() {
      if (this.localCity.trim()) {
        this.$emit('update:city', this.localCity)
        this.$emit('submit')
        this.localCity = ''
        this.expanded = false
      }
    },
  },
}
</script>

<template>
  <div @mouseenter="expandInput" @mouseleave="collapseInput" class="search-input">
    <div
      class="input-container"
      :style="{ width: expanded ? '400px' : '58px', transition: 'width 0.3s' }"
    >
      <input v-model="localCity" class="search-input-field" @keyup.enter="sendInput" type="text" />
      <Search class="search-icon" />
    </div>
    <button v-if="expanded" class="search-btn" @click="sendInput" type="button">Search</button>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/variables.scss';

.search-input {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  border: 1px solid variables.$prime-color;
  border-radius: 20px;
  transition: width 0.3s;
}

.search-input-field {
  width: 100%;
  height: 100%;
  padding: 8px 46px 8px 12px;
  font-size: 22px;
  color: variables.$prime-color;
  border: none;
  outline: none;
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    variables.$sec-bg-color 0%,
    variables.$light-sec-bg-color 100%
  );
}

.search-icon {
  position: absolute;
  right: 12px;
  width: 26px;
  height: 26px;
  color: variables.$prime-color;
  pointer-events: none;
}

.search-btn {
  background-color: transparent;
  color: variables.$prime-color;
  border: 1px solid variables.$prime-color;
  height: 60px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: variables.$sec-bg-color;
  }
}
</style>
