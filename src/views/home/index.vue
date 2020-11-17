<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow>
      <template v-slot:right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-button icon="plus" type="primary" @click="hanldClick">按钮</van-button>
    <div>{{ data }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Button, NavBar, Icon } from "vant";

export default defineComponent({
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
  },
  setup() {},
  data() {
    return { data: "" };
  },
  methods: {
    hanldClick() {
      this.$router.push("/list");
    },
  },
});
</script>