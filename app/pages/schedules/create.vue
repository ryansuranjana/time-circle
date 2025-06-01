<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const modelValue = shallowRef(
  new CalendarDate(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDay()
  )
);
</script>

<template>
  <AppContainer class="relative min-h-screen">
    <AppTitle>Create free schedule</AppTitle>

    <div class="my-6">
      <UFormField label="Pick a date" class="mb-4">
        <UPopover>
          <UButton
            color="neutral"
            variant="subtle"
            icon="i-lucide-calendar"
            class="w-full"
          >
            {{
              modelValue
                ? df.format(modelValue.toDate(getLocalTimeZone()))
                : "Select a date"
            }}
          </UButton>

          <template #content>
            <UCalendar v-model="modelValue" class="p-2" />
          </template>
        </UPopover>
      </UFormField>
      <div class="grid grid-cols-2 mb-4 gap-x-2">
        <UFormField label="Start time">
          <UInput type="time" class="w-full" />
        </UFormField>
        <UFormField label="End time">
          <UInput type="time" class="w-full" />
        </UFormField>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 flex justify-center items-center p-4 flex-col gap-y-2"
    >
      <UButton size="lg" block>Save</UButton>
    </div>
  </AppContainer>
</template>
