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
      <el-button type="primary" @click="openDiaLog('create')">新 建 新 闻</el-button>
    </el-form-item>

    <el-table :data="tableData" border>
      <el-table-column prop="id" label="新闻ID" />
      <el-table-column prop="title" label="新闻标题" />
      <el-table-column prop="content" label="新闻内容" />
      <el-table-column prop="author" label="新闻作者" />
      <el-table-column prop="createdAt" label="创建时间" />
      <el-table-column prop="updatedAt" label="更新时间" />
      <el-table-column fixed="right" label="操作">
        <template #default>
          <el-button link type="primary" size="small">查 询</el-button>
          <el-button link type="primary" size="small">重 置</el-button>
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

    <el-dialog
      v-model="isShowDetailForm"
      title="Warning"
      width="30%"
      center
      @close="detailFormClose"
    >
      <el-form
        ref="detailFormRef"
        :model="detailForm"
        :rules="detailRules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="新闻发布者" prop="author">
          <el-input v-model="detailForm.author" />
        </el-form-item>
        <el-form-item label="新闻标题" prop="title">
          <el-input v-model="detailForm.title" placeholder="请输入新闻标题"> </el-input>
        </el-form-item>
        <el-form-item label="新闻内容" prop="content">
          <el-input
            v-model="detailForm.content"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="detailFormClose">取 消</el-button>
          <el-button type="primary" @click="handleConfirm(detailFormRef, 'create')">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";

import { onMounted, reactive, ref, toRefs } from "vue";

import { getNewsList, createNews } from "@/service/news";
import { typeEnum } from "@/config/enum";


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

// 有关子组件相关的操作
let isShowDetailForm = ref(false);
const openDiaLog = (mode) => {
  isShowDetailForm.value = true;
};

const handleOffDiaLog = (payload) => {
  isShowDetailForm.value = payload;
};

const detailFormClose = () => {
  isShowDetailForm.value = false;
}

const detailFormRef = ref();
const detailForm = reactive({
  id: "",
  title: "",
  author: "",
  content: "",
});
const detailRules = reactive({
  title: [{ required: true, message: "请输入新闻标题", trigger: "blur" }],
  author: [{ required: true, message: "请输入新闻作者", trigger: "blur" }],
  content: [{ required: true, message: "请输入新闻内容", trigger: "blur" }],
});

const handleConfirm = async (formEl, type) => {
  console.log(formEl, type);

  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // console.log("submit!");
      switch (type) {
        case 'create':
          $_createNews()
          return;
        default:

          break;
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const $_createNews = async() => {
  const { code } = await createNews(detailForm)
  if (code !== 0) {
    ElMessage.error(error)
    return
  }
  ElMessage.success('创建新闻成功！')
  isShowDetailForm.value = false;
  $_getNewsList()
}
</script>

<style lang="less" scoped>
.el-table {
  height: calc(100vh - 230px) !important;
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
