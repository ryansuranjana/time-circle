<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";
import type { FormSubmitEvent } from "@nuxt/ui";
import * as yup from "yup";
import type { InferType } from "yup";

definePageMeta({
  middleware: ["auth"],
});

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const modelValue = shallowRef(
  new CalendarDate(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  )
);

const schema = yup.object({
  date: yup.string().required("Date is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
});

const fields = reactive<{
  date: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
}>({
  date: modelValue.value.toDate(getLocalTimeZone()).toISOString().split("T")[0],
  startTime: undefined,
  endTime: undefined,
});

watch(modelValue, (newValue) => {
  fields.date = newValue.toDate(getLocalTimeZone()).toISOString().split("T")[0];
});

const isLoading = ref(false);
const headers = useRequestHeaders(["cookie"]);
const onSubmit = async (event: FormSubmitEvent<InferType<typeof schema>>) => {
  isLoading.value = true;

  await $fetch("/api/schedules", {
    method: "POST",
    headers: headers,
    body: event.data,
    async onResponse({ response }) {
      isLoading.value = false;
      if (response.status === 200) {
        setTimeout(async () => {
          await navigateTo("/schedules");
        }, 500);
      }
    },
  });
};
</script>

<template>
  <AppContainer class="relative min-h-screen">
    <AppTitle>Create free schedule</AppTitle>

    <UForm @submit="onSubmit" :schema="schema" :state="fields">
      <div class="my-6">
        <UFormField label="Pick a date" class="mb-4" name="date">
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
          <UFormField label="Start time" name="startTime">
            <UInput type="time" class="w-full" v-model="fields.startTime" />
          </UFormField>
          <UFormField label="End time" name="endTime">
            <UInput type="time" class="w-full" v-model="fields.endTime" />
          </UFormField>
        </div>
      </div>

      <div
        class="absolute bottom-0 left-0 right-0 flex justify-center items-center p-4 flex-col gap-y-2"
      >
        <UButton size="lg" type="submit" :loading="isLoading" block
          >Save</UButton
        >
      </div>
    </UForm>
  </AppContainer>
</template>
