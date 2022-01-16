import axios from 'axios'
import store from '../store'
import { Loading, Message } from 'element-ui'

let requestNum = 0

axios.defaults.baseURL = process.env.VUE_APP_BASEURL

axios.interceptors.request.use(
    (config) => {
        if (config.headers.loading !== false) {
            requestNum += 1
            Loading.service({ fullscreen: true })
        }
        if (store.state.user.token){
            config.headers.authorization = store.state.user.token
        }
        return config
    },
    (error) => {
        return Promise.reject(error.response)
    }
)

axios.interceptors.response.use(
    (response) => {
        if (response.config.headers.loading !== false) {
            requestNum -= 1
            if (requestNum === 0) {
                Loading.service({ fullscreen: true }).close()
            }
        }
        if(response.data.code === 500){
            const msg = response?.data?.msg ?? '网络链接错误'
            Message.error(msg)
            return Promise.reject()
        }
        if(response.data.code === 302){
            const msg = '登录超时，正在为您跳转到登录页'
            Message.error(msg)
            window.location.hash='/login'
            return Promise.reject()
        }
        return response
    },
    (error) => {
        requestNum -= 1
        Loading.service({ fullscreen: true }).close()
        const msg = error.response?.data?.msg ?? '网络链接错误'
        Message.error(msg)
    }
)

export default axios