<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";
import type { TabsItem } from "@nuxt/ui";

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const filterDate = shallowRef({
  start: new CalendarDate(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    1
  ),
  end: new CalendarDate(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
  ),
});

const tabs = ref<TabsItem[]>([
  {
    label: "Past",
    value: "past",
    slot: "past" as const,
  },
  {
    label: "Incoming",
    value: "incoming",
    slot: "incoming" as const,
  },
]);
const tabsActive = ref("incoming");
</script>

<template>
  <AppContainer class="relative min-h-screen">
    <AppTitle>My Schedule</AppTitle>

    <div class="my-6">
      <UPopover class="mb-4">
        <UButton
          color="neutral"
          block
          variant="subtle"
          icon="i-lucide-calendar"
        >
          <template v-if="filterDate.start">
            <template v-if="filterDate.end">
              {{ df.format(filterDate.start.toDate(getLocalTimeZone())) }} -
              {{ df.format(filterDate.end.toDate(getLocalTimeZone())) }}
            </template>

            <template v-else>
              {{ df.format(filterDate.start.toDate(getLocalTimeZone())) }}
            </template>
          </template>
          <template v-else> Pick a date </template>
        </UButton>

        <template #content>
          <UCalendar
            v-model="filterDate"
            class="p-2"
            :number-of-months="2"
            range
          />
        </template>
      </UPopover>

      <UTabs
        color="primary"
        :unmount-on-hide="true"
        :items="tabs"
        class="w-full"
        v-model="tabsActive"
      >
        <template #past>
          <PastSchedule :filter-date="[filterDate.start, filterDate.end]" />
        </template>
        <template #incoming>
          <IncomingSchedule :filter-date="[filterDate.start, filterDate.end]" />
        </template>
      </UTabs>

      <div
        class="absolute bottom-0 left-0 right-0 flex justify-center items-center p-4 flex-col gap-y-2"
      >
        <UButton
          @click="
            () => {
              navigateTo('/schedules/create');
            }
          "
          block
          >Create Schedule</UButton
        >
      </div>
    </div>
  </AppContainer>
</template>
