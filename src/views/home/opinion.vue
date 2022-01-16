<template>
    <div class="opinion">
        <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="id" label="Id" width="80">
            </el-table-column>
            <el-table-column prop="content" label="反馈内容" width="180">
            </el-table-column>
            <el-table-column prop="contact" label="联系方式"> </el-table-column>
            <el-table-column prop="datetime" label="提交时间"> </el-table-column>
            <el-table-column prop="libraryTitle" label="错误题库"> </el-table-column>
            <el-table-column prop="subjectTitle" label="错误题目"> </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getOpinion } from '../../api/opinion'
export default {
    name: 'User',
    data() {
        return {
            tableData: [],
        }
    },
    async created() {
        const data = await getOpinion()
        this.tableData = data.data
    },
    methods: {
    },
}
</script>

<style scoped>
</style>
