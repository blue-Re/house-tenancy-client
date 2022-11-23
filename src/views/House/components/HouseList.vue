<script setup>
import { ElMessage } from "element-plus";

import { useRouter } from "vue-router";
import { onMounted, reactive, ref, toRefs } from "vue";

import { getHouseList, deleteHouse } from "@/service/house";
import { formatFullDate } from "@/utils/format-date";

const router = useRouter();

const ruleFormRef = ref();
const formInline = reactive({
  id: "",
  title: "",
});

const onSubmit = () => {
  paginationConfig.page = 1;
  $_getHouseList(paginationConfig);
};
const resetForm = (formEl) => {
  // console.log(formEl);
  if (!formEl) return;
  formEl.resetFields();
};

const handleClick = () => {
  console.log("click");
};

const tableData = ref([]);
const paginationConfig = reactive({
  page: 1,
  size: 10,
  total: 100,
  ...toRefs(formInline),
});
const $_getHouseList = async () => {
  const { total, houseList, code } = await getHouseList(paginationConfig);
  if (code !== 0) {
    ElMessage.error(error);
    return;
  }
  tableData.value = houseList;
  paginationConfig.total = total;
};

const $_handleDelete = async(id) => {
  const { code, msg } = await deleteHouse({ id });
  if (code !== 0) {
    ElMessage.error(msg);
    return;
  }
  ElMessage.success(msg);
  $_getHouseList(paginationConfig);
}

const handleSizeChange = (size) => {
  paginationConfig.size = size;
  paginationConfig.page = 1;
  $_getHouseList(paginationConfig);
};
const handleCurrentChange = (page) => {
  paginationConfig.page = page;
  $_getHouseList(paginationConfig);
};

const goToPath = (path, mode, id) => {
  const query = { mode, id };
  router.push({
    path,
    query,
  });
};

onMounted(() => {
  $_getHouseList();
});
</script>

<template>
  <div class="house">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      ref="ruleFormRef"
    >
      <el-form-item label="房屋ID" prop="id">
        <el-input v-model.number="formInline.id" placeholder="请输入房屋ID" />
      </el-form-item>
      <el-form-item label="房屋标题" prop="title">
        <el-input v-model="formInline.title" placeholder="请输入房屋标题" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查 询</el-button>
        <el-button @click="resetForm(ruleFormRef)">重 置</el-button>
      </el-form-item>
    </el-form>

    <el-form-item>
      <el-button
        type="primary"
        @click="goToPath('/house-management/house-detail', 'create')"
        >新 建 房 屋</el-button>
    </el-form-item>

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="id" label="房屋ID" width="100" />
      <el-table-column prop="houseCode" label="房屋编码" width="120" />
      <el-table-column prop="title" label="房屋标题" width="120" />
      <el-table-column prop="description" label="房屋描述" width="300">
        <template #default="scope">
          <div class="description">{{ scope.row.description || "暂无房源描述" }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="price_num" label="房屋价格" width="200" />
      <el-table-column prop="room_type_name" label="房子规格" width="120" />
      <el-table-column prop="community" label="社区" width="120" />
      <el-table-column prop="floor" label="楼层" width="120" />
      <el-table-column prop="priceType" label="押金类型" width="120" />
      <el-table-column prop="area_name" label="房源地区" width="120" />
      <el-table-column prop="tags" label="特点" width="120" />
      <el-table-column prop="lineNum" label="地铁线" width="120" />
      <el-table-column prop="size" label="房屋面积" width="120" />
      <el-table-column prop="createdAt" label="创建时间" width="300">
        <template #default="scope">
          <span>{{ formatFullDate(scope.row.createdAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间" width="300">
        <template #default="scope">
          <span>{{ formatFullDate(scope.row.updatedAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" @click="goToPath('/house-management/house-detail', 'update', scope.row.id)"
            >更新房源</el-button
          >
          <el-button type="primary" size="small" @click="$_handleDelete(scope.row.id)">下架房源</el-button>
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

<style lang="less" scoped>
.el-table {
  height: calc(100vh - 280px) !important;
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
