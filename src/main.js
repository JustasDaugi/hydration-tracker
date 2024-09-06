import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Datepicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Datepicker)
app.mount('#app')
