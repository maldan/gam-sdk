<template>
  <div class="ui-chart">
    <svg ref="svg" style="width: 100%; height: 200px" xmlns="http://www.w3.org/2000/svg">
      <!-- Simple rectangle -->
      <rect
        @mouseover="overElement(x)"
        @mouseout="outElement"
        :x="x.x"
        :y="x.y"
        :style="{ fill: color + '99', stroke: color }"
        :width="x.width"
        :height="x.height"
        :key="x.value"
        v-for="x in calculatedItems"
      />
    </svg>
    <div>
      <div v-if="info && info.label">LABEL: {{ info.label }}</div>
      <div v-if="info && info.value">
        CUR: {{ formatInfo ? formatInfo(info.value) : info.value }}
      </div>
      <div>MAX: {{ formatInfo ? formatInfo(maxValue) : maxValue }}</div>
      <div>AVG: {{ formatInfo ? formatInfo(avgValue) : avgValue }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    items: Array,
    labels: Array,
    formatInfo: Function,
    color: {
      type: String,
      default: '#6dc659',
    },
    max: Number,
  },
  mounted() {
    this.calculate(this.items);
  },
  watch: {
    items(value) {
      this.calculate(value);
    },
  },
  methods: {
    overElement(x) {
      this.info = x;
    },
    outElement() {},
    calculate(value) {
      this.avgValue = value.reduce((a, b) => a + b, 0) / value.length;
      let max = this.max || Math.max(...value);
      this.maxValue = max;
      if (max === 0) max = 1;
      const maxWidth = this.$refs['svg'].getBoundingClientRect().width;

      this.calculatedItems.length = 0;
      this.calculatedItems.pop();

      for (let i = 0; i < value.length; i++) {
        let height = (value[i] / max) * 200;
        let width = (maxWidth - 4 * value.length + 4) / value.length;

        this.calculatedItems.push({
          x: i * (width + 4),
          y: 200 - (height - 4),
          width: width - 4,
          height: height - 8 < 0 ? 0 : height - 8,
          value: value[i],
          label: this.labels[i],
        });
      }
    },
  },
  data() {
    return {
      calculatedItems: [],
      info: {},
      maxValue: 0,
      avgValue: 0,
    };
  },
});
</script>

<style lang="scss" scoped>
svg {
  rect {
    //fill: #6dc65999;
    stroke-width: 2;
    //stroke: #6dc659;
  }

  rect:hover {
    opacity: 0.8;
  }
}
</style>
