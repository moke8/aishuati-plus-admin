import axios from './axios'

export function login(data) {
    return axios.post('/admin/user/login',data).then((res) => {
        return res.data
    })
}
