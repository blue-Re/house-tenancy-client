<script setup>
import { nextTick, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { menuConfig } from "@/config/menuConfig";

const route = useRoute();

let breadArr = ref([]);

watch(
  route,
  (value) => {
    if (value.path === "/" || value.path === "/login") return;
    const [pre, firstPath, secondPath] = route.path.split("/");
    const firstBreadObj = menuConfig.find((item) => item.key === firstPath);

    const secondBreadObj = { key: secondPath, name: route.meta.name };
    breadArr.value = [firstBreadObj, secondBreadObj];
  },
  { immediate: true }
);
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in breadArr" :key="item.key">
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="less">
.el-breadcrumb {
  padding: 10px 0;
  margin: 10px 0;
  border: 2px solid #f5f5f5;
  background-color: #f5f5f5;
  border-radius: 30px;
  border-left-width: 10px;
  border-left-color: #545c64;
}
</style>
