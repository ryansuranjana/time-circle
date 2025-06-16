<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { object, string, ref as refYup, type InferType } from "yup";
const { fetch: refreshSession } = useUserSession();

definePageMeta({
  middleware: ["guest"],
});

useHead({
  title: "Sign Up",
});

const schema = object({
  nickname: string().required("Nickname is required"),
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirm: string()
    .oneOf([refYup("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const fields = reactive({
  nickname: undefined,
  email: undefined,
  password: undefined,
  confirm: undefined,
});

const isLoading = ref(false);

const onSubmit = async (event: FormSubmitEvent<InferType<typeof schema>>) => {
  isLoading.value = true;

  await $fetch("/api/auth/register", {
    method: "POST",
    body: event.data,
    async onResponse({ response }) {
      isLoading.value = false;
      if (response.status === 200) {
        await refreshSession();
        setTimeout(async () => {
          await navigateTo("/circles");
        }, 500);
      }
    },
  });
};
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center font-inter px-4">
    <div class="md:w-[25%] w-full">
      <div class="mb-12 text-center">
        <h1 class="font-bold text-xl mb-2">Sign Up to Time Circle</h1>
        <p class="text-sm font-light">
          Already have an account?
          <span
            class="font-bold cursor-pointer"
            @click="() => navigateTo('/login')"
            >Login</span
          >
        </p>
      </div>

      <div>
        <UForm :schema="schema" :state="fields" @submit="onSubmit">
          <UFormField label="Nickname" name="nickname" class="mb-4">
            <UInput
              placeholder="Enter nickname"
              class="w-full"
              v-model="fields.nickname"
            />
          </UFormField>
          <UFormField label="Email" name="email" class="mb-4">
            <UInput
              type="email"
              placeholder="Enter email"
              class="w-full"
              v-model="fields.email"
            />
          </UFormField>
          <UFormField label="Password" name="password" class="mb-4">
            <UInput
              type="password"
              placeholder="Enter password"
              class="w-full"
              v-model="fields.password"
            />
          </UFormField>
          <UFormField label="Confirm Password" name="confirm" class="mb-4">
            <UInput
              type="password"
              placeholder="Enter password"
              class="w-full"
              v-model="fields.confirm"
            />
          </UFormField>
          <UButton block type="submit" :loading="isLoading">Sign Up</UButton>
        </UForm>
      </div>
    </div>
  </div>
</template>
