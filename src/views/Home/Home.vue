<script setup>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import * as echarts from "echarts";
import { ElMessage } from "element-plus";

import { getReduceUserData, getReduceTroubleData } from "@/service/home";
import { getDay } from "@/utils/format-date";

const userContainerRef = ref("");
const troubleContainerRef = ref("");

const userOptions = reactive({
  series: [
    {
      type: "pie",
      data: [],
      stillShowZeroSum: true,
      label: {
        show: true,
      },
    },
  ],
});
onMounted(async () => {
  userContainerRef.value = echarts.init(document.getElementById("draw-user"));
  const { code, data, msg } = await getReduceUserData();
  if (code !== 0) {
    ElMessage.error(msg);
    return;
  }
  userOptions.series[0].data = data;
  userContainerRef.value.setOption(userOptions);
});

const troubleOptions = reactive({
  xAxis: {
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {},
  series: [
    {
      type: "bar",
      data: [23, 24, 18, 25, 27, 28, 25],
    },
  ],
});
const dayMap = reactive({
  Mon: 0,
  Tue: 0,
  Wed: 0,
  Thu: 0,
  Fri: 0,
  Sat: 0,
  Sun: 0,
});
onMounted(async () => {
  troubleContainerRef.value = echarts.init(document.getElementById("draw-trouble"));
  const { code, rows, msg } = await getReduceTroubleData();
  if (code !== 0) {
    ElMessage.error(msg)
    return
  }
  rows.forEach((item) => {
    const day = getDay(item.createdAt);

    dayMap[day]++;
  });
  troubleOptions.series[0].data = Object.values(dayMap)
  troubleContainerRef.value.setOption(troubleOptions);
});

onUnmounted(() => {
  troubleContainerRef.value.dispose();
  userContainerRef.value.dispose();
});
</script>

<template>
  <div class="home">
    <div class="canvas-wrapper">
      <div class="user-container">
        <div class="title">租 赁 系 统 现 阶 段 用 户 量</div>
        <div id="draw-user"></div>
      </div>

      <div class="trouble-container">
        <div class="title">租 赁 系 统 故 障 统 计 图</div>
        <div id="draw-trouble"></div>
      </div>
    </div>

    <div class="description">
      <p>注：本系统针对于不同的用户，对访问节点进行了限制，特此报备！</p>
      <p>注：如在使用问题出现各种问题，请联系技术：yyds@qq.com！</p>
      <p>
        系统远程代码库客户端：<a href="https://github.com/blue-Re/house-tenancy-client"
          >https://github.com/blue-Re/house-tenancy-client</a
        >
      </p>
      <p>
        系统远程代码库服务端：<a href="https://github.com/blue-Re/house-tenancy-server"
          >https://github.com/blue-Re/house-tenancy-server</a
        >
      </p>
      <p>blue-Re版权所有©2022-2023山西农行大学信息学院运营：学院路8号</p>
    </div>
  </div>
</template>

<style lang="less">
.home {
  height: calc(100% - 60px);
  width: 100%;
  overflow: hidden;

  .canvas-wrapper {
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
    .user-container {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .title {
        font-size: 25px;
      }
      #draw-user {
        height: 280px;
        width: 350px;
      }
    }

    .trouble-container {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .title {
        font-size: 25px;
      }
      #draw-trouble {
        height: 280px;
        width: 350px;
      }
    }
  }

  .description {
    width: 100%;
    padding: 0 20px;
    font-size: 18px;
    color: rgb(175, 175, 175);
    p {
      margin: 10px 0;
      &:last-child {
        color: red;
      }
    }
  }
}
</style>
