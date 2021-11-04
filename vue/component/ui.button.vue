<template>
  <button :class="$style.button" :style="style()">
    <div v-if="text" style="margin-right: 15px">{{ text }}</div>
    <ui-icon v-if="icon" :name="icon" :width="17" color="#E38414" :style="iconStyle()" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    text: String,
    icon: String,
    size: {
      type: String,
      default: 'normal',
    },
    iconPosition: {
      type: String,
      default: 'left',
    },
  },
  async mounted() {},
  methods: {
    style() {
      if (this.size === 'compact') {
        return {
          padding: '7px 10px',
          fontSize: '14px',
        };
      }
      if (this.size === 'compact-square') {
        return {
          padding: '5px',
          fontSize: '14px',
        };
      }
      return {};
    },
    iconStyle() {
      if (this.iconPosition === 'left') {
        return { marginLeft: 'auto' };
      }
      if (this.iconPosition === 'center') {
        return { marginLeft: 'auto', marginRight: 'auto' };
      }
      return {};
    },
  },
  data: () => {
    return {};
  },
});
</script>

<style module lang="scss">
.button {
  background: #63636382;
  color: #9d9d9d;
  border: 0;
  padding: 10px 15px;
  border-radius: 4px;
  flex: 1;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    background: darken(#515151, 2%);
    color: darken(#9d9d9d, 20%);

    &:hover {
      opacity: 0.7;
    }

    &:active {
      position: relative;
      opacity: 0.6;
      top: 1px;
    }

    img {
      filter: grayscale(2);
      opacity: 0.4;
    }
  }

  img {
    display: block;
    margin-left: auto;
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
