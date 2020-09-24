<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useProvide from "@/store";
export default defineComponent({
  setup() {
    useProvide();
  },
});
</script>

