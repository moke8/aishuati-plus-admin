<template>
    <div class="login">
        <div class="login-block">
            <div class="title">欢迎回来</div>
            <el-input
                class="input"
                placeholder="请输入用户名"
                v-model="userName"
            />
            <el-input
                class="input"
                placeholder="请输入密码"
                v-model="password"
                show-password
            />
            <el-button
                class="login-btn"
                @click="login"
                type="primary"
                size="medium"
                round
                >登录</el-button
            >
        </div>
    </div>
</template>

<script>

export default {
    name: 'Login',
    data() {
        return {
            userName: '',
            password: '',
        }
    },
    methods: {
        async login() {
            if (!this.userName) {
                this.$message('请输入用户名')
                return
            }
            if (!this.password) {
                this.$message('请输入密码')
                return
            }
            const user = await this.$store.dispatch('user/login',{
                userName: this.userName,
                password: this.password
            })
            if(user){
                this.$message.success('登录成功')
                this.$router.push({
                    path: '/'
                })
            }
        },
    },
}
</script>

<style scoped>
.login {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}
.login-block {
    width: 300px;
    height: 400px;
    margin: -100px auto;
}
.login-btn {
    width: 200px;
    height: 50px;
    font-size: 18px;
    margin-top: 20px;
}
.title {
    font-size: 30px;
    margin-bottom: 10px;
}
.input {
    margin-top: 10px;
}
</style>
