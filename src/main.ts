import {createApp} from "vue";
import "./style.css";
import router from "./router";

import {createPinia} from "pinia";

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import {createVuetify} from 'vuetify'


import App from "./App.vue";


const pinia = createPinia();

const vuetify = createVuetify({})

const app = createApp(App);
app.use(pinia);

app.use(router);

app.use(vuetify);

app.mount("#app");



