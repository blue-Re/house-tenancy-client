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
      <el-form-item label="故障标题" prop="troubleTitle">
        <el-input v-model="detailForm.troubleTitle" placeholder="请输入故障标题">
        </el-input>
      </el-form-item>
      <el-form-item label="故障内容" prop="troubleContent">
        <el-input
          v-model="detailForm.troubleContent"
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
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

import { ElMessage } from "element-plus";

import { createTrouble, getTroubleDetail, updateTrouble } from "@/service/trouble";
import { getHouseList } from "@/service/house";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();

const mode = computed(() => route.query.mode);
const id = computed(() => route.query.id);

const detailFormRef = ref();
const houseList = ref([]);
const detailForm = reactive({
  houseId: "",
  troubleTitle: "",
  troubleContent: "",
  houseTitle: "",
});
const detailRules = reactive({
  houseId: [{ required: true, message: "请选择房源", trigger: "change" }],
  houseTitle: [{ required: true, message: "请输入房屋标题", trigger: "blur" }],
  troubleTitle: [{ required: true, message: "请输入故障标题", trigger: "blur" }],
  troubleContent: [{ required: true, message: "请输入故障内容", trigger: "blur" }],
});

const $_handleConfirm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      switch (mode.value) {
        case "create":
          $_createTrouble();
          return;
        case "update":
          $_updateTrouble();
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

const $_createTrouble = async () => {
  const params = {
    ...detailForm,
  };
  const { code, msg } = await createTrouble(params);
  if (code !== 0) {
    ElMessage.error(msg);
    return;
  }
  ElMessage.success(msg + " 3s后返回！");
  goBack();
};

const $_updateTrouble = async () => {
  const params = {
    ...detailForm,
    id: id.value,
  };
  const { code, msg } = await updateTrouble(params);
  if (code !== 0) {
    ElMessage.error(error);
    return;
  }
  ElMessage.success(msg + " 3s后返回！");
  goBack();
};

const $_getTroubleDetail = async (id) => {
  const {
    code,
    data: { troubleTitle, troubleContent, houseId, houseTitle } = {},
  } = await getTroubleDetail({ id });
  if (code !== 0) {
    ElMessage.error(error);
    return;
  }
  detailForm.troubleTitle = troubleTitle;
  detailForm.troubleContent = troubleContent;
  detailForm.houseId = houseId;
  detailForm.houseTitle = houseTitle;
};

onMounted(() => {
  if (mode.value === "update") {
    $_getTroubleDetail(id.value);
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

watch(
  () => detailForm.houseId,
  (newValue) => {
    if (newValue && houseList.value.length) {
      const currentHouseInfo = houseList.value.find((item) => item.id === newValue);
      detailForm.houseTitle = currentHouseInfo.title;
    }
  }
);
</script>
