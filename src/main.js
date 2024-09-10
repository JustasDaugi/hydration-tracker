import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

import App from './App.vue'
import router from './router'
import Datepicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
app.use(vuetify)

app.use(router)
app.use(Datepicker)

app.mount('#app')




// import './assets/main.css'

// import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// import { createVuetify } from 'vuetify'
// import 'vuetify/styles'

// import App from './App.vue'
// import router from './router'
// import Datepicker from 'vue-datepicker-next'
// import 'vue-datepicker-next/index.css'

// const app = createApp(App)

// const pinia = createPinia()
// app.use(pinia)

// const vuetify = createVuetify()
// app.use(vuetify)

// app.use(router)
// app.use(Datepicker)

// app.mount('#app')
