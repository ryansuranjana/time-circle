<script lang="ts"></script>

<template>
  <div class="w-full h-screen flex justify-center items-center font-inter px-4">
    <div class="md:w-[25%] w-full">
      <h1 class="font-bold text-2xl text-center mb-14">Time Circle</h1>

      <div>
        <form action="">
          <UFormField label="Nickname" name="nickname" class="mb-4">
            <UInput placeholder="Enter nickname" class="w-full" />
          </UFormField>
          <UFormField label="Email" name="email" class="mb-4">
            <UInput type="email" placeholder="Enter email" class="w-full" />
          </UFormField>
          <UFormField label="Password" name="password" class="mb-4">
            <UInput
              type="password"
              placeholder="Enter password"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Confirm Password" name="confirm" class="mb-4">
            <UInput
              type="password"
              placeholder="Enter password"
              class="w-full"
            />
          </UFormField>
          <UButton
            block
            @click="
              async () => {
                await navigateTo('/');
              }
            "
            >Sign Up</UButton
          >
        </form>
      </div>
    </div>
  </div>
</template>
