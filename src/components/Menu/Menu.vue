<template>
  <el-menu
    :router="true"
    default-active="/"
    class="el-menu-vertical-demo"
    text-color="#fff"
    active-text-color="#ffd04b"
    background-color="#545c64"
    unique-opened
  >
    <el-sub-menu
      @click="goToHome(item)"
      v-for="(item, index) in menu"
      :index="item.path"
      :key="item.key"
    >
      <template #title>
        <el-icon>
          <component :is="menuIcon[index]" />
        </el-icon>
        <span>{{ item.label }}</span>
      </template>

      <el-menu-item v-for="subItem in item.child" :index="subItem.path">
        {{ subItem.label }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

import { menuIcon } from "./config";
import { getMenuList } from "@/service/common.js";

const router = useRouter();

let menu = ref([]);
onMounted(async () => {
  const { code, menuList, error } = await getMenuList();
  if (code === 0) {
    menu.value = menuList;
    return;
  }
  ElMessage.error(error);
});

const goToHome = (item) => {
  if (item.path === "/") {
    router.push("/");
  }
};
</script>

<style>
.el-menu-vertical-demo {
  width: 200px;
  height: calc(100vh - 60px);
}
</style>
