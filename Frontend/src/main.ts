import { createApp } from "vue";
import router from "./router";
import {UserStore,UserKey} from "./store/userStore";
import { Quasar, Notify } from "quasar";
import langRu from 'quasar/lang/ru'

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(UserStore,UserKey);
app.use(Quasar, {
    plugins: { Notify },
    lang:langRu
});
app.mount("#app");