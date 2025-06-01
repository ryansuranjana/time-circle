<script setup lang="ts">
import AppContainer from "~/components/AppContainer.vue";

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

const handleCopyLink = () => {
  toast.add({
    title: "Invitation Link Copied",
    description: "The invitation link has been copied to your clipboard.",
    color: "success",
    icon: "i-heroicons-check-circle",
  });

  navigator.clipboard.writeText(
    `${window.location.origin}/circles/${route.params.code}/invitation/dhjjshshgdgs`
  );
};

console.log("params :", route.params.code);
</script>

<template>
  <AppContainer>
    <AppTitle>The Last Hope</AppTitle>

    <div class="mt-8 flex flex-row gap-x-2 overflow-x-scroll py-4 no-scrollbar">
      <div class="relative">
        <UAvatar
          alt="Eka Purwadi"
          size="3xl"
          class="mr-1"
          :ui="{
            root: 'bg-yellow-500',
            fallback: 'text-white',
          }"
        />
        <div class="absolute -top-2 -right-1">
          <UButton size="xs" class="rounded-full" color="error">X</UButton>
        </div>
      </div>
      <div class="relative">
        <UAvatar
          alt="Raja"
          size="3xl"
          class="mr-1"
          :ui="{
            root: 'bg-green-500',
            fallback: 'text-white',
          }"
        />
        <div class="absolute -top-2 -right-1">
          <UButton size="xs" class="rounded-full" color="error">X</UButton>
        </div>
      </div>
      <div class="relative">
        <UAvatar
          alt="Yudis"
          size="3xl"
          class="mr-1"
          :ui="{
            root: 'bg-cyan-500',
            fallback: 'text-white',
          }"
        />
        <div class="absolute -top-2 -right-1">
          <UButton size="xs" class="rounded-full" color="error">X</UButton>
        </div>
      </div>
      <div class="relative">
        <UAvatar
          alt="Yudis"
          size="3xl"
          class="mr-1"
          :ui="{
            root: 'bg-cyan-500',
            fallback: 'text-white',
          }"
        />
        <div class="absolute -top-2 -right-1">
          <UButton size="xs" class="rounded-full" color="error">X</UButton>
        </div>
      </div>
      <div class="relative">
        <UAvatar
          alt="Yudis"
          size="3xl"
          class="mr-1"
          :ui="{
            root: 'bg-cyan-500',
            fallback: 'text-white',
          }"
        />
        <div class="absolute -top-2 -right-1">
          <UButton size="xs" class="rounded-full" color="error">X</UButton>
        </div>
      </div>
      <div class="relative">
        <UAvatar
          alt="Yudis"
          size="3xl"
          class="mr-1"
          :ui="{
            root: 'bg-cyan-500',
            fallback: 'text-white',
          }"
        />
        <div class="absolute -top-2 -right-1">
          <UButton size="xs" class="rounded-full" color="error">X</UButton>
        </div>
      </div>
      <div class="relative">
        <UAvatar
          alt="Yudis"
          size="3xl"
          class="mr-1"
          :ui="{
            root: 'bg-cyan-500',
            fallback: 'text-white',
          }"
        />
        <div class="absolute -top-2 -right-1">
          <UButton size="xs" class="rounded-full" color="error">X</UButton>
        </div>
      </div>
      <div class="relative">
        <UAvatar
          alt="Yudis"
          size="3xl"
          class="mr-1"
          :ui="{
            root: 'bg-cyan-500',
            fallback: 'text-white',
          }"
        />
        <div class="absolute -top-2 -right-1">
          <UButton size="xs" class="rounded-full" color="error">X</UButton>
        </div>
      </div>
      <div class="relative">
        <UAvatar
          alt="Yudis"
          size="3xl"
          class="mr-1"
          :ui="{
            root: 'bg-cyan-500',
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
          :default-value="new Date().getFullYear()"
        />
        <USelect
          placeholder="Filter by month"
          value-key="value"
          label-key="text"
          :items="monthData"
          :default-value="new Date().getMonth() + 1"
        />
      </div>
    </div>

    <div class="my-8">
      <div class="grid grid-cols-3 gap-2">
        <div
          class="w-full h-28 p-4 border border-gray-300 rounded-lg flex flex-col justify-between cursor-pointer"
          @click="
            () => {
              navigateTo(
                `/circles/${route.params.code}/attendance?date=2025-05-24`
              );
            }
          "
        >
          <div class="w-full h-full flex items-center justify-center">
            <p>24</p>
          </div>
        </div>
        <div
          class="w-full h-28 p-4 border border-gray-300 rounded-lg flex flex-col justify-between cursor-pointer"
          @click="
            () => {
              navigateTo(
                `/circles/${route.params.code}/attendance?date=2025-05-25`
              );
            }
          "
        >
          <div class="w-full h-full flex items-center justify-center">
            <p>25</p>
          </div>
        </div>
        <div
          class="w-full h-28 p-4 border border-gray-300 rounded-lg flex flex-col justify-between cursor-pointer"
          @click="
            () => {
              navigateTo(
                `/circles/${route.params.code}/attendance?date=2025-05-25`
              );
            }
          "
        >
          <div class="w-full h-full flex items-center justify-center">
            <p>30</p>
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
        @click="handleCopyLink"
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
