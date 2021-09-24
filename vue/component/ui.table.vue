<template>
  <table :class="$style.table">
    <thead>
      <tr>
        <th v-for="x in header" :key="x">{{ x }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="x in data" :key="x.id">
        <td v-for="y in header" :key="y">{{ x[y] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    header: Array,
    data: Array,
  },
  async mounted() {},
  methods: {},
  data: () => {
    return {};
  },
});
</script>

<style module lang="scss">
.table {
  border-collapse: collapse;
  width: 100%;

  thead {
    background: #505050;
    text-align: left;

    tr {
      th {
        padding: 5px 10px;
      }
    }
  }

  tbody {
    background: #404040;
    color: #a9a9a9;
    text-align: left;

    tr {
      td {
        padding: 5px 10px;
      }
    }
  }
}
</style>
