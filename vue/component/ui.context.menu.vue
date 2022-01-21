<template>
  <div :class="$style.menu">
    <ui-button
      @click.stop="
        x.onClick();
        $emit('close');
      "
      v-for="x in items"
      :key="x"
      iconPosition="left"
      :icon="x.icon"
      :text="x.label"
      :class="$style.button"
    ></ui-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    items: Array as PropType<{ icon: string; label: string; onClick: () => void }[]>,
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

.menu {
  position: absolute;
  left: 0;
  top: 0;
  background-color: $gray-dark;
  display: flex;
  flex-direction: column;

  .button {
    border-radius: 0;
  }
}
</style>
