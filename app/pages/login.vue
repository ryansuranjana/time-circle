<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { object, string, ref as refYup, type InferType } from "yup";

const { fetch: refreshSession } = useUserSession();

definePageMeta({
  middleware: ["guest"],
});

useHead({
  title: "Sign In",
});

const schema = object({
  email: string().email("Invalid email").required("Email is required"),
  password: string().required("Password is required"),
});

const isLoading = ref(false);
const fields = reactive({
  email: "",
  password: "",
});
const isUnauthenticated = ref(false);

const onSubmit = async (event: FormSubmitEvent<InferType<typeof schema>>) => {
  isLoading.value = true;
  await $fetch("/api/auth/login", {
    method: "POST",
    body: event.data,
    headers: {
      "Content-Type": "application/json",
    },
    async onResponse({ response }) {
      isLoading.value = false;
      if (response.status === 200) {
        await refreshSession();
        await navigateTo("/circles");
      }

      if (response.status === 401) {
        isUnauthenticated.value = true;
      }
    },
  });
};
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center font-inter px-4">
    <div class="md:w-[25%] w-full">
      <div class="mb-12 text-center">
        <h1 class="font-bold text-xl mb-2">Sign In to Time Circle</h1>
        <p class="text-sm font-light">
          Dont have an account?
          <span
            class="font-bold cursor-pointer"
            @click="() => navigateTo('/register')"
            >Sign Up</span
          >
        </p>
      </div>

      <div>
        <UAlert
          v-if="isUnauthenticated"
          title="Invalid credentials"
          color="error"
          icon="i-lucide:alert-triangle"
          class="mb-4"
          variant="soft"
          @click="isUnauthenticated = false"
        />
        <UForm @submit="onSubmit" :schema="schema" :state="fields">
          <UFormField label="Email" name="email" class="mb-4">
            <UInput
              v-model="fields.email"
              type="email"
              placeholder="Enter email"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Password" name="password" class="mb-4">
            <UInput
              v-model="fields.password"
              type="password"
              placeholder="Enter password"
              class="w-full"
            />
          </UFormField>
          <UButton type="submit" block :loading="isLoading">Sign In</UButton>
        </UForm>
      </div>
    </div>
  </div>
</template>
