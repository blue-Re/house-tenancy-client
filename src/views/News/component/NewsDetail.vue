<template>
  <div class="news-detail">
    <el-form
      ref="detailFormRef"
      :model="detailForm"
      :rules="detailRules"
      class="demo-ruleForm"
      status-icon
      label-width="120px"
      style="max-width: 460px"
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

      <el-form-item>
        <el-button type="primary" @click="$_handleConfirm(detailFormRef)"
          >确 定</el-button
        >
        <el-button @click="router.back()">返 回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import { ElMessage } from "element-plus";

import { createNews, updateNews, getNewsDetail } from "@/service/news";

const router = useRouter();
const route = useRoute();

const mode = computed(() => route.query.mode);
const id = computed(() => route.query.id);

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

const $_handleConfirm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      switch (mode.value) {
        case "create":
          $_createNews();
          return;
        case "update":
          $_updateNews();
          return;
        default:
          break;
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const goBack = () => {
  setTimeout(() => {
    router.back();
  }, 3000);
};

const $_createNews = async () => {
  const { code, msg } = await createNews(detailForm);
  if (code !== 0) {
    ElMessage.error(msg);
    return;
  }
  ElMessage.success(msg + ' 3s后返回！');
  goBack()
};

const $_updateNews = async () => {
  const params = {
    ...detailForm,
    id: id.value
  }
  const { code, msg } = await updateNews(params);
  if (code !== 0) {
    ElMessage.error(error);
    return;
  }
  ElMessage.success(msg + ' 3s后返回！');
  goBack()
};

const $_getNewsDetail = async(id) => {
  const { code, data: { title, content, author } ={} } = await getNewsDetail({id});
  if (code !== 0) {
    ElMessage.error(error);
    return;
  }
  detailForm.title = title;
  detailForm.content = content;
  detailForm.author = author;
}

onMounted(() => {
  if (mode.value === 'update') {
    $_getNewsDetail(id.value)
  }
})
</script>
