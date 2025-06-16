<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import type { Circle } from "~/types";

definePageMeta({
  middleware: ["auth"],
});

const headers = useRequestHeaders(["cookie"]);

const { user, clear: clearSession } = useUserSession();
const [search, searchDebounce] = useDebouncedSearch("");

const { data, refresh } = await useAsyncData("circles", () =>
  $fetch<{
    circles: Circle[];
  }>(`/api/circles${search?.value ? `?search=${search?.value}` : ""}`, {
    headers,
  })
);

const userMenu = ref<DropdownMenuItem[]>([
  {
    label: "Profile",
    icon: "i-lucide-user",
  },
  {
    label: "logout",
    icon: "i-lucide-log-out",
    onSelect: async () => {
      await clearSession();
      await navigateTo("/login");
    },
  },
]);

watch(
  () => searchDebounce?.value,
  (val) => {
    refresh();
  }
);
</script>

<template>
  <AppContainer class="relative h-screen">
    <div class="mb-14">
      <div class="flex justify-between mb-6">
        <AppTitle>Circle</AppTitle>
        <UDropdownMenu
          :items="userMenu"
          :content="{
            align: 'end',
            side: 'bottom',
            sideOffset: 8,
          }"
          :ui="{
            content: 'w-48',
          }"
        >
          <UAvatar :alt="user?.nickname" size="md" class="cursor-pointer" />
        </UDropdownMenu>
      </div>
      <div class="flex flex-row gap-x-2">
        <UInput
          icon="i-lucide-search"
          size="md"
          variant="outline"
          placeholder="Search..."
          class="w-full"
          v-model="search"
        />
        <!-- <UButton size="md" color="primary" variant="solid">Join</UButton> -->
      </div>
    </div>

    <div
      class="flex flex-col gap-y-4 h-[65vh] p-1 overflow-y-auto"
      style="scrollbar-width: none"
    >
      <UCard
        v-for="circle in data?.circles"
        :key="circle.id"
        @click="() => navigateTo(`/circles/${circle.code}`)"
        class="cursor-pointer"
      >
        <p>{{ circle.name }}</p>

        <p class="text-sm mt-6 text-muted">
          {{ circle?.members?.length || 0 }} people
        </p>
      </UCard>
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 flex justify-center items-center p-4 flex-col gap-y-2"
    >
      <UButton
        @click="
          async () => {
            await navigateTo('/circles/create');
          }
        "
        block
        >Create Circle</UButton
      >
      <UButton
        block
        color="error"
        @click="
          async () => {
            await navigateTo('/schedules');
          }
        "
        >Schedules</UButton
      >
    </div>
  </AppContainer>
</template>
