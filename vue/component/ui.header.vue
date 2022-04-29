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
    byMatch: Boolean,
  },
  components: {},
  async mounted() {},
  methods: {
    selected(path: string) {
      if (this.byMatch) return this.$route.path.match(path);
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
@import '../style/color.scss';

.header {
  display: flex;
  background-color: $gray-dark;
  padding: 10px;
  user-select: none;

  button {
    background: #2e2e2e;
    border-radius: 2px;
    border: 0;
    padding: 5px 15px;
    margin-right: 10px;
    color: $text-gray;

    &.selected {
      background: #d4670b;
      color: #fefefe;
    }
  }
}
</style>
