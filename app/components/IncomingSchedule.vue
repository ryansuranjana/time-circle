<script setup lang="ts">
import moment from "moment";
import type { Schedule } from "~/types";
import { CalendarDate } from "@internationalized/date";

const props = defineProps<{
  filterDate: [CalendarDate, CalendarDate];
}>();

const headers = useRequestHeaders(["cookie"]);
const { data, refresh } = await useAsyncData("incoming-schedules", () =>
  $fetch<{
    schedules: Schedule[];
  }>(`/api/schedules?filter=incoming&startDate=2025-06-01&endDate=2025-06-30`, {
    headers,
  })
);

watch(
  () => props.filterDate,
  async (newValue) => {
    const [start, end] = newValue;
    if (start && end) {
      await refresh();
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="flex flex-col gap-y-4 h-[70vh] overflow-y-auto"
    style="scrollbar-width: none"
  >
    <div
      class="p-4 border border-gray-300 w-full rounded-lg"
      v-for="schedule in data?.schedules"
      v-if="(data?.schedules?.length as number)> 0"
    >
      <p class="text-lg font-bold mb-2">
        {{ moment(schedule.date).format("DD/MM/YYYY") }}
      </p>
      <p>
        {{
          moment(schedule.startTime.split("T")[1], "HH:mm:ss").format("HH:mm")
        }}
        -
        {{ moment(schedule.endTime.split("T")[1], "HH:mm:ss").format("HH:mm") }}
      </p>
    </div>
    <div v-else>
      <p class="text-center mx-auto mt-14 text-muted text-sm">
        No schedules available
      </p>
    </div>
  </div>
</template>
