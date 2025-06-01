<script setup lang="ts"></script>

<template>
  <AppContainer class="relative min-h-screen">
    <AppTitle>Create Circle</AppTitle>

    <div class="my-6">
      <UFormField label="Circle Name">
        <UInput placeholder="Enter circle name" class="w-full" size="lg" />
      </UFormField>
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 flex justify-center items-center p-4 flex-col gap-y-2"
    >
      <UButton size="lg" block>Save</UButton>
    </div>
  </AppContainer>
</template>
