<template>
  <div class="orders">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      ref="ruleFormRef"
    >
      <el-form-item label="订单ID" prop="id">
        <el-input v-model.number="formInline.id" placeholder="请输入故障ID" />
      </el-form-item>
      <el-form-item label="租户ID" prop="tenantId">
        <el-input v-model="formInline.tenantId" placeholder="请输入租户ID" />
      </el-form-item>
      <el-form-item label="租户名称" prop="tenantName">
        <el-input v-model="formInline.tenantName" placeholder="请输入租户名称" />
      </el-form-item>
      <el-form-item label="房东ID" prop="ownerId">
        <el-input v-model="formInline.ownerId" placeholder="请输入房东ID" />
      </el-form-item>
      <el-form-item label="房东名称" prop="ownerName">
        <el-input v-model="formInline.ownerName" placeholder="请输入房东名称" />
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
        @click="goToPath('/order-management/order-detail', 'create')"
        >创建订单</el-button
      >
    </el-form-item>

    <el-table :data="tableData" border>
      <el-table-column prop="id" label="订单ID" width="80" />
      <el-table-column prop="tenantId" label="租户ID" width="100" />
      <el-table-column prop="tenantName" label="租户名称" width="100" />
      <el-table-column prop="ownerId" label="房东ID" width="100" />
      <el-table-column prop="ownerName" label="房东名称" width="100" />
      <el-table-column prop="houseId" label="房屋ID" width="100" />
      <el-table-column prop="houseTitle" label="房屋标题" width="300" />
      <el-table-column prop="troubleStatus" label="订单状态" width="100">
        <template #default="scope">
          <el-tag
            class="mx-1"
            type=""
            v-if="scope.row.orderStatus === orderStatus.isTenant"
            >已开始</el-tag
          >
          <el-tag class="mx-1" type="success" v-else>已终止</el-tag>
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
            @click="goToPath('/order-management/order-detail', 'update', scope.row.id)"
            >更新订单</el-button
          >
          <el-popconfirm title="确定要终止该订单吗？" @confirm="$_handleFix(scope.row)">
            <template #reference>
              <el-button
                :disabled="scope.row.orderStatus === orderStatus.isEnd"
                type="primary"
                size="small"
                >终止订单</el-button
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

import { getOrderList, updateOrder } from "@/service/order";
import { formatFullDate } from "@/utils/format-date";
import { orderStatus } from "@/config/enum";

const router = useRouter();

const ruleFormRef = ref();
const formInline = reactive({
  id: "",
  tenantId: "",
  tenantName: "",
  ownerId: "",
  ownerName: "",
  houseId: "",
  houseTitle: "",
});
const onSubmit = () => {
  paginationConfig.page = 1;
  $_getOrderList(paginationConfig);
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
const $_getOrderList = async () => {
  const { total, orderList, code } = await getOrderList(paginationConfig);
  if (code !== 0) {
    ElMessage.error(error);
    return;
  }
  tableData.value = orderList;
  paginationConfig.total = total;
};
const handleSizeChange = (size) => {
  paginationConfig.size = size;
  paginationConfig.page = 1;
  $_getOrderList(paginationConfig);
};
const handleCurrentChange = (page) => {
  paginationConfig.page = page;
  $_getOrderList(paginationConfig);
};

onMounted(() => {
  $_getOrderList();
});

const goToPath = (path, mode, id) => {
  const query = { mode, id };
  router.push({
    path,
    query,
  });
};

const $_handleFix = async ({ id, orderStatus }) => {
  const { code, msg } = await updateOrder({ id, orderStatus });
  if (code !== 0) {
    ElMessage.error(msg);
    return;
  }
  ElMessage.success(msg);
  $_getOrderList();
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
