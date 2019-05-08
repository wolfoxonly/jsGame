Vue.component("SliderPips", {
  template: "\n    <div class=\"slider-pips\">\n      \n      <input v-for=\"(value, index) in vals\"\n        :key=\"'range' + index\" \n        class=\"slider-pips__range\" \n        :class=\"[ 'slider-pips__range--' + (index + 1) ]\"\n        type=\"range\" :min=\"min\" :max=\"max\" :step=\"step\" v-model=\"value\"\n        @change=\"updateValue( $event, index )\"\n        @input=\"updateValue( $event, index )\" />\n      \n      <ul v-if=\"floats\"\n        class=\"slider-pips__floats\">\n        <li v-for=\"(value, index) in vals\"\n          class=\"slider-pips__float\"\n          :class=\"[ 'slider-pips__float--' + (index + 1) ]\"\n          :style=\"{ 'left': floatPos(value) }\">\n          {{value}}\n        </li>\n      </ul>\n\n      <div v-if=\"isRange\" \n        class=\"slider-pips__range-holder\">\n        <div class=\"slider-pips__range-selection\"\n          :style=\"{ width: rangeWidth, left: rangeLeft }\"></div>\n      </div>\n\n      <ul class=\"slider-pips__pips\">\n\n        <li class=\"slider-pips__pip\" \n            :class=\"[{\n              'slider-pips__pip--selected': isPipSelected( index ),\n              'slider-pips__pip--in-range': isPipInRange( index ) \n              }, selectedPipClassName( index )\n            ]\"\n            v-for=\"( pip, index ) in pipCount\" \n            @click=\"selectPip( index )\"\n            :style=\"{ left: pipPos( index ) }\">\n\n          <span class=\"slider-pips__label\"\n            :class=\"{ 'slider-pips__label--hidden': !labels }\">\n            {{ pipLabel( index ) }}\n          </span>\n\n        </li>\n\n      </ul>\n\n    </div>\n  ",

















































  data: function data() {
    return {
      vals: this.values };

  },
  props: {
    values: { type: Array, default: [0] },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    labels: Boolean,
    range: Boolean,
    floats: Boolean },

  watch: {},


  computed: {
    isRange: function isRange() {
      return this.range;
    },
    pipCount: function pipCount() {
      return Math.round((this.fixedMax - this.fixedMin) / this.fixedStep + 1);
    },
    fixedStep: function fixedStep() {
      return this.fixValue(this.step);
    },
    fixedMin: function fixedMin() {
      return this.fixValue(this.min);
    },
    fixedMax: function fixedMax() {
      return this.fixValue(this.max);
    },
    rangeFraction: function rangeFraction() {
      return 100 / (this.fixedMax - this.fixedMin);
    },
    rangeWidth: function rangeWidth() {
      if (this.vals.length === 1) {
        return (this.vals[0] - this.fixedMin) * this.rangeFraction + "%";
      } else {
        return (this.vals[1] - this.vals[0]) * this.rangeFraction + "%";
      }
    },
    rangeLeft: function rangeLeft() {
      if (this.vals.length === 1) {
        return "0%";
      } else {
        return -(this.fixedMin - this.vals[0]) * this.rangeFraction + "%";
      }
    } },

  methods: {
    fixValue: function fixValue(value) {
      return parseFloat(parseFloat(value).toFixed(2));
    },
    pipPos: function pipPos(index) {
      return index * this.rangeFraction * this.fixedStep + "%";
    },
    floatPos: function floatPos(value) {
      value = this.fixValue(value);
      return -(this.fixedMin - value) * this.rangeFraction + "%";
    },
    pipLabel: function pipLabel(index) {
      return this.fixValue(this.fixedMin + index * this.fixedStep);
    },
    selectPip: function selectPip(index) {
      var pipValue = this.fixValue(this.fixedMin + index * this.fixedStep);
      var handle = this.getClosestHandle(pipValue);
      this.$set(this.vals, handle, pipValue);
    },
    isPipSelected: function isPipSelected(index) {
      var pipValue = this.fixValue(this.fixedMin + index * this.fixedStep);
      return this.vals.includes(pipValue);
    },
    isPipInRange: function isPipInRange(index) {
      var pipValue = this.fixValue(this.fixedMin + index * this.fixedStep);
      return pipValue >= this.fixedMin && pipValue <= this.vals[0];
    },
    updateValue: function updateValue(ev, handle) {
      var pipValue = this.fixValue(ev.target.value);
      if (this.isRange && this.vals.length > 1) {
        if (handle === 0 && pipValue > this.vals[1]) {
          this.$set(this.vals, 0, this.vals[1]);
        } else if (handle === 1 && pipValue < this.vals[0]) {
          this.$set(this.vals, 1, this.vals[0]);
        } else {
          this.$set(this.vals, handle, pipValue);
        }
      } else {
        this.$set(this.vals, handle, pipValue);
      }
    },
    getClosestHandle: function getClosestHandle(value) {
      var closest = this.vals.reduce(function (p, c) {
        return Math.abs(c - value) < Math.abs(p - value) ? c : p;
      });
      return this.vals.indexOf(closest);
    },
    selectedPipClassName: function selectedPipClassName(pipIndex) {
      var className = "";
      var pipValue = this.fixValue(this.fixedMin + pipIndex * this.fixedStep);
      this.vals.forEach(function (v, i) {
        if (v === pipValue) {
          className += " slider-pips__pip--selected--" + (i + 1);
        }
      });
      return className;
    } },

  mounted: function mounted() {
  } });


var app = new Vue({
  el: "#app",
  data: {
    sliderValues: [-12, 12],
    hugeValues: [-30, -10, 20, 30] } });