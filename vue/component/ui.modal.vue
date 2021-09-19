<template>
  <div :class="$style.modal">
    <div :class="$style.window">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {},
  components: {},
  async mounted() {},
  methods: {},
  data: () => {
    return {};
  },
});
</script>

<style lang="scss" module>
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;

  .window {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #222222;
    color: #cacaca;
    padding: 10px;
  }
}
</style>
