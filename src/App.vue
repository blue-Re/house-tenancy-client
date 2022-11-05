<script setup>
import { RouterView } from 'vue-router'
import Menu from "@/components/Menu/Menu.vue";
import Header from '@/components/Header/Header.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
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
  overflow: auto;
}
</style>
