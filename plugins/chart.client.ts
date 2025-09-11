// chart.client.ts
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  // Add these two for line charts
  LineElement,
  LineController,
} from "chart.js";

export default defineNuxtPlugin(() => {
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    // Add these two for line charts
    LineElement,
    LineController
  );
});
