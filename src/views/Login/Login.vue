<template>
  <div class="login">
    <div class="form-wrapper">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item prop="title">
          <h3 class="title">房屋租赁后台管理系统</h3>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="用户类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择用户类型">
            <el-option label="房东" :value="0" />
            <el-option label="租户" :value="1" />
            <el-option label="管理员" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
          <el-button @click="registerForm(ruleFormRef)">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

import { useUserStore } from '@/stores/user'
import { login, register } from '@/service/common'

const router = useRouter()

const userStore = useUserStore()

const ruleFormRef = ref();
const ruleForm = reactive({
  username: "",
  password: "",
  type: "",
});

const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  type: [{ required: true, message: "请选择用户类型", trigger: "change" }],
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { code, msg, data } = await login(ruleForm)
      if (code !== 0 ) {
        ElMessage.error(msg)
        return
      }
      localStorage.setItem('user', JSON.stringify(data))
      userStore.saveUser(data)
      router.replace('/home')

    } else {
      console.log("error submit!", fields);
    }
  });
};

const registerForm = async (formEl) => {
 if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { code, msg } = await register(ruleForm)
      if (code !== 0 ) {
        ElMessage.error(msg)
        return
      }
      ElMessage.success('注册成功，请进行登录操作~')

    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url("@/assets/image/login-bg.webp");
  background-size: 100% 100%;
  position: relative;

  .form-wrapper {
    width: 500px;
    height: 300px;
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    // background-color: pink;
  }

  .el-form-item .title {
    font-size: 20px;
    // color: white;
  }
}

.el-input {
  width: 236px;
}

.el-button{
  width: 115px;
}
</style>
