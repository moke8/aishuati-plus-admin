import axios from './axios'

export function getOpinion(data) {
    return axios.get('/admin/opinion/list',data).then((res) => {
        return res.data
    })
}

export function getLibrary(data) {
    return axios.get('/admin/library/list',data).then((res) => {
        return res.data
    })
}
