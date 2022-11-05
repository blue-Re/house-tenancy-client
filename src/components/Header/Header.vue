<template>
  <div class="header">
    <div class="top-wrapper">
      <div class="left">
        <div class="title">房屋租赁系统</div>
        <div class="bg">
          <!-- <img class="bg-image" src="@/assets/image/bg.webp" alt="" /> -->
        </div>
      </div>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <div class="right">
            <el-avatar :size="40" :src="circleUrl" />
            <div class="user">老王</div>
          </div>
          <!-- <el-icon class="el-icon--right"><caret-bottom /></el-icon> -->
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
const circleUrl = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";

const logout = () => {
  console.log('退出登录');
}
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
      // line-height: -80px;
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        // line-height: 20px;
        // margin-top: 15px;
      }
      .user {
        color: white;
      }
    }
  }
}
</style>
