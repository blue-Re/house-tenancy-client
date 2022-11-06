import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || {},
  }),
  getters: {
    getCurrentUserType() {
      return this.user.type;
    },
  },
  actions: {
    saveUser(payload) {
      this.user = payload;
    },
    resetUser() {
      this.user = {};
      localStorage.removeItem('user');
    },
  },

});

export default null;
