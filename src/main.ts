import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-notification.css'

import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/css/common.scss'
const app = createApp(App)
app.use(router)
app.mount('#app')
