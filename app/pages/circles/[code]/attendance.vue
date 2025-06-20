<script setup lang="ts">
import moment from "moment";

definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();

console.log("params :", route.params.code);
console.log("date :", route.query.date);

const headers = useRequestHeaders(["cookie"]);
const { data } = await useAsyncData(() =>
  $fetch<{
    data: {
      start: string;
      end: string;
      users: { id: number; nickname: string }[];
    }[];
  }>(`/api/circles/${route.params.code}/attendance/${route.query.date}`, {
    headers,
  })
);

const addToGoogleCalendar = () => {
  const startDate = moment(route.query.date as string)
    .startOf("day")
    .toDate();
  const endDate = moment(route.query.date as string)
    .endOf("day")
    .toDate();
  const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?dates=${moment(
    startDate
  ).format("YYYYMMDDTHHmmss")}/${moment(endDate).format(
    "YYYYMMDDTHHmmss"
  )}&text=Attendance&details=Attendance%20for%20the%20circle%20on%20${moment(
    route.query.date as string
  ).format("DD/MM/YYYY")}`;
  window.open(calendarUrl, "_blank");
};
</script>

<template>
  <AppContainer class="relative min-h-screen">
    <AppTitle>The Last Hope</AppTitle>
    <p class="text-2xl my-6">
      {{ moment(route.query.date as string).format("DD/MM/YYYY") }}
    </p>

    <div
      class="flex flex-col h-[75vh] p-1 overflow-y-auto"
      style="scrollbar-width: none"
    >
      <div
        class="flex flex-row gap-x-2"
        v-for="(time, index) in data?.data"
        :key="index"
      >
        <div class="flex flex-col gap-y-2">
          <p>
            {{ moment(time.start.split("T")[1], "HH:mm:ss").format("HH:mm") }}
          </p>
          <div
            v-for="i in moment(time.end.split('T')[1], 'HH:mm:ss').diff(
              moment(time.start.split('T')[1], 'HH:mm:ss'),
              'hours'
            )"
            class="size-8"
          ></div>
          <p
            v-if="
              (index > 0 && time.start !== data?.data[index - 1]?.end) ||
              index === (data?.data?.length || 0) - 1
            "
          >
            {{ moment(time.end.split("T")[1], "HH:mm:ss").format("HH:mm") }}
          </p>
        </div>
        <div class="flex flex-col justify-between flex-shrink-0 flex-grow">
          <div class="w-full h-[2px] bg-green-500 mt-3"></div>
          <div class="pl-2 mt-2">
            <UAvatar
              v-for="(user, userIndex) in time.users"
              :key="userIndex"
              :alt="user.nickname"
              size="xl"
              class="mr-1"
              :ui="{
                root: getAvatarColor(user.id),
                fallback: 'text-white',
              }"
            />
          </div>
          <div
            class="w-full h-[2px] bg-green-500 mb-3"
            v-if="
              (index > 0 && time.start !== data?.data[index - 1]?.end) ||
              index === (data?.data?.length || 0) - 1
            "
          ></div>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 flex justify-center items-center p-4 flex-col gap-y-2"
    >
      <UButton @click="addToGoogleCalendar" block
        >Add to Google Calendar</UButton
      >
    </div>
  </AppContainer>
</template>
