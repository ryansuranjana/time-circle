export default async function checkAuth() {
  const { loggedIn, clear: clearUserSession } = useUserSession();

  console.log("is login", loggedIn.value);

  if (loggedIn.value) {
    return true;
  } else {
    await clearUserSession();
    return false;
  }
}
