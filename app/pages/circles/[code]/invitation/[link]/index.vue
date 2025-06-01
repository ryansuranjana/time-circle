<script setup lang="ts">
const route = useRoute();
const isProcessingJoining = ref(false);
const toast = useToast();

const handleJoinCircle = () => {
  isProcessingJoining.value = true;

  setTimeout(() => {
    isProcessingJoining.value = false;

    navigateTo(`/circles/${route.params.code}`);

    toast.add({
      title: "Success",
      description: "You have successfully joined the circle.",
    });
  }, 2000);
};

console.log("params :", route.params.code, route.params.link);
</script>

<template>
  <AppContainer class="h-screen">
    <div class="w-full h-full flex justify-center items-center">
      <div class="text-center">
        <p class="text-3xl font-bold mb-1">The Last Hope</p>
        <p class="mb-8">8 people</p>
        <UButton
          icon="i-heroicons-user-group"
          size="lg"
          :loading="isProcessingJoining"
          @click="handleJoinCircle"
          >Join circle</UButton
        >
      </div>
    </div>
  </AppContainer>
</template>
