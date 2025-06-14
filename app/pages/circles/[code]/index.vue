<script setup lang="ts">
import AppContainer from "~/components/AppContainer.vue";
import type { Member } from "~/types";

const route = useRoute();

const yearData = ref<
  Array<number | { type: string; label: string; text: string; value: number }>
>([
  {
    type: "label",
    label: "Filter by year",
    text: "Filter by year",
    value: 0,
  },
  2024,
  2025,
  2026,
  2027,
  2028,
]);
const monthData: {
  text: string;
  value: number;
  type?: string;
  label?: string;
}[] = [
  {
    type: "label",
    label: "Filter by month",
    text: "Filter by month",
    value: 0,
  },
  { text: "January", value: 1 },
  { text: "February", value: 2 },
  { text: "March", value: 3 },
  { text: "April", value: 4 },
  { text: "May", value: 5 },
  { text: "June", value: 6 },
  { text: "July", value: 7 },
  { text: "August", value: 8 },
  { text: "September", value: 9 },
  { text: "October", value: 10 },
  { text: "November", value: 11 },
  { text: "December", value: 12 },
];

const toast = useToast();

console.log("params :", route.params.code);

const filters = reactive({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
});

const headers = useRequestHeaders(["cookie"]);
const { data, refresh } = await useAsyncData(() =>
  $fetch<{
    members: Member[];
    schedules: string[];
    codeInvitation: string;
  }>(
    `/api/circles/${route.params.code}?year=${filters.year}&month=${filters.month}`,
    {
      headers,
    }
  )
);

const handleCopyLink = (invitationCode: string) => {
  toast.add({
    title: "Invitation Link Copied",
    description: "The invitation link has been copied to your clipboard.",
    color: "success",
    icon: "i-heroicons-check-circle",
  });

  navigator.clipboard.writeText(
    `${window.location.origin}/circles/${route.params.code}/invitation/${invitationCode}`
  );
};

watch(
  () => [filters.year, filters.month],
  async () => {
    refresh();
  }
);
</script>

<template>
  <AppContainer class="relative min-h-screen">
    <AppTitle>The Last Hope</AppTitle>

    <div class="mt-8 flex flex-row gap-x-2 overflow-x-scroll py-4 no-scrollbar">
      <div
        class="relative"
        v-for="(member, index) in data?.members"
        :key="index"
      >
        <UAvatar
          :alt="member.nickname"
          size="3xl"
          class="mr-1"
          :ui="{
            root: getAvatarColor(member.id),
            fallback: 'text-white',
          }"
        />
        <div class="absolute -top-2 -right-1">
          <UButton size="xs" class="rounded-full" color="error">X</UButton>
        </div>
      </div>
    </div>

    <div class="mt-6 flex flex-row items-center gap-2">
      <div class="grid grid-cols-2 gap-x-2 w-full">
        <USelect
          placeholder="Filter by year"
          :items="yearData"
          v-model="filters.year"
        />
        <USelect
          placeholder="Filter by month"
          value-key="value"
          label-key="text"
          :items="monthData"
          v-model="filters.month"
        />
      </div>
    </div>

    <div class="my-8">
      <div class="grid grid-cols-3 gap-2">
        <div
          v-for="schedule in data?.schedules"
          class="w-full h-28 p-4 border border-gray-300 rounded-lg flex flex-col justify-between cursor-pointer"
          @click="
            () => {
              navigateTo(
                `/circles/${route.params.code}/attendance?date=${schedule}`
              );
            }
          "
        >
          <div class="w-full h-full flex items-center justify-center">
            <p>{{ schedule?.split("-")[2] }}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 flex justify-center items-center p-4 flex-col gap-y-2"
    >
      <UButton
        icon="i-heroicons-document-duplicate"
        block
        @click="() => handleCopyLink(data?.codeInvitation)"
        >Invitation Link</UButton
      >
    </div>
  </AppContainer>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
