<template>
  <div :class="$style.button_group">
    <ui-button
      v-for="x in items"
      :key="x.text + x.icon"
      :text="x.text"
      :icon="x.icon"
      :isSelected="x.id === modelValue"
      @click="change(x.id)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    items: Array as PropType<{ text: string; icon: string; id: string }[]>,
    modelValue: {
      type: String,
      required: true,
    },
  },
  async mounted() {},
  methods: {
    change(id: string) {
      this.$emit('update:modelValue', id);
      this.$emit('change', id);
    },
  },
  data: () => {
    return {};
  },
});
</script>

<style module lang="scss">
@import '../style/color.scss';
@import '../style/size.scss';

.button_group {
  display: flex;
  width: max-content;

  button:first-child {
    border-radius: 5px 0 0 5px;
  }
  button {
    border-radius: 0;
    margin-right: 1px;
    white-space: nowrap;
  }
  button:last-child {
    border-radius: 0 5px 5px 0;
  }
}
</style>
