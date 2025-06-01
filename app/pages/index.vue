<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import type { Circle } from "~/types";

const data: Circle[] = [
  {
    id: 1,
    code: "ABHSU",
    name: "The Last Hope",
    members: [
      {
        id: 1,
        username: "Ryan",
        email: "ryan@gmail.com",
      },
      {
        id: 2,
        username: "Bayu",
        email: "bayu@gmail.com",
      },
      {
        id: 3,
        username: "Eka",
        email: "eka@gmail.com",
      },
    ],
  },
  {
    id: 1,
    code: "ABHSU",
    name: "Enigma",
    members: [],
  },
];

const userMenu = ref<DropdownMenuItem[]>([
  {
    label: "Profile",
    icon: "i-lucide-user",
  },
  {
    label: "logout",
    icon: "i-lucide-log-out",
    onSelect: async () => {
      await navigateTo("/login");
    },
  },
]);
</script>

<template>
  <AppContainer class="relative min-h-screen">
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
          <UAvatar text="RY" size="md" />
        </UDropdownMenu>
      </div>
      <div class="flex flex-row gap-x-2">
        <UInput
          icon="i-lucide-search"
          size="md"
          variant="outline"
          placeholder="Search..."
          class="w-full"
        />
        <!-- <UButton size="md" color="primary" variant="solid">Join</UButton> -->
      </div>
    </div>

    <div class="flex flex-col gap-y-4">
      <UCard
        v-for="circle in data"
        :key="circle.id"
        @click="() => navigateTo(`/circles/${circle.code}`)"
        class="cursor-pointer"
      >
        <p>{{ circle.name }}</p>

        <p class="text-sm mt-6 text-muted">
          {{ circle.members.length }} people
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
