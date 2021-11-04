<template>
  <div :class="$style.block">
    <div v-if="title" :class="$style.title">
      {{ title }}
      <ui-button
        v-if="icon"
        :class="$style.button"
        :icon="icon"
        size="compact-square"
        @click="$emit('iconClick')"
      />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: String,
    icon: String,
  },
  async mounted() {},
  methods: {},
  data: () => {
    return {};
  },
});
</script>

<style module lang="scss">
@import '../style/color.scss';

.block {
  padding: 10px;
  background-color: $block-background;
  height: max-content;
  border-radius: 4px;

  .title {
    color: $gray-text;
    margin-bottom: 15px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    display: flex;

    .button {
      margin-left: auto;
      flex: none;
    }
  }
}
</style>
