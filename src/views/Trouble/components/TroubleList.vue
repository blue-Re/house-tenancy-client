<template>
  <div class="troubles">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      ref="ruleFormRef"
    >
      <el-form-item label="故障ID" prop="id">
        <el-input v-model.number="formInline.id" placeholder="请输入故障ID" />
      </el-form-item>
      <el-form-item label="故障标题" prop="troubleTitle">
        <el-input v-model="formInline.troubleTitle" placeholder="请输入故障标题" />
      </el-form-item>
      <el-form-item label="故障内容" prop="troubleContent">
        <el-input v-model="formInline.troubleContent" placeholder="请输入故障内容" />
      </el-form-item>
      <el-form-item label="房屋ID" prop="houseId">
        <el-input v-model="formInline.houseId" placeholder="请输入房屋ID" />
      </el-form-item>
      <el-form-item label="房屋标题" prop="houseTitle">
        <el-input v-model="formInline.houseTitle" placeholder="请输入房屋标题" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查 询</el-button>
        <el-button @click="resetForm(ruleFormRef)">重 置</el-button>
      </el-form-item>
    </el-form>

    <el-form-item>
      <el-button
        type="primary"
        @click="goToPath('/trouble-management/trouble-detail', 'create')"
        >提报故障</el-button
      >
    </el-form-item>

    <el-table :data="tableData" border>
      <el-table-column prop="id" label="故障ID" width="80" />
      <el-table-column prop="troubleTitle" label="故障标题" width="100" />
      <el-table-column prop="troubleContent" label="故障内容" width="300" />
      <el-table-column prop="houseId" label="房屋ID" width="100" />
      <el-table-column prop="houseTitle" label="房屋标题" width="300" />
      <el-table-column prop="troubleStatus" label="故障状态" width="100">
        <template #default="scope">
          <el-tag class="mx-1" type="" v-if="scope.row.troubleStatus === troubleStatus.notFixed">未修复</el-tag>
          <el-tag class="mx-1" type="success" v-else>已修复</el-tag>
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
            type="primary"
            size="small"
            @click="goToPath('/trouble-management/trouble-detail', 'update', scope.row.id)"
            >更 新</el-button
          >
          <el-popconfirm title="确定要修复该故障吗？" @confirm="$_handleFix(scope.row)">
            <template #reference>
              <el-button
                :disabled="scope.row.troubleStatus === troubleStatus.isFixed"
                type="primary"
                size="small"
                >修 复</el-button
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


import { getTroubleList, updateTrouble } from "@/service/trouble";
import { formatFullDate } from "@/utils/format-date";
import { typeEnum, troubleStatus } from "@/config/enum";

const router = useRouter();
const userStore = useUserStore()

const ruleFormRef = ref();
const formInline = reactive({
  id: "",
  troubleContent: "",
  troubleTitle: "",
  houseTitle: '',
  houseId: ''
});
const onSubmit = () => {
  paginationConfig.page = 1;
  $_getTroubleList(paginationConfig);
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
const $_getTroubleList = async () => {
  const { total, troubleList, code } = await getTroubleList(paginationConfig);
  if (code !== 0) {
    ElMessage.error(error);
    return;
  }
  tableData.value = troubleList;
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
  $_getTroubleList();
});

const goToPath = (path, mode, id) => {
  if (userStore.getCurrentUserType !== 3 && mode === 'update') {
    ElMessage.info("用户没有权限，禁止操作！");
    return
  }
  const query = { mode, id };
  router.push({
    path,
    query,
  });
};

const $_handleFix = async ({ id, troubleStatus }) => {
  if (userStore.getCurrentUserType !== 3) {
    ElMessage.info("用户没有权限，禁止操作！");
    return
  }
  const { code, msg } = await updateTrouble({ id, troubleStatus });
  if (code !== 0) {
    ElMessage.error(msg);
    return;
  }
  ElMessage.success(msg);
  $_getTroubleList();
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
