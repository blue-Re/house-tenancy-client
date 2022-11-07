<template>
  <el-menu
    :router="true"
    :default-active="route.path"
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
import { onMounted, ref } from "vue";

import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from "vue-router";

import { menuIcon } from "./config";
import { getMenuList } from "@/service/common.js";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore()

const type = userStore.getCurrentUserType

let menu = ref([]);
onMounted(async () => {
  const { code, menuList, msg } = await getMenuList(type);
  if (code === 0) {
    menu.value = menuList;
    return;
  }
  ElMessage.error(msg);
});

const goToHome = (item) => {
  if (item.path === "/home") {
    router.push("/home");
  }
};
</script>

<style>
.el-menu-vertical-demo {
  width: 200px;
  height: calc(100vh - 60px);
}
</style>
