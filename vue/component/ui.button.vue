<template>
  <button
    :class="[
      $style.button,
      $style[`icon_` + (icon ? iconPosition : 'none')],
      isSelected ? $style['selected'] : null,
    ]"
  >
    <ui-icon
      v-if="icon && iconPosition === 'left'"
      :class="$style.icon"
      :name="icon"
      :width="iconSize"
      :height="iconSize"
      :color="isSelected ? iconColorSelected : iconColor"
    />
    <div :class="$style.text" v-if="text && iconPosition !== 'center'">{{ text }}</div>

    <ui-icon
      v-if="icon && iconPosition === 'center'"
      :class="$style.icon"
      :name="icon"
      :width="iconSize"
      :height="iconSize"
      :color="isSelected ? iconColorSelected : iconColor"
    />

    <ui-icon
      v-if="icon && iconPosition === 'right'"
      :class="$style.icon"
      :name="icon"
      :width="iconSize"
      :height="iconSize"
      :color="isSelected ? iconColorSelected : iconColor"
    />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    text: String,
    icon: String,
    isSelected: Boolean,
    iconPosition: {
      type: String,
      default: 'right',
    },
    iconColor: {
      type: String,
      default: '#E38414',
    },
    iconColorSelected: {
      type: String,
      default: '#FEFEFE',
    },
    iconSize: {
      type: Number,
      default: 24,
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
@import '../style/color.scss';
@import '../style/size.scss';

.button {
  background-color: $gray-light;
  color: $text-gray;
  border: 1px solid transparent;
  padding: $gap-base;
  border-radius: 4px;
  flex: 1;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;

  &.selected {
    background-color: #2d88ff;
    color: #fefefe;
  }

  &.icon_left {
    .text {
      margin-left: $gap-base;
    }
  }

  &.icon_right {
    .text {
      margin-right: $gap-base;
    }
    .icon {
      margin-left: auto;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      opacity: 0.5;
    }

    &:active {
      position: relative;
      opacity: 0.5;
      top: 0;
    }

    .icon {
      filter: grayscale(2);
      opacity: 0.5;
    }
  }

  &:hover {
    opacity: 0.7;
  }

  &:active {
    position: relative;
    opacity: 0.6;
    top: 1px;
  }
}
</style>
