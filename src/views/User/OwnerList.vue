<template>
  <div class="owner-list">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      ref="ruleFormRef"
    >
      <el-form-item label="房东ID" prop="id">
        <el-input v-model.number="formInline.id" placeholder="请输入房东ID" />
      </el-form-item>
      <el-form-item label="房东姓名" prop="username">
        <el-input v-model="formInline.username" placeholder="请输入房东姓名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查 询</el-button>
        <el-button @click="resetForm(ruleFormRef)">重 置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border>
      <el-table-column prop="id" label="房东ID" />
      <el-table-column prop="username" label="房东姓名" />
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
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";

import { onMounted, reactive, ref, toRefs } from "vue";

import { getUserList } from "@/service/user";
import { typeEnum } from "@/config/enum";

const ruleFormRef = ref();
const formInline = reactive({
  id: "",
  username: "",
});

const onSubmit = () => {
  paginationConfig.page = 1;
  $_getUserList(paginationConfig);
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
  type: typeEnum.owner,
  ...toRefs(formInline),
});
const $_getUserList = async () => {
  const { total, userList, code } = await getUserList(paginationConfig);
  if (code !== 0) {
    ElMessage.error(error);
    return;
  }
  tableData.value = userList;
  paginationConfig.total = total;
};
const handleSizeChange = (size) => {
  paginationConfig.size = size;
  paginationConfig.page = 1;
  $_getUserList(paginationConfig);
};
const handleCurrentChange = (page) => {
  paginationConfig.page = page;
  $_getUserList(paginationConfig);
};

onMounted(() => {
  $_getUserList();
});
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
