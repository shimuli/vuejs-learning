<template>
  <AppHeader :isLoggedIn ="isLoggedIn" @open-login-modal="isLoginOpen = true" />
  <div class="w-full flex">
    <router-view></router-view>
  </div>
  <teleport to="body">
  <login-modal v-if="isLoginOpen" @close-login="isLoginOpen = false" />
  </teleport>
</template>

<script>
import AppHeader from "./components/AppHeader";
import LoginModal from "./components/LoginModal.vue";
import firebase from "./utilities/firebase";
export default {
  components: {
    AppHeader,
    LoginModal,
  },
  data() {
    return {
      isLoginOpen: false,
      isLoggedIn: false,
      authUser:{},
    };
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('setIsLoggedIn')
        this.$store.commit('setAuthUser', user)
        this.isLoggedIn = true;
        this.authUser = user;
      } else {
         this.isLoggedIn = false;
         this.authUser = {};
      }
    });
  },
};
</script>

<style>
</style>