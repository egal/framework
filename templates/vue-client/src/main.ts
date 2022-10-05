import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import DefaultLayout from './layouts/DefaultLayout.vue'
// @ts-ignore
import egalWidgets from '@egalteam/widget-library'
import '@egalteam/widget-library/dist/style.css'
const app = createApp(App)
app
  .use(router)
  .component('default-layout', DefaultLayout)
  .use(egalWidgets)
  .mount('#app')
