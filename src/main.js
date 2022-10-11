import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt';

import './assets/main.css'

const emitter = mitt();

const app = createApp(App)

app.config.globalProperties.apiUrl = 'http://localhost:8080'

app.config.globalProperties.catalogs = {
    common: {
        status: {
            A: 'Active',
            I: 'Inactive'
        }
    },
    types: {
        duration: {
            O: 'Only once',
            P: 'Permanent'
        }
    }
}

app.config.globalProperties.emitter = emitter;

app.use(router)

app.mount('#app')
