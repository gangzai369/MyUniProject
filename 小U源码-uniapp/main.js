//导入vue组件
import Vue from 'vue'

// 导入根组件app
import App from './App'

// 取消生产提示
Vue.config.productionTip = false

// 先引入http
import {http} from './utils/http.js'
//把http挂载到原型上
Vue.prototype.$http = http 

//指定根组件类型
App.mpType = 'app'	

// 实例化vue组件
const app = new Vue({
    ...App
})
// 进行挂载
app.$mount()
