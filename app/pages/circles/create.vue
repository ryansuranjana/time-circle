<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import * as yup from "yup";
import type { InferType } from "yup";

definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: "Create Circle",
});

const schema = yup.object({
  name: yup.string().required("Circle name is required"),
});

const fields = reactive({
  name: undefined,
});

const isLoading = ref(false);
const onSubmit = async (event: FormSubmitEvent<InferType<typeof schema>>) => {
  isLoading.value = true;

  await $fetch("/api/circles", {
    method: "POST",
    body: event.data,
    async onResponse({ response }) {
      isLoading.value = false;
      if (response.status === 200) {
        setTimeout(async () => {
          await navigateTo("/circles");
        }, 500);
      }
    },
  });
};
</script>

<template>
  <AppContainer class="relative min-h-screen">
    <AppTitle>Create Circle</AppTitle>

    <UForm @submit="onSubmit" :schema="schema" :state="fields">
      <div class="my-6">
        <UFormField label="Circle Name" name="name">
          <UInput
            placeholder="Enter circle name"
            class="w-full"
            size="lg"
            v-model="fields.name"
          />
        </UFormField>
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
