<template>
  <div class="house-detail">
    <el-form
      ref="detailFormRef"
      :model="detailForm"
      :rules="detailRules"
      class="demo-ruleForm"
      status-icon
      label-width="120px"
      style="max-width: 460px"
    >
      <el-form-item label="房屋标题" prop="title">
        <el-input v-model="detailForm.title" placeholder="请输入房屋标题"/>
      </el-form-item>
      <el-form-item label="房屋描述" prop="description">
        <el-input
          v-model="detailForm.description"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="请输入房屋描述"
        />
      </el-form-item>
      <el-form-item label="房屋价格" prop="price_num">
        <el-input v-model.number="detailForm.price_num" placeholder="请输入房屋价格"> </el-input>
      </el-form-item>
      <el-form-item label="房子规格" prop="room_type_name">
        <el-input v-model="detailForm.room_type_name" placeholder="请输入房子规格">
        </el-input>
      </el-form-item>
      <el-form-item label="社区" prop="community">
        <el-input v-model="detailForm.community" placeholder="请输入社区"> </el-input>
      </el-form-item>
      <el-form-item label="楼层" prop="floor">
        <el-input v-model="detailForm.floor" placeholder="请输入楼层"> </el-input>
      </el-form-item>
      <el-form-item label="押金类型" prop="priceType">
        <el-input v-model="detailForm.priceType" placeholder="请输入押金类型"> </el-input>
      </el-form-item>
      <el-form-item label="房源地区" prop="area_name">
        <el-input v-model="detailForm.area_name" placeholder="请输入房源地区"> </el-input>
      </el-form-item>
      <el-form-item label="特点" prop="tags">
        <el-input v-model="detailForm.tags" placeholder="请输入房屋特点"> </el-input>
      </el-form-item>
      <el-form-item label="地铁线" prop="lineNum">
        <el-input v-model="detailForm.lineNum" placeholder="请输入地铁线"> </el-input>
      </el-form-item>
      <el-form-item label="房屋面积" prop="size">
        <el-input v-model.number="detailForm.size" placeholder="请输入房屋面积"> </el-input>
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

import { createHouse, updateHouse, getHouseDetail } from "@/service/house";

const router = useRouter();
const route = useRoute();

const mode = computed(() => route.query.mode);
const id = computed(() => route.query.id);

const detailFormRef = ref();
const detailForm = reactive({
  id: "",
  title: "",
  description: "",
  content: "",
  price_num: "",
  room_type_name: "",
  community: "",
  floor: "",
  priceType: "",
  area_name: "",
  tags: "",
  lineNum: "",
  size: "",
});
const detailRules = reactive({
  title: [{ required: true, message: "请输入对应内容", trigger: "blur" }],
  description: [{ required: true, message: "请输入对应内容", trigger: "blur" }],
  content: [{ required: true, message: "请输入对应内容", trigger: "blur" }],
  price_num: [{ required: true, message: "请输入对应内容", trigger: "blur" }],
  room_type_name: [{ required: true, message: "请输入对应内容", trigger: "blur" }],
  community: [{ required: true, message: "请输入对应内容", trigger: "blur" }],
  floor: [{ required: true, message: "请输入对应内容", trigger: "blur" }],
  priceType: [{ required: true, message: "请输入对应内容", trigger: "blur" }],
  area_name: [{ required: true, message: "请输入对应内容", trigger: "blur" }],
  tags: [{ required: true, message: "请输入对应内容", trigger: "blur" }],
  lineNum: [{ required: true, message: "请输入对应内容", trigger: "blur" }],
  size: [{ required: true, message: "请输入对应内容", trigger: "blur" }],
});

const $_handleConfirm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      switch (mode.value) {
        case "create":
          $_createHouse();
          return;
        case "update":
          $_updateHouse();
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

const $_createHouse = async () => {
  const { code, msg } = await createHouse(detailForm);
  if (code !== 0) {
    ElMessage.error(msg);
    return;
  }
  ElMessage.success(msg + " 3s后返回！");
  goBack();
};

const $_updateHouse = async () => {
  const params = {
    ...detailForm,
    id: id.value,
  };
  const { code, msg } = await updateHouse(params);
  if (code !== 0) {
    ElMessage.error(error);
    return;
  }
  ElMessage.success(msg + " 3s后返回！");
  goBack();
};

const $_getHouseDetail = async (id) => {
  const { code, data } = await getHouseDetail({ id });
  if (code !== 0) {
    ElMessage.error(error);
    return;
  }
  console.log(data);

  Object.entries(data).forEach(item => {
    const [key, value] = item
    detailForm[key] = value
  })
};

onMounted(() => {
  if (mode.value === "update") {
    $_getHouseDetail(id.value);
  }
});
</script>
