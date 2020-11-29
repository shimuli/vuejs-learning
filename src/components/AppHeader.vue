<template>
  <nav class="w-full bg-gradient-to-r from-green-900 to-blue-600 text-white px-4 py-4">
    <!--<router-link class="mx-2" to="/markdown">Markdown</router-link>-->
    <router-link v-for="item in list" :key="item.to" class="mx-3" :to="item.to">{{ item.title }}</router-link>
    <button v-if="isLoggedIn" class="mx-2" @click="logout">Logout</button>
    <button v-else class="mx-2" @click="$emit('open-login-modal')">Login</button>
  </nav>
</template>

<script>
import fb from "../utilities/firebase";
export default {
  props: { isLoggedIn: { type: Boolean, required: true } },
  data() {
    return {
      list: [
        { title: "Avengers Heros", to: "/avengers-heros" },
        { title: "Calender", to: "/calendar" },
        { title: "Markdown", to: "/markdown" },
        { title: "Slider", to: "/slider" },
        { title: "Calculator", to: "/calculator" },
        { title: "Reusable Modal", to: "/reusable-modal" },
        { title: "Chat", to: "/chats" },
        { title: "User Crud", to: "/user-crud" },
      ],
    };
  },

  methods: {
    logout() {
      fb.auth().signOut();
      // .then((res) => {})
      // .catch((e) => {});
    },
  },
};
</script>

<style>
</style>