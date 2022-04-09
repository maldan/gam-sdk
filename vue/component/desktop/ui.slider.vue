<template>
  <div :class="$style.slider" :style="{ height: height + 'px' }">
    <div ref="body" :class="$style.body" :style="{ height: height + 'px' }">
      <div
        ref="box"
        @mousedown="startDrag"
        :class="$style.box"
        :style="{ left: `${modelValue * 100}%`, height: height + 'px' }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      default: 8,
    },
  },
  computed: {},
  async mounted() {
    this.mouseMove = (e: MouseEvent) => {
      if (this.isDrag) {
        const delta = e.pageX - this.startDragPosition.x;

        let bp = this.startBoxPosition.x + (delta / this.boxWidth) * 100;
        if (bp <= 0) bp = 0;
        if (bp >= 100) bp = 100;
        // this.boxPosition = bp;
        this.$emit('update:modelValue', bp / 100);
        this.$emit('change', bp / 100);
      }
    };
    this.mouseUp = () => {
      this.isDrag = false;
    };
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  },
  beforeUnmount() {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  },
  methods: {
    startDrag(e: MouseEvent) {
      this.startDragPosition.x = e.pageX;
      this.startBoxPosition.x = this.modelValue * 100;
      this.isDrag = true;

      const body = this.$refs['body'] as HTMLElement;
      this.boxWidth = body.getBoundingClientRect().width;
    },
    /*change() {
      this.$emit('update:modelValue', this.modelValue);
    },*/
  },
  data: () => {
    return {
      isDrag: false,
      mouseMove: null as any,
      mouseUp: null as any,
      startDragPosition: { x: 0 },
      startBoxPosition: { x: 0 },
      boxWidth: 0,
    };
  },
});
</script>

<style module lang="scss">
@import '../../style/color.scss';
@import '../../style/size.scss';

.slider {
  display: flex;
  align-items: center;
  flex: 1;
  box-sizing: border-box;
  background: $gray-dark;
  user-select: none;
  max-width: 100%;
  border-radius: 4px;
  overflow: hidden;

  .body {
    position: relative;
    width: calc(100% - 12px);

    .box {
      top: 0;
      display: block;
      width: 12px;
      background: $gray-light;
      position: absolute;
      left: 10px;
      box-sizing: border-box;
    }
  }
}
</style>
