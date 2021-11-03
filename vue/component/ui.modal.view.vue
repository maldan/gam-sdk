<template>
  <ui-modal v-if="$store.state.modal.name">
    <component :is="'modal-' + $store.state.modal.name.replace(/\//g, '-')" />
  </ui-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {},
  async mounted() {},
  methods: {},
  data: () => {
    return {};
  },
});
</script>

<style module lang="scss"></style>
