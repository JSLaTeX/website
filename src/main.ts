import 'quasar/src/css/index.sass';
import 'virtual:windi.css';
import './css/global.postcss';

import { Quasar } from 'quasar';
import SimpleVueIcon from 'simple-vue-icon';
import { createApp } from 'vue';

import App from './app.vue';

const app = createApp(App);
app.use(SimpleVueIcon);
app.use(Quasar);
app.mount('#app');
