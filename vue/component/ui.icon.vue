<template>
  <svg
    ref="svg"
    draggable="false"
    v-html="iconData"
    width="10"
    height="10"
    :data-src="require(`../asset/icon/${name}.svg`)"
    :class="$style.icon"
    :style="{ width: `${typeof width === 'string' ? width : width + 'px'}` }"
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
    color: {
      type: String,
      default: '#898989',
    },
  },
  async mounted() {
    const svg = this.$refs['svg'] as HTMLElement;
    const url = svg.getAttribute('data-src') as string;
    let icon = (await Axios.get(url)).data;
    const svgArgs = icon.match(/<svg (.*?)>/g);
    if (svgArgs) {
      const dd = document.createElement('div');
      dd.innerHTML = svgArgs[0] + '</svg>';
      const attr = dd.children[0].attributes;
      for (let i = 0; i < attr.length; i++) {
        svg.setAttribute(attr[i].name, attr[i].value);
      }
    }
    icon = icon.replace(/<svg .*?>/g, '').replace('</svg>', '');
    this.iconData = icon;
  },
  methods: {},
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
