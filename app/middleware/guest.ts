export default defineNuxtRouteMiddleware(async (to, from) => {
  const isLoggedIn = await checkAuth();
  if (isLoggedIn) {
    return navigateTo("/circles");
  }
});
