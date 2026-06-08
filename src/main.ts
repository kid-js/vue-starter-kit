import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { addCollection } from '@iconify/vue'

import icons from './assets/icons/icons.json'
import ui from '@nuxt/ui/vue-plugin'

import { router } from './router'
import { setRouter } from './api/setup'

import App from './App.vue'

import '@/styles/nuxt-ui/style.css'
import '@/styles/base/main.scss'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(ui)

setRouter(router)
addCollection(icons)

app.mount('#app')
