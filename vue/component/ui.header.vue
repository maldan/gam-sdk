<template>
  <div :class="$style.header">
    <button
      v-for="x in items"
      :class="selected(x.url) ? $style.selected : ''"
      class="clickable"
      @click="$router.push(x.url)"
      :key="x.name"
    >
      {{ x.name }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    items: Array,
  },
  components: {},
  async mounted() {},
  methods: {
    selected(path: string) {
      if (this.$route.path === path) return true;
      else return false;
    },
  },
  data: () => {
    return {};
  },
});
</script>

<style module lang="scss">
.header {
  display: flex;
  background: #2b2b2b;
  padding: 10px;

  button {
    background: #1b1b1b;
    border-radius: 2px;
    border: 0;
    padding: 5px 15px;
    margin-right: 10px;
    color: #a5a5a5;

    &.selected {
      background: #d4670b;
      color: #fefefe;
    }
  }
}
</style>
