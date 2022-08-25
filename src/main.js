import { createApp } from 'vue';
// import App from './App.vue';
import Login from './components/Login.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const app = createApp(Login);
import gAuthPlugin from 'vue3-google-oauth2';
let gauthClientId = '676785461988-icoil0dtlld2fcp5kb22llst7t94mans.apps.googleusercontent.com';
app.use(gAuthPlugin, {
  clientId: gauthClientId,
  scope: 'email',
  prompt: 'consent',
})

app.mount('#app');
