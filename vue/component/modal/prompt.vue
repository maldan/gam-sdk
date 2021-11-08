<template>
  <div :class="$style.window">
    <ui-input
      ref="input"
      :placeholder="$store.state.modal.data.title"
      v-model="$store.state.modal.data.value"
    />
    <div class="button_group" :class="$style.group">
      <ui-button text="Cancel" @click="$store.dispatch('modal/close')" />
      <ui-button text="Ok" icon="plus" @click="$store.dispatch('modal/ok')" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {},
  components: {},
  async mounted() {
    (this.$refs['input'] as any)?.focus();
  },
  methods: {},
  data: () => {
    return {};
  },
});
</script>

<style module lang="scss">
@import '../../style/color.scss';
@import '../../style/size.scss';

.window {
  min-width: 320px;

  .group {
    margin-top: $gap-base;
  }
}
</style>
