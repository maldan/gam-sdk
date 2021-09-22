<template>
  <img
    :class="$style.icon"
    :src="require(`../asset/icon/${name}.svg`)"
    draggable="false"
    :style="{ width: `${typeof width === 'string' ? width : width + 'px'}` }"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: String,
    width: {
      type: [String, Number],
      default: 'auto',
    },
  },
  async mounted() {},
  methods: {},
  data: () => {
    return {};
  },
});
</script>

<style module lang="scss">
.icon {
  display: block;
}
</style>
