
<template>
  <div class="vw-list">
    <van-cell title="请求参数" :value="params && JSON.stringify(params)" />
    <van-cell title="页码" :value="pagination && JSON.stringify(pagination)" />
    <van-cell title="错误信息" :value="error && error.message" />
    <van-cell title="错误码" :value="error && error.code" />
    {{ loading }}
    <van-divider />
    <div>
      <van-button type="primary" @click="search({ p1: 'haha' })"
        >查询</van-button
      >
      <!-- <van-button @click="refresh">刷新</van-buttonw> -->
      <!-- <van-button @click="load">加载</van-button> -->
      <van-button @click="reset">重置</van-button>
      <!-- <van-button @click="goPage">第一页</van-button> -->
    </div>
    <van-pull-refresh v-model="refreshLoading" @refresh="refresh">
      <van-list
        v-model="loading"
        :finished="!isMore"
        finished-text="没有更多了"
        loading-text="加载中..."
        :immediate-check="false"
        v-model:error="isError"
        :error-text="error && error.message + '，点击重新加载'"
        offset="10"
        @load="load"
      >
        <van-cell
          v-for="(item, index) of records"
          :key="index"
          :title="item.address"
        />
      </van-list>
    </van-pull-refresh>

    <!-- <div v-for="(item, index) of records" :key="index">
      {{ item.address }}
    </div> -->
  </div>
</template>

<script lang="ts">
/**
 * @description 查询测试页面
 */
import { defineComponent } from "vue";
import "./index.less";
import useQuery from "@/hooks/useQuery";
import {
  queryDemoList,
  // eslint-disable-next-line no-unused-vars
  QueryDemoListResultType,
  // eslint-disable-next-line no-unused-vars
  QueryDemoListRecordsType,
} from "@/apis/demo";
import { Button, Divider, Cell, PullRefresh, List } from "vant";
export default defineComponent({
  components: {
    [Button.name]: Button,
    [Divider.name]: Divider,
    [Cell.name]: Cell,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
  },
  setup() {
    const result = useQuery<QueryDemoListResultType, QueryDemoListRecordsType>(
      queryDemoList
    );
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

