<template>
  <div class="header">
    <div class="top-wrapper">
      <div class="left">
        <div class="title">
          <el-icon :size="30"><HomeFilled /></el-icon>
          <span> 房屋租赁系统 </span>
        </div>
        <div class="bg"></div>
      </div>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <div class="right">
            <el-avatar
              :size="40"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
            <div class="user">{{ user.username }}</div>
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item class="clearfix" @click="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import { useUserStore } from "@/stores/user";
import { HomeFilled } from "@element-plus/icons-vue";

const router = useRouter();
const userStore = useUserStore();

const { user } = storeToRefs(userStore);

const logout = () => {
  userStore.resetUser();
  router.replace("/login");
};
</script>

<style lang="less">
.el-header {
  padding: 0 !important;
}
.header {
  width: 100%;
  height: 100%;

  background-color: #545c64;
  .top-wrapper {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 0 20px;
    .left {
      display: flex;
      align-items: center;
      height: 100%;
      .title {
        color: white;
        font-size: 20px;

        .el-icon {
          vertical-align: -5px;
        }
      }
      .bg {
        .bg-image {
          width: 200px;
          height: 60px;
        }
      }
    }

    .el-dropdown {
      display: flex;
      justify-content: center;
      align-items: center;
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .user {
        padding-left: 10px;
        color: white;
      }
    }
  }
}
</style>
