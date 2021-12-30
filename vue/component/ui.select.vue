<template>
  <div :class="$style.select">
    <!-- Left icon -->
    <ui-button v-if="icon" :icon="icon" :width="24" :color="iconColor" :class="$style.button" />

    <!-- Input -->
    <input
      type="text"
      :class="$style.input"
      :placeholder="placeholder"
      :value="modelValue ? modelValue.label : ''"
    />

    <!-- Right icon -->
    <ui-button
      @click="isOpen = !isOpen"
      icon="arrow_down"
      :color="iconColor"
      :class="$style.button"
    />

    <!-- Menu -->
    <div v-if="isOpen" :class="$style.item_list">
      <div
        @click="
          select(x, i);
          isOpen = false;
        "
        :class="$style.item"
        :key="x.label"
        v-for="(x, i) in items"
      >
        {{ x.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    placeholder: String,
    icon: String,
    items: Array,
    modelValue: Object,
    iconColor: {
      type: String,
      default: '#E38414',
    },
  },
  async mounted() {},
  methods: {
    select(x: Record<string, unknown>, index: number) {
      this.$emit('update:modelValue', x);
      this.$emit('change', { ...x, index });
    },
  },
  data: () => {
    return {
      isOpen: false,
    };
  },
});
</script>

<style module lang="scss">
.select {
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;

  .item_list {
    position: absolute;
    left: 0;
    top: 40px;
    width: 100%;
    z-index: 2;

    .item {
      cursor: pointer;
      background: #585858;
      padding: 10px 15px;
      border-bottom: 1px solid #333333;
      color: #9d9d9d;
      user-select: none;
    }
  }

  .button {
    padding: 7px;
    width: 42px;
    flex: none;
    border-radius: 0 2px 2px 0;
  }

  /*.icon {
    flex: none;
    background: #515151;
    //height: 40px;
    //width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px 0 0 2px;
    border-right: 1px solid #313131;
    box-sizing: border-box;
    cursor: pointer;

    img {
      display: block;
    }

    &:last-child {
      border: 0;
      border-radius: 0 2px 2px 0;
      border-left: 1px solid #313131;
    }
  }*/

  .input {
    box-sizing: border-box;
    background: #3d3d3d;
    color: #9d9d9d;
    padding: 10px;
    flex: 1;
    outline: none;
    font-size: 16px;
    border: 1px solid transparent;

    &:focus {
      border: 1px solid #888888;
    }
  }

  /*button {
    background: #515151;
    color: #9d9d9d;
    border: 0;
    padding: 10px 15px;
    border-radius: 2px;
    flex: 1;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;

    img {
      display: block;
      margin-left: 15px;
    }

    img:nth-child(1) {
      margin-left: 0;
    }

    &:hover {
      opacity: 0.7;
    }

    &:active {
      position: relative;
      opacity: 0.6;
      top: 1px;
    }
  }*/
}
</style>
