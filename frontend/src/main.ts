// import './assets/main.css'
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/scss/main.scss';
import 'vue-multiselect/dist/vue-multiselect.css';
import 'vue3-toastify/dist/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import FontAwesome from './plugins/fontAwesome';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

const app = createApp(App);

app.use(
  Vue3Toastify,
  {
    autoClose: 5000,
    style: {
      opacity: '1',
      userSelect: 'initial',
    },
  } as ToastContainerOptions,
);
app.use(createPinia())
app.use(router)
app.use(FontAwesome)

app.mount('#app')
