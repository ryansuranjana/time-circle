<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();
const isProcessingJoining = ref(false);
const toast = useToast();

const headers = useRequestHeaders(["cookie"]);
const { data } = await useAsyncData(() =>
  $fetch<{
    countMembers: number;
    isAlreadyJoined: boolean;
  }>(`/api/circles/${route.params.code}/join/${route.params.link}/check`, {
    headers: headers,
  })
);

console.log("data :", data.value);

const handleJoinCircle = () => {
  isProcessingJoining.value = true;

  $fetch(`/api/circles/${route.params.code}/join/${route.params.link}`, {
    method: "POST",
    headers: headers,
    async onResponse({ response }) {
      isProcessingJoining.value = false;

      if (response.status === 200) {
        toast.add({
          title: "Joined circle successfully",
          description: "You can now access the circle.",
          variant: "success",
        });
        setTimeout(async () => {
          await navigateTo(`/circles/${route.params.code}`);
        }, 500);
      }
    },
  });
};

console.log("params :", route.params.code, route.params.link);
</script>

<template>
  <AppContainer class="h-screen">
    <div class="w-full h-full flex justify-center items-center">
      <div class="text-center">
        <p class="text-3xl font-bold mb-1">The Last Hope</p>
        <p class="mb-8">{{ data.countMembers }} people</p>
        <UButton
          v-if="!data?.isAlreadyJoined"
          icon="i-heroicons-user-group"
          size="lg"
          :loading="isProcessingJoining"
          @click="handleJoinCircle"
          >Join circle</UButton
        >
        <UButton
          v-else
          icon="i-heroicons-check-circle"
          size="lg"
          color="success"
          @click="
            () => {
              navigateTo(`/circles/${route.params.code}`);
            }
          "
          >Already joined</UButton
        >
      </div>
    </div>
  </AppContainer>
</template>
