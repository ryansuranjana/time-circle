<script setup lang="ts">
const { loggedIn } = useUserSession();

if (!loggedIn.value) {
  navigateTo("/login");
} else {
  navigateTo("/circles");
}
</script>

<template></template>
