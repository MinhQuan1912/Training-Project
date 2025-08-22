<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
      <UNotifications :toaster="{ position: 'top-0 right-0' }" />
    </NuxtLayout>
  </UApp>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>
