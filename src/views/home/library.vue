<template>
    <div class="user">
        <div class="add">
            <el-input v-model="libraryName" placeholder="请输入题库名称" />
            <el-input v-model="libraryDescribe" placeholder="请输入题库描述" />
            <input
                type="file"
                @change="fileUp"
                ref="file"
                class="file-input"
                accept=".json,.xlsx"
            />
            <el-button @click="up" class="el-icon-upload file-btn" round>
                上传</el-button
            >
            <el-button @click="addLibrary" type="primary" round>
                确认提交</el-button
            >
        </div>
        <el-table
            :data="tableData"
            style="width: 100%; margin-top: 30px"
            @row-click="toSubject"
            :key="tableVersion"
        >
            <el-table-column prop="id" label="Id" width="80" sortable>
            </el-table-column>
            <el-table-column prop="title" label="标题" width="180">
            </el-table-column>
            <el-table-column prop="descr" label="描述"> </el-table-column>
            <el-table-column
                prop="sevenCount"
                label="近7天访问次数"
                :formatter="
                    (row) => {
                        return row.sevenCount + '次'
                    }
                "
                sortable
            />
            <el-table-column
                prop="monthCount"
                label="近30天访问次数"
                :formatter="
                    (row) => {
                        return row.monthCount + '次'
                    }
                "
                sortable
            />
            <el-table-column label="是否置顶">
                <template slot-scope="scope">
                    <el-switch
                        :value="!!Number(scope.row.orderNum)"
                        @change="setStar(scope.$index, scope.row.orderNum)"
                        active-color="#13ce66"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button
                    >
                    <input
                        type="file"
                        @change="fileAppend(scope.$index, scope.row)"
                        :ref="'append' + scope.$index"
                        class="file-input"
                        accept=".json,.xlsx"
                    />
                    <el-button
                        style="margin-left: 10px"
                        size="mini"
                        type="primary"
                        @click="handleAppend(scope.$index, scope.row)"
                        >追加</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {
    getLibrary,
    libraryAdd,
    delLibrary,
    setLibraryStar,
    libraryAppend,
    setLibrary
} from '../../api/library'
export default {
    name: 'User',
    data() {
        return {
            tableData: [],
            libraryName: '',
            libraryDescribe: '',
            file: '',
            tableVersion: 0
        }
    },
    async created() {
        this.init()
    },
    methods: {
        async init() {
            const data = await getLibrary()
            this.tableData = data.data
        },
        up() {
            this.$refs.file.click()
        },
        fileUp() {
            const file = this.$refs.file.files[0]
            this.file = file
        },
        handleAppend(index) {
            this.$refs['append' + index].click()
        },
        async fileAppend(index, data) {
            const file = this.$refs['append' + index].files[0]
            const formdata = new FormData()
            formdata.append('id', data.id)
            formdata.append('file', file)
            console.log(formdata)
            await libraryAppend(formdata)
            this.$message({
                type: 'success',
                message: '追加成功!',
            })
        },
        async addLibrary() {
            const data = new FormData()
            data.append('name', this.libraryName)
            data.append('describe', this.libraryDescribe)
            data.append('file', this.file)
            await libraryAdd(data)
            this.$message({
                type: 'success',
                message: '添加成功!',
            })
            this.init()
        },
        handleDelete(index, data) {
            this.$confirm('此操作将永久删除该题库, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                delLibrary({
                    id: data.id,
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    })
                    this.init()
                })
            })
        },
        async setStar(index, data) {
            await setLibraryStar({
                id: this.tableData[index].id,
                isStar: Number(!Number(data)),
            })
            this.tableData[index].orderNum = !Number(data)
            if (!Number(data)) {
                this.$message({
                    type: 'success',
                    message: '置顶成功!',
                })
            } else {
                this.$message({
                    type: 'success',
                    message: '取消成功!',
                })
            }
        },
        toSubject(row, column) {
            if (column.property === 'id') {
                this.$router.push({
                    path: '/subject/' + row.id,
                })
            } else if (
                column.property === 'title' ||
                column.property === 'descr'
            ) {
                let defaultValue = row[column.property]
                this.$prompt('请输入要修改的内容', '题库修改', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue: defaultValue,
                })
                    .then(({ value }) => {
                        row[column.property] = value
                        setLibrary(row).then(
                            () => {
                                this.$message({
                                    type: 'success',
                                    message: '更新成功!',
                                })
                                this.tableVersion += 1
                            },
                            () => {
                                // 重置
                                row[column.property] = defaultValue
                            }
                        )
                    })
                    .catch(() => {})
            }
        },
    },
}
</script>

<style scoped>
.add {
    text-align: right;
    /* display: flex;
    justify-content: right; */
}
.el-image {
    width: 60px;
    height: 60px;
}
.upfile {
    position: relative;
}
.el-input {
    width: auto;
    margin-right: 10px;
}
.file-input {
    width: 120px;
    height: 40px;
    position: absolute;
    opacity: 0;
    z-index: -1;
}
</style>
