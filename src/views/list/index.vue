
<template>
  <div class="vw-list">
    <div>加载状态:{{ loading ? "加载中..." : "加载成功" }}</div>
    <div>是否有更多数据:{{ isMore ? "有" : "无" }}</div>
    <div>错误信息:{{ error && error.message }}</div>
    <div>错误码:{{ error && error.code }}</div>
    <div>请求参数:{{ params && JSON.stringify(params) }}</div>
    <div>页码:{{ pagination && JSON.stringify(pagination) }}</div>
    <div>
      <van-button @click="search({ p1: 'haha' })">查询</van-button>
      <van-button @click="refresh">刷新</van-button>
      <van-button @click="load">加载</van-button>
      <van-button @click="reset">重置</van-button>
      <van-button @click="goPage">第一页</van-button>
    </div>
    <div v-for="(item, index) of records" :key="index">
      {{ item.address }}
    </div>
  </div>
</template>

<script lang="ts">
/**
 * @description 查询测试页面
 */
import { defineComponent } from "vue";
import "./index.less";
import useQuery from "@/hooks/useQuery";
import { queryDemoList } from "@/apis/demo";
import { Button } from "vant";
export default defineComponent({
  components: {
    [Button.name]: Button,
  },
  setup() {
    const result = useQuery(queryDemoList);
    return result;
  },
  methods: {
    goPage() {
      this.pagination.page = 1;
      this.search();
    },
  },
});
</script>

