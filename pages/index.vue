<template>
  <div>
    <p>Tháng hiện tại (tiếng Anh): {{ getMonthName() }}</p>
  </div>
</template>

<script>
import { format } from "date-fns";
import { enUS } from "date-fns/locale"; // Import locale tiếng Anh

export default {
  methods: {
    getMonthName() {
      const currentDate = new Date();
      // Sử dụng hàm format và truyền locale enUS vào
      return format(currentDate, "MMMM", { locale: enUS });
    },
  },
};
</script>
