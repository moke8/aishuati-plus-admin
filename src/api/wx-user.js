import axios from './axios'

export function getWxUserData(data) {
    return axios.get('/admin/wechat/user',data).then((res) => {
        return res.data
    })
}
