<template>
    <div class="user">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="Id" width="80">
            </el-table-column>
            <el-table-column label="头像">
                <template slot-scope="scope">
                    <el-image :src="scope.row.xcxAvatar" />
                </template>
            </el-table-column>
            <el-table-column prop="xcxNickname" label="昵称" width="180">
            </el-table-column>
            <el-table-column prop="xcxOpenid" label="openid"> </el-table-column>
            <el-table-column label="性别">
                <template slot-scope="scope">
                    {{ scope.row.xcxSex ? '男' : '女' }}
                </template>
            </el-table-column>
            <el-table-column label="近7天访问次数">
                <template slot-scope="scope">
                    {{ scope.row.sevenCount}}次
                </template>
            </el-table-column>
            <el-table-column label="近30天访问次数">
                <template slot-scope="scope">
                    {{ scope.row.monthCount}}次
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getWxUserData } from '../../api/wx-user'
export default {
    name: 'User',
    data() {
        return {
            tableData: []
        }
    },
    async created() {
        const wxData = await getWxUserData()
        this.tableData = wxData.data
    },
}
</script>

<style scoped>
.el-image {
    width: 60px;
    height: 60px;
}
</style>
