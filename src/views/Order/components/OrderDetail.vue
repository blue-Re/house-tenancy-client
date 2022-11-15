<template>
  <div class="trouble-detail">
    <el-form
      ref="detailFormRef"
      :model="detailForm"
      :rules="detailRules"
      class="demo-ruleForm"
      status-icon
      label-width="120px"
      style="max-width: 460px"
    >
      <el-form-item label="房屋ID" prop="houseId">
        <el-select
          v-model="detailForm.houseId"
          filterable
          remote
          reserve-keyword
          placeholder="请输入房源关键标题信息"
          remote-show-suffix
          :remote-method="$_remoteHouseMethod"
        >
          <el-option
            v-for="item in houseList"
            :key="item.id"
            :label="item.id"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="房屋信息" prop="houseTitle">
        <el-input
          v-model="detailForm.houseTitle"
          placeholder="房屋信息由房屋ID自动带出"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          disabled
        />
      </el-form-item>
      <el-form-item label="租户ID" prop="tenantId">
        <el-select
          v-model="detailForm.tenantId"
          filterable
          remote
          reserve-keyword
          placeholder="请根据租户姓名查找"
          remote-show-suffix
          :remote-method="(keyword) => $_remoteUserMethod(keyword, 2)"
        >
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.id"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="租户名称"
        prop="tenantName"
        aria-placeholder="租户名称由租户ID带出"
      >
        <el-input v-model="detailForm.tenantName" placeholder="租户名称由租户ID带出" />
      </el-form-item>
      <el-form-item label="房东ID" prop="ownerId">
        <el-select
          v-model="detailForm.ownerId"
          filterable
          remote
          reserve-keyword
          placeholder="请根据房东姓名查找"
          remote-show-suffix
          :remote-method="(keyword) => $_remoteUserMethod(keyword, 1)"
        >
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.id"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="房东名称"
        prop="ownerName"
        aria-placeholder="房东名称由房东ID带出"
      >
        <el-input v-model="detailForm.ownerName" placeholder="房东名称由房东ID带出" />
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
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

import { ElMessage } from "element-plus";

import { createOrder, updateOrder, getOrderDetail } from "@/service/order";
import { getUserList } from "@/service/user";
import { getHouseList } from "@/service/house";

import { useUserStore } from "@/stores/user";

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();

const mode = computed(() => route.query.mode);
const id = computed(() => route.query.id);

const detailFormRef = ref();
const houseList = ref([]);
const userList = ref([]);
const detailForm = reactive({
  tenantId: "",
  tenantName: "",
  ownerId: "",
  ownerName: "",
  houseId: "",
  houseTitle: "",
});
const detailRules = reactive({
  houseId: [{ required: true, message: "请选择房源", trigger: "change" }],
  houseTitle: [{ required: true, message: "请输入房屋标题", trigger: "blur" }],

  tenantId: [{ required: true, message: "请输入租户ID", trigger: "blur" }],
  tenantName: [{ required: true, message: "请输入租户名称", trigger: "blur" }],

  ownerId: [{ required: true, message: "请输入房东ID", trigger: "blur" }],
  ownerName: [{ required: true, message: "请输入房东名称", trigger: "blur" }],
});

const $_handleConfirm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      switch (mode.value) {
        case "create":
          $_createOrder();
          return;
        case "update":
          $_updateOrder();
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

const $_createOrder = async () => {
  const params = {
    ...detailForm,
  };
  const { code, msg } = await createOrder(params);
  if (code !== 0) {
    ElMessage.error(msg);
    return;
  }
  ElMessage.success(msg + " 3s后返回！");
  goBack();
};

const $_updateOrder = async () => {
  const params = {
    ...detailForm,
    id: id.value,
  };
  const { code, msg } = await updateOrder(params);
  if (code !== 0) {
    ElMessage.error(error);
    return;
  }
  ElMessage.success(msg + " 3s后返回！");
  goBack();
};

const $_getOrderDetail = async (id) => {
  const { code, data } = await getOrderDetail({ id });
  if (code !== 0) {
    ElMessage.error(error);
    return;
  }
  Object.keys(data).forEach((key) => {
    detailForm[key] = data[key];
  });
};

onMounted(() => {
  if (mode.value === "update") {
    $_getOrderDetail(id.value);
  }
});

const $_remoteHouseMethod = async (keyword) => {
  const params = {
    page: 1,
    size: 10,
    title: keyword,
  };
  const { houseList: house } = await getHouseList(params);
  houseList.value = house;
};

const $_remoteUserMethod = async (keyword, type) => {
  const params = {
    page: 1,
    size: 10,
    username: keyword,
    type,
  };
  const { userList: user } = await getUserList(params);
  userList.value = user;
};

watch(
  () => detailForm.houseId,
  (newValue) => {
    if (newValue && houseList.value.length) {
      const currentHouseInfo = houseList.value.find((item) => item.id === newValue);
      detailForm.houseTitle = currentHouseInfo.title;
    }
  }
);

watch(
  () => detailForm.ownerId,
  (newValue) => {
    if (newValue && userList.value.length) {
      const currentUserInfo = userList.value.find((item) => item.id === newValue);
      detailForm.ownerName = currentUserInfo.username;
      userList.value = [];
    }
  }
);

watch(
  () => detailForm.tenantId,
  (newValue) => {
    console.log(newValue);
    if (newValue && userList.value.length) {
      const currentUserInfo = userList.value.find((item) => item.id === newValue);
      console.log(currentUserInfo, userList.value);
      detailForm.tenantName = currentUserInfo.username;
      userList.value = [];
    }
  }
);
</script>
