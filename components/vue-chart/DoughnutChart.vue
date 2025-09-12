<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed, ref } from "vue";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
  chartDataPoints: {
    type: Array,
    required: true,
  },
});

const hoveredIndex = ref(null);

const chartData = computed(() => {
  const labels = props.chartDataPoints.map((point) => point.label);
  const data = props.chartDataPoints.map((point) => point.value);
  const colors = props.chartDataPoints.map((point, index) =>
    index === hoveredIndex.value ? "#00B512" : point.color
  );

  return {
    labels: labels,
    datasets: [
      {
        backgroundColor: colors,
        data: data,
        borderWidth: 5,
        borderColor: "#191919",
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "75%",
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        title: (context) => {
          const dataIndex = context[0].dataIndex;
          return props.chartDataPoints[dataIndex].label;
        },
        label: (context) => {
          const dataIndex = context.dataIndex;
          const value = props.chartDataPoints[dataIndex].value;
          return value.toLocaleString("en-US");
        },
      },
      backgroundColor: "#282828",
      titleColor: "#FFFFFF",
      bodyColor: "#FFFFFF",
      borderColor: "#FFFFFF",
      borderWidth: 1,
      displayColors: false,
      padding: 10,
    },
  },
  onHover: (event, elements, chart) => {
    if (elements.length) {
      const index = elements[0].index;
      if (hoveredIndex.value !== index) {
        hoveredIndex.value = index;
        chart.update();
      }
    } else if (hoveredIndex.value !== null) {
      hoveredIndex.value = null;
      chart.update();
    }
  },
};

const totalCount = computed(() =>
  props.chartDataPoints.reduce((sum, point) => sum + point.value, 0)
);
const totalLabel = "Total";

const centerTextPlugin = {
  id: "centerText",
  beforeDraw(chart) {
    const { ctx, width, height } = chart;
    ctx.restore();
    ctx.textBaseline = "middle";

    let mainText, subText;
    if (hoveredIndex.value !== null) {
      const point = props.chartDataPoints[hoveredIndex.value];
      const total = totalCount.value;
      const percentage = ((point.value / total) * 100).toFixed(1) + "%";
      mainText = percentage;
      subText = point.label;
      ctx.fillStyle = "#00B512";
    } else {
      mainText = totalCount.value.toString();
      subText = "Total";
      ctx.fillStyle = "#FFFFFF";
    }

    const mainFontSize = (height / 114).toFixed(2);
    ctx.font = `bolder ${mainFontSize}em sans-serif`;
    const mainTextWidth = ctx.measureText(mainText).width;
    const mainX = Math.round((width - mainTextWidth) / 2);
    const mainY = height / 2 - 15;
    ctx.fillText(mainText, mainX, mainY);

    const subFontSize = (height / 180).toFixed(2);
    ctx.font = `normal ${subFontSize}em sans-serif`;
    const subTextWidth = ctx.measureText(subText).width;
    const subX = Math.round((width - subTextWidth) / 2);
    const subY = height / 2 + 15;
    ctx.fillText(subText, subX, subY);
    ctx.save();
  },
};
</script>
