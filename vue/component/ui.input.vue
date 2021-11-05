<template>
  <div :class="$style.input">
    <div v-if="icon" :class="$style.icon">
      <ui-icon :name="icon" :width="24" :color="iconColor" />
    </div>
    <input
      v-if="isEditAsText || (type !== 'date' && type !== 'datetime')"
      ref="input"
      :class="$style.input_field"
      :type="isEditAsText ? 'text' : type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="change"
    />

    <!-- date= -->
    <div v-if="type === 'date' && !isEditAsText" :class="$style.input_field_date">
      <div :class="$style.part">
        <div
          @mousedown="(editType = 'date'), (editIndex = index)"
          @wheel="scrollDateValue($event, index)"
          :class="$style.date"
          v-for="(item, index) in dateParts"
          :key="index"
        >
          {{ index == 0 ? `0000${item}`.slice(-4) : `00${item}`.slice(-2) }}
        </div>
      </div>

      <ui-button @click="isEditAsText = true" icon="pencil" size="empty" style="margin-left: 5px" />
    </div>

    <!-- datetime -->
    <div v-if="type === 'datetime' && !isEditAsText" :class="$style.input_field_datetime">
      <div :class="$style.part">
        <div
          @mousedown="(editType = 'date'), (editIndex = index)"
          @wheel="scrollDateValue($event, index)"
          :class="$style.date"
          v-for="(item, index) in dateParts"
          :key="index"
        >
          {{ item }}
        </div>
      </div>

      <div :class="$style.part" style="margin-left: 10px">
        <div
          @mousedown="(editType = 'time'), (editIndex = index)"
          @wheel="scrollTimeValue($event, index)"
          :class="$style.time"
          v-for="(item, index) in timeParts"
          :key="index"
        >
          {{ item }}
        </div>
      </div>

      <ui-button @click="isEditAsText = true" icon="pencil" size="empty" style="margin-left: 5px" />
    </div>

    <ui-button
      v-if="functionIcon"
      :class="$style.icon"
      @click="clickOnFunction"
      :icon="functionIcon"
      iconPosition="center"
      style="padding: 0"
    />
  </div>
</template>

<script lang="ts">
import Moment from 'moment';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    placeholder: String,
    icon: String,
    iconColor: {
      type: String,
      default: '#E38414',
    },
    functionIcon: String,
    functionClick: [Function, String],
    modelValue: {
      type: String,
      required: true,
    },
    type: String,
  },
  computed: {
    dateParts() {
      return this.modelValue.replace('T', ' ').split(' ')[0].split('-');
    },
    timeParts() {
      const p = this.modelValue.replace('T', ' ').split(' ');
      if (p.length < 2) return [];
      const t = p[1].split(':');
      return [t[0], t[1], t[2].split('.')[0]];
    },
  },
  async mounted() {
    this.mouseMove = (e: MouseEvent) => {
      if (this.editType === 'date') {
        // this.incrementDateTime('date', this.editIndex, (e.pageY / 100) | 0);
      }
    };
    this.mouseUp = (e: MouseEvent) => {
      this.editType = '';
    };
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  },
  beforeUnmount() {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  },
  methods: {
    change(e: any) {
      this.$emit('update:modelValue', e.target.value);
    },
    clickOnFunction() {
      if (typeof this.functionClick === 'function') {
        this.$emit('update:modelValue', this.functionClick(this.modelValue));
      }
      if (typeof this.functionClick === 'string') {
        if (this.functionClick === 'currentDate')
          this.$emit('update:modelValue', Moment().format('YYYY-MM-DD'));
        if (this.functionClick === 'currentTime')
          this.$emit('update:modelValue', Moment().format('HH:mm:ss'));
        if (this.functionClick === 'currentDateTime')
          this.$emit('update:modelValue', Moment().format('YYYY-MM-DD HH:mm:ss'));
      }
    },
    focus() {
      (this.$refs['input'] as any).focus();
    },
    incrementDateTime(type: string, index: number, amount: number) {
      const date = this.dateParts.map(Number);
      const time = this.timeParts.map(Number);

      if (type === 'date') {
        date[index] += ~~amount;

        if (date[1] < 1) date[1] = 12;
        if (date[1] > 12) date[1] = 1;

        if (date[2] < 1) date[2] = 31;
        if (date[2] > 31) date[2] = 1;
      }

      if (type === 'time') {
        time[index] += ~~amount;

        if (time[0] < 0) time[0] = 23;
        if (time[0] > 23) time[0] = 0;

        if (time[1] < 0) time[1] = 59;
        if (time[1] > 59) time[1] = 0;

        if (time[2] < 0) time[2] = 59;
        if (time[2] > 59) time[2] = 0;
      }

      let outDate = [
        `0000${date[0]}`.slice(-4),
        `00${date[1]}`.slice(-2),
        `00${date[2]}`.slice(-2),
      ];
      let outTime = [
        `00${~~time[0]}`.slice(-2),
        `00${~~time[1]}`.slice(-2),
        `00${~~time[2]}`.slice(-2),
      ];

      this.$emit('update:modelValue', [outDate.join('-'), outTime.join(':')].join(' '));
    },
    scrollDateValue(e: WheelEvent, index: number) {
      e.preventDefault();
      e.stopPropagation();

      if (e.deltaY > 0) {
        this.incrementDateTime('date', index, -1);
      } else {
        this.incrementDateTime('date', index, 1);
      }
    },
    scrollTimeValue(e: WheelEvent, index: number) {
      e.preventDefault();
      e.stopPropagation();

      if (e.deltaY > 0) {
        this.incrementDateTime('time', index, -1);
      } else {
        this.incrementDateTime('time', index, 1);
      }
    },
  },
  data: () => {
    return {
      editType: '',
      editIndex: 0,
      mouseMove: null as any,
      mouseUp: null as any,
      isEditAsText: false,
    };
  },
});
</script>

<style module lang="scss">
@import '../style/color.scss';
@import '../style/size.scss';

.input {
  display: flex;
  align-items: center;
  flex: 1;
  box-sizing: border-box;

  .icon {
    flex: none;
    background: $gray-very-light;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px 0 0 4px;
    border-right: 1px solid $gray-medium;
    box-sizing: border-box;

    img {
      display: block;
    }

    &:last-child {
      border: 0;
      border-radius: 0 4px 4px 0;
      border-left: 1px solid $gray-medium;
    }
  }

  .input_field,
  .input_field_date,
  .input_field_datetime {
    box-sizing: border-box;
    background: $gray-light;
    color: $text-gray;
    border: 0;
    padding: 10px;
    flex: 1;
    outline: none;
    font-size: 16px;
    border: 1px solid transparent;
    min-width: 0;

    &:focus {
      border: 1px solid $text-gray;
    }
  }

  .input_field_date,
  .input_field_datetime {
    padding: 5px;
    display: flex;
    user-select: none;

    .part {
      display: flex;
      background-color: $gray-medium;
      // margin-right: $gap-base;
      border-radius: 4px;

      .date,
      .time {
        padding: 5px;
        cursor: n-resize;
        &:last-child {
          margin-right: 0;
        }
      }

      .date {
        color: $text-gray;

        &::after {
          content: ' -';
          position: relative;
          left: 2px;
        }

        &:last-child {
          &::after {
            content: '';
          }
        }
      }

      .time {
        color: $text-green;

        &::after {
          content: ' :';
          position: relative;
          left: 3px;
        }

        &:last-child {
          &::after {
            content: '';
          }
        }
      }
    }
  }
}
</style>
