<template>
  <img :class="$style.icon" :src="require(`../asset/icon/${name}.svg`)" draggable="false" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: String,
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
