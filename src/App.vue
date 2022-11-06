<script setup>
import { RouterView, useRoute } from 'vue-router'

import { useUserStore } from '@/stores/user'

import Menu from "@/components/Menu/Menu.vue";
import Header from '@/components/Header/Header.vue';
import Login from '@/views/Login/Login.vue'

const route = useRoute();

const userStore = useUserStore()
</script>

<template>
  <div class="common-layout">
    <Login v-if="route.path === '/login'"/>
    <el-container v-else>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Menu />
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less">
#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.el-main {
  // height: 100%;
  // overflow: scroll;
}

.el-pagination{
  justify-content: center;
}
</style>
