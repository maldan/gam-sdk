<template>
  <div :class="$style.number">
    <ui-button :class="$style.button" text="-" @click="change(-1)" />

    <ui-input @change="changeString" :class="$style.input" v-model="val" />
    <ui-button :class="$style.button" text="+" @click="change(1)" />
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
  },
  async mounted() {
    this.val = this.modelValue + '';
  },
  methods: {
    changeString() {
      const n = Number.parseInt(this.val);
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
@import '../style/color.scss';
@import '../style/size.scss';

.number {
  display: flex;
  align-items: center;

  .value {
    width: 32px;
    text-align: center;
    color: $text-gray;
  }

  .input {
    width: 64px;
    flex: none;
    border-radius: 0;

    input {
      height: 32px;
      border-radius: 0;
      background: #1b1b1b;
      text-align: center;
    }
  }

  .button {
    flex: none;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
  }
}
</style>
