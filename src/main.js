import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui' //element-ui的全部组件
import axios from "axios";
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.prototype.$http.defaults.baseURL = 'http://47.93.96.83:8082'
new Vue({
    el: '#app',
    render: h => h(App),
    router,
    ElementUI,
    components: { App, axios },
    template: '<App/>'
})