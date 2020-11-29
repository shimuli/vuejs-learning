<template>
  <section @click="close" class="z-20 h-screen w-screen bg-gray-500 fixed top-0 opacity-50"></section>
  <div class="absolute inset-0">
    <div class="flex h-full">
      <div class="z-30 m-auto bg-white p-2 rounded shadow w-1/3">
        <div class="p-2 border">
          <h1 class="text-xl text-center">Login</h1>
          <google-login @close-login-from-google="close"/>
          
          <p class="my-3 text-center">Or</p>
          <form class="p-2 my-2" @submit.prevent="submit()">
            <div class="my-4">
              <label>Email or UserName</label>
              <input
                v-model="email"
                type="text"
                class="rounded shadow p-2 w-full"
                placeholder="Enter user name or Email"
                ref="newHeroRef"
              />
            </div>
            <div class="my-4">
              <label>Password</label>
              <input
                v-model="password"
                type="password"
                class="rounded shadow p-2 w-full"
                placeholder="Enter you password"
              />
            </div>
            <div class="my-4">
              <button
                type="submit"
                class="w-full rounded shadow-md bg-gradient-to-r from-red-800 to-pink-800 text-white"
              >
                <span v-if="!isLoading">Login</span>
                <span v-else>Please wait</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../utilities/firebase";
import GoogleLogin from './Login/GoogleLogin.vue';
//import GoogleLogin from "../components/Login/GoogleLogin"
export default {
  components: { GoogleLogin },
  data() {
    return {
      email: "cedricgyan@gmail.com",
      password: "password",
      isLoading: false,
    };
  },
  methods: {
    submit() {
      //axios.post('url', this.form)
      this.isLoading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          console.log(res);
          this.isLoading = false;
          this.email = "";
          this.password = "";
          this.close();
        })
        .catch((e) => {
          console.log(e);
          this.isLoading = false;
        });
    },
    close() {
      this.$emit("close-login");
    },
  },
  mounted() {
    this.$refs.newHeroRef.focus();
  },
};
</script>

<style>
</style>