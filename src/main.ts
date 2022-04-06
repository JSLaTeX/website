import { createApp } from 'vue';
import { Quasar } from 'quasar';
import SimpleVueIcon from 'simple-vue-icon';
import App from './app.vue';
import 'quasar/src/css/index.sass';
import 'virtual:windi.css';
import './css/global.postcss';

const app = createApp(App);
app.use(SimpleVueIcon);
app.use(Quasar);
app.mount('#app');
