import axios from './axios'

export function libraryAdd(data) {
    return axios.post('/admin/library/add',data,{
        headers: {'Content-Type': 'multipart/form-data'}
    }).then((res) => {
        return res.data
    })
}

export function getLibrary(data) {
    return axios.get('/admin/library/list',data).then((res) => {
        return res.data
    })
}

export function delLibrary(data) {
    return axios.post('/admin/library/del',data).then((res) => {
        return res.data
    })
}

export function setLibraryStar(data) {
    return axios.post('/admin/library/star',data).then((res) => {
        return res.data
    })
}

export function libraryAppend(data) {
    return axios.post('/admin/library/append',data).then((res) => {
        return res.data
    })
}

export function getSubject(data) {
    console.log(axios)
    return axios.get('/admin/library/getSubject',{params: data}).then((res) => {
        return res.data
    })
}

export function setSubject(data) {
    return axios.post('/admin/library/setSubject',data).then((res) => {
        return res.data
    })
}
export function delSubject(data) {
    return axios.post('/admin/library/delSubject',data).then((res) => {
        return res.data
    })
}

export function setLibrary(data) {
    return axios.post('/admin/library/set',data).then((res) => {
        return res.data
    })
}
