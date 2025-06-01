<script setup lang="ts">
import moment from "moment";

const route = useRoute();

console.log("params :", route.params.code);
console.log("date :", route.query.date);
</script>

<template>
  <AppContainer class="relative min-h-screen">
    <AppTitle>The Last Hope</AppTitle>
    <p class="text-2xl my-6">
      {{ moment(route.query.date as string).format("DD/MM/YYYY") }}
    </p>

    <div class="flex flex-col gap-y-8">
      <div class="flex flex-row gap-x-2">
        <div class="flex flex-col gap-y-2">
          <p>16.00</p>
          <p>17.00</p>
          <p>18.00</p>
          <p>19.00</p>
          <p>20.00</p>
          <p>21.00</p>
        </div>
        <div class="flex flex-col justify-between flex-shrink-0 flex-grow">
          <div class="w-full h-[2px] bg-green-500 mt-3"></div>
          <div class="pl-2">
            <UAvatar
              alt="Eka Purwadi"
              size="md"
              class="mr-1"
              :ui="{
                root: 'bg-yellow-500',
                fallback: 'text-white',
              }"
            />
            <UAvatar
              alt="Raja"
              size="md"
              class="mr-1"
              :ui="{
                root: 'bg-green-500',
                fallback: 'text-white',
              }"
            />
            <UAvatar
              alt="Yudis"
              size="md"
              class="mr-1"
              :ui="{
                root: 'bg-cyan-500',
                fallback: 'text-white',
              }"
            />
          </div>
          <div class="w-full h-[2px] bg-green-500 mb-3"></div>
        </div>
      </div>
      <div class="flex flex-row gap-x-2">
        <div class="flex flex-col gap-y-2">
          <p>22.00</p>
          <p>23.00</p>
          <p>00.00</p>
        </div>
        <div class="flex flex-col justify-between flex-shrink-0 flex-grow">
          <div class="w-full h-[2px] bg-green-500 mt-3"></div>
          <div class="pl-2">
            <UAvatar
              alt="Eka Purwadi"
              size="md"
              class="mr-1"
              :ui="{
                root: 'bg-yellow-500',
                fallback: 'text-white',
              }"
            />
            <UAvatar
              alt="Raja"
              size="md"
              class="mr-1"
              :ui="{
                root: 'bg-green-500',
                fallback: 'text-white',
              }"
            />
            <UAvatar
              alt="Yudis"
              size="md"
              class="mr-1"
              :ui="{
                root: 'bg-cyan-500',
                fallback: 'text-white',
              }"
            />
          </div>
          <div class="w-full h-[2px] bg-green-500 mb-3"></div>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 flex justify-center items-center p-4 flex-col gap-y-2"
    >
      <UButton block>Add to Google Calendar</UButton>
    </div>
  </AppContainer>
</template>
