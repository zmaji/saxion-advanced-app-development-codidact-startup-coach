// import './assets/main.css'
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import './assets/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import FontAwesome from './plugins/fontAwesome';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(FontAwesome)

app.mount('#app')
