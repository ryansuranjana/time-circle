<script lang="ts" setup>
useHead({
  titleTemplate: (title) => (title ? `${title} | Time Circle` : "Time Circle"),
});
</script>

<template>
  <NuxtLoadingIndicator />
  <UApp>
    <NuxtPage />
  </UApp>
</template>
