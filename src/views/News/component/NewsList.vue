<template>
  <div class="news">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      ref="ruleFormRef"
    >
      <el-form-item label="新闻ID" prop="id">
        <el-input v-model.number="formInline.id" placeholder="请输入新闻ID" />
      </el-form-item>
      <el-form-item label="新闻标题" prop="title">
        <el-input v-model="formInline.title" placeholder="请输入新闻标题" />
      </el-form-item>
      <el-form-item label="新闻内容" prop="content">
        <el-input v-model="formInline.content" placeholder="请输入新闻内容" />
      </el-form-item>
      <el-form-item label="新闻作者" prop="author">
        <el-input v-model="formInline.author" placeholder="请输入新闻作者" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查 询</el-button>
        <el-button @click="resetForm(ruleFormRef)">重 置</el-button>
      </el-form-item>
    </el-form>

    <el-form-item>
      <el-button
        type="primary"
        @click="goToPath('/news-management/news-detail', 'create')"
        >新 建 新 闻</el-button
      >
    </el-form-item>

    <el-table :data="tableData" border>
      <el-table-column prop="id" label="新闻ID" width="80" />
      <el-table-column prop="title" label="新闻标题" width="100" />
      <el-table-column prop="content" label="新闻内容" width="300" />
      <el-table-column prop="author" label="新闻作者" width="100" />
      <el-table-column prop="online" label="当前状态" width="100">
        <template #default="scope">
          <el-tag class="mx-1" type="" v-if="scope.row.online === newsStatus.online">已上线</el-tag>
          <el-tag class="mx-1" type="info" v-else>已下线</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="200">
        <template #default="scope">
          <span>{{ formatFullDate(scope.row.createdAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间" width="200">
        <template #default="scope">
          <span>{{ formatFullDate(scope.row.updatedAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button
            :disabled="scope.row.online === newsStatus.offline"
            type="primary"
            size="small"
            @click="goToPath('/news-management/news-detail', 'update', scope.row.id)"
            >更 新</el-button
          >
          <el-popconfirm title="确定要下线这条新闻吗？" @confirm="$_offLine(scope.row)">
            <template #reference>
              <el-button
                :disabled="scope.row.online === newsStatus.offline"
                type="primary"
                size="small"
                >下 线</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:currentPage="paginationConfig.page"
      v-model:page-size="paginationConfig.size"
      :page-sizes="[10, 20, 50, 100]"
      small
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="paginationConfig.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";

import { onMounted, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from '@/stores/user';

import { getNewsList, updateNews } from "@/service/news";
import { formatFullDate } from "@/utils/format-date";
import { typeEnum, newsStatus } from "@/config/enum";

const router = useRouter();
const userStore = useUserStore()

const ruleFormRef = ref();
const formInline = reactive({
  id: "",
  content: "",
  title: "",
  author: "",
});
const onSubmit = () => {
  paginationConfig.page = 1;
  $_getNewsList(paginationConfig);
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const tableData = ref([]);
const paginationConfig = reactive({
  page: 1,
  size: 10,
  total: 100,
  ...toRefs(formInline),
});
const $_getNewsList = async () => {
  const { total, newsList, code } = await getNewsList(paginationConfig);
  if (code !== 0) {
    ElMessage.error(error);
    return;
  }
  tableData.value = newsList;
  paginationConfig.total = total;
};
const handleSizeChange = (size) => {
  paginationConfig.size = size;
  paginationConfig.page = 1;
  $_getNewsList(paginationConfig);
};
const handleCurrentChange = (page) => {
  paginationConfig.page = page;
  $_getNewsList(paginationConfig);
};

onMounted(() => {
  $_getNewsList();
});

const goToPath = (path, mode, id) => {
  if (userStore.getCurrentUserType !== 3) {
    ElMessage.info("用户没有权限，禁止操作！");
    return
  }
  const query = { mode, id };
  router.push({
    path,
    query,
  });
};

const $_offLine = async ({ id, online }) => {
  if (userStore.getCurrentUserType !== 3) {
    ElMessage.info("用户没有权限，禁止操作！");
    return
  }
  const { code, msg } = await updateNews({ id, online });
  if (code !== 0) {
    ElMessage.error(msg);
    return;
  }
  ElMessage.success(msg);
  $_getNewsList();
};
</script>

<style lang="less" scoped>
.el-table {
  height: calc(100vh - 330px);
  overflow: auto;

  .description {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}
</style>
