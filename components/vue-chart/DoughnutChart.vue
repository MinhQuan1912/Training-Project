<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed, ref } from "vue";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const props = defineProps({
  chartDataPoints: {
    type: Array,
    required: true,
  },
});

const hoveredIndex = ref(null);

const centerTextPlugin = {
  id: "centerTextPlugin",
  beforeDraw(chart) {
    const {
      ctx,
      chartArea: { width, height },
    } = chart;
    ctx.save();

    const activeTooltip = chart.tooltip._active[0];

    if (activeTooltip) {
      const dataIndex = activeTooltip.index;
      const dataPoint = props.chartDataPoints[dataIndex];
      const total = props.chartDataPoints.reduce(
        (sum, point) => sum + point.value,
        0
      );
      const percentage =
        total > 0 ? ((dataPoint.value / total) * 100).toFixed(1) : 0;

      const text = `${dataPoint.label}`;
      const valueText = `${dataPoint.value.toLocaleString("en-US")}`;
      const percentageText = `${percentage}%`;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 20px Arial";
      ctx.fillText(text, width / 2, height / 2 - 15);

      ctx.font = "normal 16px Arial";
      ctx.fillText(valueText, width / 2, height / 2 + 5);

      ctx.font = "normal 14px Arial";
      ctx.fillStyle = "#AAAAAA";
      ctx.fillText(percentageText, width / 2, height / 2 + 25);
    }
    ctx.restore();
  },
};

ChartJS.register(ArcElement, Tooltip, Legend, centerTextPlugin);

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
</script>
