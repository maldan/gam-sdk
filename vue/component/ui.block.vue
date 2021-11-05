<template>
  <div :class="scrollY ? $style.block_scroll : $style.block">
    <div v-if="title" :class="$style.title">
      {{ title }}
      <ui-button
        v-if="icon"
        :class="$style.button"
        :icon="icon"
        size="compact-square"
        @click="$emit('iconClick')"
      />
    </div>
    <slot v-if="!scrollY" />
    <div ref="body" :class="$style.body" v-if="scrollY">
      <slot />
    </div>
    <div v-if="scrollY && scrollChangedTimer > 0" :class="$style.scroll_info">
      {{ ~~(scrollPercentage * 100) }} %
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: String,
    icon: String,
    scrollY: Boolean,
  },
  async mounted() {
    let scrollChangedTimer = 0;
    let scrollPercentage = 0;

    const body = this.$refs['body'] as HTMLElement;
    if (body) {
      body.onscroll = (e: any) => {
        scrollChangedTimer = 1;
      };

      this.timerId2 = setInterval(() => {
        scrollChangedTimer -= 0.1;
        scrollPercentage = body.scrollTop / (body.scrollHeight - body.clientHeight);

        this.scrollChangedTimer = scrollChangedTimer;
        this.scrollPercentage = scrollPercentage;
      }, 100);
    }
  },
  beforeUnmount() {
    clearInterval(this.timerId2);
  },
  methods: {},
  data: () => {
    return {
      scrollPercentage: 0,
      scrollChangedTimer: 0,
      timerId: 0,
      timerId2: 0,
    };
  },
});
</script>

<style module lang="scss">
@import '../style/color.scss';
@import '../style/size.scss';

.block {
  height: max-content;
}

.block,
.block_scroll {
  padding: $gap-base;
  background-color: $gray-dark;
  border-radius: 4px;
  position: relative;

  .title {
    color: $text-gray;
    margin-bottom: $gap-base;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    display: flex;

    .button {
      margin-left: auto;
      flex: none;
    }
  }

  .body {
    overflow-y: scroll;
    height: calc(100% - 30px);
    position: relative;

    &::-webkit-scrollbar {
      width: 0;
    }
  }

  .scroll_info {
    background-color: $gray-dark;
    color: $text-gray;
    padding: 5px 10px;
    position: absolute;
    right: 20px;
    bottom: 20px;
    border-radius: 4px;
  }
}
</style>
