<template>
  <div :class="$style.input">
    <ui-button
      v-if="icon"
      :class="$style.button"
      :icon="icon"
      :width="20"
      :iconColor="iconColor"
      iconPosition="center"
    />

    <!-- Text -->
    <input
      ref="input"
      :class="$style.input_field"
      type="number"
      :placeholder="placeholder"
      :value="modelValue"
      @input="change"
      :step="step"
    />

    <ui-button
      v-if="functionIcon"
      :class="$style.button"
      @click="clickOnFunction"
      :icon="functionIcon"
      :width="20"
      iconPosition="center"
    />
  </div>
</template>

<script lang="ts">
import Moment from 'moment';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    placeholder: String,
    icon: String,
    iconColor: {
      type: String,
      default: '#E38414',
    },
    functionIcon: String,
    functionClick: [Function, String],
    modelValue: {
      type: Number,
      required: true,
      default: 0,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  computed: {},
  async mounted() {},
  beforeUnmount() {},
  methods: {
    change(e: any) {
      this.$emit('update:modelValue', Number.parseFloat(e.target.value));
    },
    clickOnFunction() {
      if (typeof this.functionClick === 'function') {
        this.$emit('update:modelValue', this.functionClick(this.modelValue));
      }
      if (typeof this.functionClick === 'string') {
        if (this.functionClick === 'currentDate')
          this.$emit('update:modelValue', Moment().format('YYYY-MM-DD'));
        if (this.functionClick === 'currentTime')
          this.$emit('update:modelValue', Moment().format('HH:mm:ss'));
        if (this.functionClick === 'currentDateTime')
          this.$emit('update:modelValue', Moment().format('YYYY-MM-DD HH:mm:ss'));
      }
    },
    focus() {
      (this.$refs['input'] as any).focus();
    },
  },
  data: () => {
    return {};
  },
});
</script>

<style module lang="scss">
@import '../../style/color.scss';
@import '../../style/size.scss';

.input {
  display: flex;
  align-items: center;
  flex: 1;
  box-sizing: border-box;

  .button {
    flex: none;
    background: $gray-very-light;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px 0 0 4px;
    border-right: 1px solid $gray-medium;
    box-sizing: border-box;
    padding: 2px;

    &:last-child {
      border: 0;
      border-radius: 0 4px 4px 0;
      border-left: 1px solid $gray-medium;
    }
  }

  .button_empty {
    padding: 2px;
    background: none;
  }

  .input_field {
    box-sizing: border-box;
    background: #222222;
    color: $text-gray;
    padding: 5px;
    flex: 1;
    outline: none;
    font-size: 14px;
    border: 1px solid #393939;
    min-width: 1px;

    &:hover {
      background: lighten(#222222, 2%);
    }

    &:focus {
      border: 1px solid lighten(#393939, 3%);
    }
  }
}
</style>
