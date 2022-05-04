<template>
  <div :class="$style.number">
    <div class="clickable" :class="[$style.button, $style.left]" @click="change(-step)">-</div>
    <desktop-ui-input @change="changeString" :class="$style.input" v-model="val" />
    <div class="clickable" :class="[$style.button, $style.right]" @click="change(step)">+</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    text: String,
    icon: String,
    styleType: String,
    modelValue: {
      type: Number,
      required: true,
      default: 0,
    },
    step: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  async mounted() {
    this.val = this.modelValue + '';
  },
  methods: {
    changeString() {
      const n = Number.parseFloat(this.val);
      this.$emit('update:modelValue', n);
      this.$emit('change', n);
    },
    change(v: number) {
      const n = this.modelValue + v;
      this.$emit('update:modelValue', n);
      this.$emit('change', n);
    },
  },
  watch: {
    modelValue() {
      this.val = this.modelValue + '';
    },
  },
  data: () => {
    return {
      val: '',
    };
  },
});
</script>

<style module lang="scss">
@import '../../style/color.scss';
@import '../../style/size.scss';

.number {
  display: flex;
  align-items: center;

  .input {
    width: 48px;
    flex: none;
    border-radius: 0;

    input {
      height: 24px;
      border-radius: 0;
      background: #1b1b1b;
      text-align: center;
    }
  }

  .button {
    background: $gray-light;
    color: $text-gray;
    flex: none;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    // border-radius: 0;
  }

  .left {
    border-radius: 4px 0 0 4px;
  }

  .right {
    border-radius: 0 4px 4px 0;
  }
}
</style>
