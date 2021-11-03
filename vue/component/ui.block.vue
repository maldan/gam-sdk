<template>
  <div :class="$style.block">
    <div v-if="title" :class="$style.title">{{ title }}</div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: String,
  },
  async mounted() {},
  methods: {},
  data: () => {
    return {};
  },
});
</script>

<style module lang="scss">
.block {
  padding: 10px;
  background: #141414;
  height: max-content;
  border-radius: 4px;

  .title {
    color: #979797;
    margin-bottom: 15px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
  }
}
</style>
