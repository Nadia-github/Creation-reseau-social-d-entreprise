import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import '@mdi/font/css/materialdesignicons.css'
import moment from 'moment';
import * as mdijs from '@mdi/js'



createApp(App).use(vuetify).use(router).mount("#app");
