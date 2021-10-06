<template>
  <div :class="$style.schedule">
    <div :class="$style.year">
      <div :class="$style.month" v-for="(x, i) in month" :key="x">
        <div>{{ x }}</div>
        <div style="display: grid; margin-top: 10px; grid-template-columns: repeat(7, 15px)">
          <div
            @click="$emit('select', z), (date = z)"
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
            :title="map[moment(z).format('YYYY-MM-DD')]"
          ></div>
        </div>
      </div>
    </div>
    <div style="margin-top: 15px; color: #979797">
      Date: {{ moment(date).format('DD MMM YYYY') }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Moment from 'moment';

export default defineComponent({
  props: {
    //item: Object,
    //type: String,
    //mode: String,
    map: Object,
    max: {
      type: Number,
      required: true,
    },
    color: String,
  },
  components: {},
  async mounted() {
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

    this.getYearMap();
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

      /*else if (power / (this as any)[this.type + '']?.[this.mode + ''] >= 0.8) return '#00ff4299';
      else if (power / (this as any)[this.type + '']?.[this.mode + ''] >= 0.5) return '#ffec0999';
      else if (power / (this as any)[this.type + '']?.[this.mode + ''] >= 0.2) return '#ff96157a';
      else return '#fb0b0b63';*/
      return `${this.color || '#c97a19'}${mm}`;
    },
    async getYearMap() {
      // this.map = await RestApi.training.getYearMap(Moment(this.date).format('YYYY-MM-DD'));
    },
    getDates(month: number) {
      const year = new Date().getFullYear();
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
  },
  data: () => {
    return {
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days: [] as any[],
      date: new Date(),
      // map: {},
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
}
</style>
