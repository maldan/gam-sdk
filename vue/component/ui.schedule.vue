<template>
  <div ref="schedule" :class="$style.schedule">
    <!-- Map -->
    <div ref="year" :class="$style.year">
      <div :class="$style.month" v-for="(x, i) in month" :key="x">
        <div>{{ x }}</div>
        <div style="display: grid; margin-top: 10px; grid-template-columns: repeat(7, 15px)">
          <div
            @click="$emit('select', new Date(z))"
            class="clickable"
            :class="[
              $style.cell,
              moment(new Date()).format('DD MMM YYYY') === moment(z).format('DD MMM YYYY')
                ? $style.today
                : '',
              moment(date).format('DD MMM YYYY') === moment(z).format('DD MMM YYYY')
                ? $style.selected
                : '',
              z === null ? $style.null : '',
            ]"
            :style="{
              background: getPower(map[moment(z).format('YYYY-MM-DD')]),
            }"
            v-for="z in days[i]"
            :key="z"
            :title="finalFormat(map[moment(z).format('YYYY-MM-DD')])"
          ></div>
        </div>
      </div>
    </div>

    <!-- Info -->
    <div :class="$style.labels">
      <div><b>Date</b> {{ moment(date).format('DD MMM YYYY') }}</div>
      <div><b>Day</b> {{ finalFormat(map[moment(date).format('YYYY-MM-DD')]) }}</div>
      <div><b>Month</b> {{ finalFormat(totalMonth) }}</div>
      <div><b>Year</b> {{ finalFormat(total) }}</div>
    </div>

    <!-- Change year -->
    <div style="margin-top: 5px">
      <button
        v-for="x in yearRange"
        :class="[
          $style.change_year,
          date.getFullYear() === new Date().getFullYear() + x ? $style.selected : '',
        ]"
        class="clickable"
        :key="x"
        @click="
          $emit(
            'select',
            new Date(new Date().getFullYear() + x, new Date().getMonth(), new Date().getDate()),
          )
        "
      >
        {{ new Date().getFullYear() + x }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Moment from 'moment';

export default defineComponent({
  props: {
    date: {
      type: Object,
      default: () => {
        return new Date();
      },
    },
    map: Object,
    max: {
      type: Number,
      required: true,
    },
    color: String,
    yearRange: {
      type: Array,
      default: () => {
        return [];
      },
    },
    formatValue: {
      type: [String, Function],
    },
  },
  components: {},
  watch: {
    map(val: any) {
      this.calculateTotal();
    },
    date(val: Date) {
      this.calculateTotal();
      this.refresh();
    },
  },
  async mounted() {
    this.refresh();

    this.keyboardEvent = (e: KeyboardEvent) => {
      // @ts-ignore
      if (this.$store.state.modal.name) {
        return;
      }
      if (e.key === 'ArrowRight') {
        // @ts-ignore
        const date = Moment(this.date).add(1, 'day').toDate();
        this.$emit('select', date);
      }
      if (e.key === 'ArrowLeft') {
        // @ts-ignore
        const date = Moment(this.date).add(-1, 'day').toDate();
        this.$emit('select', date);
      }
      if (e.key === 'ArrowUp') {
        // @ts-ignore
        const date = Moment(this.date).add(-7, 'day').toDate();
        this.$emit('select', date);
      }
      if (e.key === 'ArrowDown') {
        // @ts-ignore
        const date = Moment(this.date).add(7, 'day').toDate();
        this.$emit('select', date);
      }
    };

    this.resizeEvent = (e: any) => {
      const schedule = this.$refs['schedule'] as HTMLElement;
      const year = this.$refs['year'] as HTMLElement;
      const w = schedule.getBoundingClientRect().width;

      year.style.gridTemplateColumns = 'repeat(3, 1fr)';
      if (w > 600) year.style.gridTemplateColumns = 'repeat(4, 1fr)';
      if (w > 700) year.style.gridTemplateColumns = 'repeat(6, 1fr)';
    };

    document.addEventListener('keydown', this.keyboardEvent);
    window.addEventListener('resize', this.resizeEvent);
    this.resizeEvent();
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.keyboardEvent);
    window.removeEventListener('resize', this.resizeEvent);
  },
  methods: {
    moment: Moment,
    getPower(power: number) {
      if (power === undefined) return 'transparent';
      if (power <= 0) return '#e2e2e223';

      let amount = power / this.max;
      if (amount >= 1) {
        amount = 1;
      }
      if (amount <= 0.3) {
        amount = 0.3;
      }

      let mm = ('00' + ((amount * 255) | 0).toString(16)).slice(-2);

      return `${this.color || '#c97a19'}${mm}`;
    },
    refresh() {
      for (let i = 0; i < 12; i++) {
        const l = this.getDates(i);
        const ll = [];
        let dd = l[0].getDay() - 1;
        if (dd < 0) {
          dd = 6;
        }
        for (let j = 0; j < dd; j++) {
          ll.push(null);
        }
        this.days[i] = [...ll, ...l];
      }
    },
    getDates(month: number) {
      const year = this.date.getFullYear();
      const out = [];
      for (let i = 1; i <= 32; i++) {
        const cFrom = new Date(
          `${year}-${('00' + (month + 1)).slice(-2)}-${('00' + i).slice(-2)}T00:00:00.000+00:00`,
        );
        if (cFrom.toString() === 'Invalid Date') {
          continue;
        }
        if (cFrom.getMonth() !== month) {
          break;
        }

        out.push(cFrom);
      }
      return out;
    },
    calculateTotal() {
      this.total = 0;
      this.totalMonth = 0;
      for (let s in this.map) {
        this.total += this.map[s];
        if (Moment(this.date).format('YYYY-MM') === Moment(s).format('YYYY-MM')) {
          this.totalMonth += this.map[s];
        }
      }
    },
    finalFormat(value: number) {
      if (this.formatValue === 'time') return this.formatAsTime(value);
      if (typeof this.formatValue === 'function') return this.formatValue(value);
      return value.toFixed(2);
    },
    formatAsTime(time: number) {
      const h = ~~(time / 3600);
      const m = (time / 60) % 60;
      return `${h} h ${~~m} m`;
    },
  },
  data: () => {
    return {
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days: [] as any[],
      total: 0,
      totalMonth: 0,
      keyboardEvent: null as any,
      resizeEvent: null as any,
    };
  },
});
</script>

<style lang="scss" module>
.schedule {
  display: flex;
  flex-direction: column;

  .year {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;

    .month {
      flex: 1;
      font-size: 12px;
      color: #acacac;

      .cell {
        width: 11px;
        height: 11px;
        background: #2b2b2b;
        border: 1px solid transparent;
        font-size: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2px;

        &.null {
          pointer-events: none;
          background: transparent;
        }

        &.selected {
          border: 1px solid #ca6f00;
        }

        &.today::before {
          content: '●';
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fefefe;
        }
      }
    }
  }

  .labels {
    margin-top: 15px;
    color: #979797;
    display: flex;
    margin-bottom: 10px;

    > div {
      background: #323232;
      font-size: 14px;
      border-radius: 4px;
      padding: 5px 10px;
      width: max-content;
      margin-right: 10px;

      b {
        margin-right: 5px;
      }
    }
  }

  .change_year {
    background: #323232;
    padding: 5px 15px;
    border: 0;
    border-radius: 3px;
    color: #818181;
    font-weight: bold;
    margin-right: 5px;

    &.selected {
      background: #025da3;
      color: #74baf0;
    }
  }
}
</style>
