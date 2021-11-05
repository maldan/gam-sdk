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
@import '../style/size.scss';

.block {
  padding: $gap-base;
  background-color: $gray-dark;
  height: max-content;
  border-radius: 4px;

  .title {
    color: $text-gray;
    margin-bottom: $gap-base;
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
