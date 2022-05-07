<template>
  <svg
    ref="svg"
    draggable="false"
    v-html="iconData"
    width="24"
    height="24"
    :data-src="require(`../asset/icon/${name}.svg`)"
    :class="$style.icon"
    :style="{
      width: `${typeof width === 'string' ? width : width + 'px'}`,
      height: `${typeof height === 'string' ? height : height + 'px'}`,
    }"
    :color="color"
  ></svg>
</template>

<script lang="ts">
import Axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: String,
    width: {
      type: [String, Number],
      default: 'auto',
    },
    height: {
      type: [String, Number],
      default: 'auto',
    },
    color: {
      type: String,
      default: '#898989',
    },
  },
  async mounted() {
    await this.refresh();
  },
  methods: {
    async refresh() {
      const svg = this.$refs['svg'] as HTMLElement;
      const url = svg.getAttribute('data-src') as string;
      const cacheIcon = localStorage.getItem(`__icon_${url}`);

      let icon = cacheIcon ?? (await Axios.get(url)).data;
      const svgArgs = icon.match(/<svg (.*?)>/g);

      // Save cache
      localStorage.setItem(`__icon_${url}`, icon);

      if (svgArgs) {
        const dd = document.createElement('div');
        dd.innerHTML = svgArgs[0] + '</svg>';
        const attr = dd.children[0].attributes;
        for (let i = 0; i < attr.length; i++) {
          if (attr[i].name === 'fill') continue;
          svg.setAttribute(attr[i].name, attr[i].value);
        }
      }
      icon = icon.replace(/<svg .*?>/g, '').replace('</svg>', '');
      this.iconData = icon;
    },
  },
  watch: {
    name() {
      this.$nextTick(() => {
        this.refresh();
      });
    },
  },
  data: () => {
    return {
      iconData: '' as any,
    };
  },
});
</script>

<style module lang="scss">
.icon {
  display: block;
}
</style>
