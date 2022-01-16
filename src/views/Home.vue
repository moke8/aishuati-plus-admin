<template>
    <el-container>
        <!-- <el-header></el-header> -->
        <el-aside>
            <el-menu
                default-active="0"
                class="el-menu-vertical-demo"
                @select="menuSelect"
            >
                <h5>菜单</h5>
                <el-menu-item
                    v-for="(item, index) in menu"
                    :key="index"
                    :index="'' + index"
                >
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.name }}</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view />
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            menu: [
                // {
                //     name: '控制台',
                //     path: '/',
                //     icon: 'el-icon-s-home',
                // },
                {
                    name: '题库管理',
                    path: '/library',
                    icon: 'el-icon-upload',
                },
                {
                    name: '题目管理',
                    path: '/subject',
                    icon: 'el-icon-s-order',
                },
                {
                    name: '用户管理',
                    path: '/user',
                    icon: 'el-icon-user-solid',
                },
                {
                    name: '用户反馈',
                    path: '/opinion',
                    icon: 'el-icon-s-comment',
                },
            ],
        }
    },
    methods: {
        menuSelect(event) {
            this.$router.push({
                path: this.menu[event].path,
            })
        },
    },
}
</script>
<style scoped>
.el-aside {
    width: 200px !important;
    min-height: 100vh;
}
.el-menu {
    min-height: 100vh;
}
</style>
