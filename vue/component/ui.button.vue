<template>
  <button :class="[$style.button, $style[`icon_` + iconPosition]]">
    <ui-icon
      v-if="icon && iconPosition === 'left'"
      :class="$style.icon"
      :name="icon"
      :width="24"
      :color="iconColor"
    />
    <div :class="$style.text" v-if="text && iconPosition !== 'center'">{{ text }}</div>

    <ui-icon
      v-if="icon && iconPosition === 'center'"
      :class="$style.icon"
      :name="icon"
      :width="24"
      :color="iconColor"
    />

    <ui-icon
      v-if="icon && iconPosition === 'right'"
      :class="$style.icon"
      :name="icon"
      :width="24"
      :color="iconColor"
    />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    text: String,
    icon: String,
    /*size: {
      type: String,
      default: 'normal',
    },*/
    iconPosition: {
      type: String,
      default: 'right',
    },
    iconColor: {
      type: String,
      default: '#E38414',
    },
  },
  async mounted() {},
  methods: {
    /*style() {
      if (this.size === 'compact') {
        return {
          padding: '7px 10px',
          fontSize: '14px',
        };
      }
      if (this.size === 'compact-square') {
        return {
          padding: '2px',
          fontSize: '14px',
          borderRadius: '0',
        };
      }
      if (this.size === 'square') {
        return {
          borderRadius: '0',
        };
      }
      if (this.size === 'empty') {
        return {
          background: 'none',
          padding: '0',
          fontSize: '14px',
          flex: 'none',
        };
      }
      return {};
    },*/
    /*iconStyle() {
      if (this.iconPosition === 'right') {
        return { marginLeft: 'auto' };
      }
      if (this.iconPosition === 'center') {
        return { marginLeft: 'auto', marginRight: 'auto' };
      }
      return {};
    },*/
  },
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
  border: 0;
  padding: $gap-base;
  border-radius: 4px;
  flex: 1;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;

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
