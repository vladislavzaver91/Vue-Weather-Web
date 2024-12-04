import './assets/styles/main.scss'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)

app.mount('#app')
