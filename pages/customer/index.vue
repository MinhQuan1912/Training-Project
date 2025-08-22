<template>
  <div class="flex gap-3">
    <div class="flex flex-col gap-3 w-[58vw]">
      <div class="bg-background-02 rounded-4xl flex flex-col gap-4 p-3">
        <OverviewTitle />

        <OverviewTable />
      </div>

      <TrafficChannel />

      <ActiveTimes />

      <ShareProducts />
    </div>

    <div class="flex flex-col gap-3">
      <RefundRequests />

      <Devices />

      <Countries />

      <Messages />

      <Gender />
    </div>
  </div>
</template>

<script setup>
import OverviewTitle from "~/components/title/customers/OverviewTitle.vue";
import OverviewTable from "~/components/table/customers/OverviewTable.vue";
import TrafficChannel from "~/components/table/customers/TrafficChannel.vue";
import ActiveTimes from "~/components/table/customers/ActiveTimes.vue";
import ShareProducts from "~/components/table/customers/ShareProducts.vue";
import RefundRequests from "~/components/table/customers/RefundRequests.vue";
import Devices from "~/components/table/customers/Devices.vue";
import Countries from "~/components/table/customers/Countries.vue";
import Messages from "~/components/table/customers/Messages.vue";
import Gender from "~/components/table/customers/Gender.vue";
</script>

<style lang="scss" scoped></style>
