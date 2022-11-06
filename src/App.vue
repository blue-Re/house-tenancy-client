<script setup>
import { RouterView, useRoute } from 'vue-router'

import { useUserStore } from '@/stores/user'

import Menu from "@/components/Menu/Menu.vue";
import Header from '@/components/Header/Header.vue';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb.vue'
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
          <!-- <h1>toubu</h1> -->
          <BreadCrumb />
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

.el-pagination{
  justify-content: center;
}
</style>
