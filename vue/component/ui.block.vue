<template>
  <div :class="scrollY ? $style.block_scroll : $style.block">
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
    <slot v-if="!scrollY" />
    <div :class="$style.body" v-if="scrollY">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: String,
    icon: String,
    scrollY: Boolean,
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
  height: max-content;
}

.block,
.block_scroll {
  padding: $gap-base;
  background-color: $gray-dark;
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

  .body {
    overflow-y: scroll;
    height: calc(100% - 30px);

    &::-webkit-scrollbar {
      width: 0;
    }
  }
}
</style>
