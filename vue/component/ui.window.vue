<template>
  <div
    :class="$style.window"
    :style="{ left: x + 'px', top: y + 'px', width: width + 'px', height: height + 'px' }"
  >
    <div ref="header" :class="$style.header">
      <slot name="header">{{ title }}</slot>
    </div>
    <div :class="$style.body"><slot name="body"></slot></div>

    <div v-for="x in resize" :key="x" :ref="`resize_${x}`" draggable="false" :class="x"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { EventHelper } from '@/gam_sdk_ui/vue/helper';

export default defineComponent({
  props: {
    title: String,
    /*x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 100,
    },*/
  },
  async mounted() {
    EventHelper.on(document, 'mousemove touchmove', this.documentMove);
    EventHelper.on(document, 'mouseup touchend', this.documentUp);
    EventHelper.on(this.$refs['header'] as HTMLElement, 'mousedown touchstart', this.down);
  },
  methods: {
    documentUp(e: MouseEvent) {
      if (this.isDrag || this.isDragB || this.isDragT || this.isDragL || this.isDragR) {
        // RestApi.process.setWindow(this.modelValue as any);
      }

      this.isDrag = false;
      this.isDragT = false;
      this.isDragB = false;
      this.isDragL = false;
      this.isDragR = false;
    },
    documentMove(e: any) {
      const pageX = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
      const pageY = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;

      if (this.isDrag) {
        this.x = Math.max(this.x + (pageX - this.capture.x), 0);
        this.y = Math.max(this.y + (pageY - this.capture.y), 0);
      }

      /*if (this.isDragB) {
        this.$emit('update:modelValue', {
          ...this.modelValue,
          height: this.modelValue.height + (pageY - this.capture.y),
        });
      }

      if (this.isDragT) {
        this.$emit('update:modelValue', {
          ...this.modelValue,
          y: this.modelValue.y + (pageY - this.capture.y),
          height: this.modelValue.height - (pageY - this.capture.y),
        });
      }

      if (this.isDragR) {
        this.$emit('update:modelValue', {
          ...this.modelValue,
          width: Math.max(this.modelValue.width + (pageX - this.capture.x), 320),
        });
      }

      if (this.isDragL) {
        this.$emit('update:modelValue', {
          ...this.modelValue,
          x: this.modelValue.x + (pageX - this.capture.x),
          width: Math.max(this.modelValue.width - (pageX - this.capture.x), 320),
        });
      }

      if (this.isDragR && this.isDragB) {
        this.$emit('update:modelValue', {
          ...this.modelValue,
          width: Math.max(this.modelValue.width + (pageX - this.capture.x), 320),
          height: this.modelValue.height + (pageY - this.capture.y),
        });
      }

      if (this.isDragL && this.isDragB) {
        this.$emit('update:modelValue', {
          ...this.modelValue,
          x: this.modelValue.x + (pageX - this.capture.x),
          width: Math.max(this.modelValue.width - (pageX - this.capture.x), 320),
          height: this.modelValue.height + (pageY - this.capture.y),
        });
      }

      if (this.isDragR && this.isDragT) {
        this.$emit('update:modelValue', {
          ...this.modelValue,
          width: Math.max(this.modelValue.width + (pageX - this.capture.x), 320),
          y: this.modelValue.y + (pageY - this.capture.y),
          height: this.modelValue.height - (pageY - this.capture.y),
        });
      }

      if (this.isDragL && this.isDragT) {
        this.$emit('update:modelValue', {
          ...this.modelValue,
          y: this.modelValue.y + (pageY - this.capture.y),
          height: this.modelValue.height - (pageY - this.capture.y),
          x: this.modelValue.x + (pageX - this.capture.x),
          width: Math.max(this.modelValue.width - (pageX - this.capture.x), 320),
        });
      }*/

      if (!(this.isDrag || this.isDragB || this.isDragT || this.isDragL || this.isDragR)) {
        return;
      }

      this.capture = {
        x: pageX,
        y: pageY,
      };
    },
    down(e: MouseEvent & TouchEvent) {
      const pageX = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
      const pageY = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;

      this.isDrag = true;
      this.capture = {
        x: pageX,
        y: pageY,
      };
    },
  },
  data: () => {
    return {
      x: 0,
      y: 0,
      width: 320,
      height: 240,
      isDrag: false,
      capture: {
        x: 0,
        y: 0,
      },
      isDragT: false,
      isDragB: false,
      isDragL: false,
      isDragR: false,
      resize: ['l', 'r', 't', 'b', 'tr', 'tl', 'br', 'bl'],
    };
  },
});
</script>

<style module lang="scss">
@import '../style/color.scss';
@import '../style/size.scss';

.window {
  display: flex;
  flex-direction: column;
  position: absolute;
  user-select: none;

  .header {
    background: $gray-dark;
    padding: $gap-base;
    color: $text-gray;
  }

  .body {
    padding: $gap-base;
    background: $gray-medium;
    overflow: auto;
  }

  .b,
  .t,
  .l,
  .r,
  .br,
  .bl,
  .tr,
  .tl {
    position: absolute;
  }

  .t {
    height: 24px;
    width: 100%;
    top: -24px;
    cursor: s-resize;
  }

  .b {
    height: 24px;
    width: 100%;
    bottom: -24px;
    cursor: s-resize;
  }

  .l {
    height: 100%;
    width: 24px;
    left: -24px;
    top: 0;
    cursor: e-resize;
  }

  .r {
    height: 100%;
    width: 24px;
    right: -24px;
    top: 0;
    cursor: e-resize;
  }

  .br {
    height: 24px;
    width: 24px;
    right: -24px;
    bottom: -24px;
    cursor: nw-resize;
  }

  .bl {
    height: 24px;
    width: 24px;
    left: -24px;
    bottom: -24px;
    cursor: ne-resize;
  }

  .tr {
    height: 24px;
    width: 24px;
    right: -24px;
    top: -24px;
    cursor: ne-resize;
  }

  .tl {
    height: 24px;
    width: 24px;
    left: -24px;
    top: -24px;
    cursor: nw-resize;
  }
}
</style>
