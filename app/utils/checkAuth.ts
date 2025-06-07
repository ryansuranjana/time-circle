export default async function checkAuth() {
  const { loggedIn, clear: clearUserSession } = useUserSession();

  if (loggedIn.value) {
    return true;
  } else {
    await clearUserSession();
    return false;
  }
}
