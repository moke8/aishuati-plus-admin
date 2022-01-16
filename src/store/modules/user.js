import { login } from '../../api/user'
export default {
    namespaced:true,
    state: {
        userId: '',
        token: ''
    },
    mutations: {
        setUser(state,data){
            state.userId = data.userId
            state.token = data.token
        }
    },
    actions: {
        async login(store,data){
            const isLogin = await login(data)
            store.commit('setUser',isLogin)
            return isLogin.userId
        }
    }
}