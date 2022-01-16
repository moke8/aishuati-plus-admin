<template>
    <div class="subject">
        <div class="search">
            <el-input
                v-model="subjectSearch"
                placeholder="请输入要搜索的题目标题"
            />
            <el-button @click="search" type="primary" round> 搜索</el-button>
        </div>
        <el-table
            :data="tableData"
            @cell-click="setData"
            style="width: 100%; margin-top: 30px"
            :key="tableVersion"
        >
            <el-table-column prop="id" label="Id" width="80" sortable>
            </el-table-column>
            <el-table-column
                prop="libraryName"
                label="题库名称"
                width="180"
            ></el-table-column>
            <el-table-column prop="title" label="标题" width="180">
            </el-table-column>
            <el-table-column prop="options[0]" label="选项A"> </el-table-column>
            <el-table-column prop="options[1]" label="选项B"> </el-table-column>
            <el-table-column prop="options[2]" label="选项C"> </el-table-column>
            <el-table-column prop="options[3]" label="选项D"> </el-table-column>
            <el-table-column prop="options[4]" label="选项E"> </el-table-column>
            <el-table-column prop="answer" label="答案"> </el-table-column>
            <el-table-column prop="analysis" label="解析"> </el-table-column>
            <el-table-column
                prop="count"
                label="错题次数"
                :formatter="
                    (row) => {
                        return row.count + '次'
                    }
                "
                sortable
            >
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click.stop="delSubject(scope.$index,scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getSubject, setSubject, delSubject } from '../../api/library'
export default {
    name: 'User',
    data() {
        return {
            tableData: [],
            tableVersion: 1,
            subjectSearch: '',
            libraryId: '',
        }
    },
    async created() {
        if (this.$route.params.id) {
            this.libraryId = this.$route.params.id
            this.search()
        }
        else{
            this.search()
        }
    },
    methods: {
        setData(row, column) {
            let defaultValue = ''
            let notOption = true
            if (/options/.test(column.property)) {
                const index = Number(column.property.replace(/[^0-9]/gi, ''))
                defaultValue = row.options[index]
                notOption = index
            } else if (/(title|answer|analysis)/.test(column.property)) {
                defaultValue = row[column.property]
                notOption = column.property
            } else {
                this.$message('该单元格不可修改')
                return
            }
            this.$prompt('请输入要修改的内容', '题目修改', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue: defaultValue,
            })
                .then(({ value }) => {
                    if (typeof notOption === 'number') {
                        row.options[notOption] = value
                    } else {
                        row[notOption] = value
                    }
                    setSubject(row).then(
                        () => {
                            this.$message({
                                type: 'success',
                                message: '更新成功!',
                            })
                            this.tableVersion += 1
                        },
                        () => {
                            // 重置
                            if (typeof notOption === 'number') {
                                row.options[notOption] = defaultValue
                            } else {
                                row[notOption] = defaultValue
                            }
                        }
                    )
                })
                .catch(() => {})
        },
        async search() {
            const data = await getSubject({
                title: this.subjectSearch,
                id: this.libraryId,
            })
            this.tableData = data.map((item) => {
                item.options = JSON.parse(item.opt)
                return item
            })
        },
        async delSubject(index,row) {
            await this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
            await delSubject({ id: row.id })
            this.$message({
                type: 'success',
                message: '删除成功!',
            })
            this.tableData.splice(index,1)
            this.tableVersion += 1
        },
    },
}
</script>

<style scoped>
.search {
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
