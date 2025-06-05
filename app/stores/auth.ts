import { defineStore } from "pinia";
import type { User } from "~/types";

export const useAuthStore = defineStore("authStore", {
  state: (): {
    token: string | null;
    user: User | null;
    isLoggedIn: boolean;
  } => ({
    token: null,
    user: null,
    isLoggedIn: false,
  }),
  getters: {
    getToken(): string | null {
      return this.token;
    },
  },
  actions: {
    login(token: string, user: User) {
      this.token = token;
      this.user = user;
      this.isLoggedIn = true;
      // Cookies.set("token", token);
      // Cookies.set("userId", user.id.toString());
    },
    logout() {
      this.token = null;
      this.user = null;
      this.isLoggedIn = false;
      // Cookies.remove("token");
      // Cookies.remove("userId");
    },
    setToken(token: string) {
      this.token = token;
      // Cookies.set("token", token);
    },
    setUser(user: any) {
      this.user = user;
      // Cookies.set("userId", user.id.toString());
    },
  },
});
