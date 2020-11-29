<template>
  <section class="mt-5 text-center">
    <button class="border rounded px-2" @click="LoginWithGoogle">Login with Google</button>
  </section>
</template>

<script>
import firebase from "../../utilities/firebase";
export default {
  setup(props, { emit }) {
    function LoginWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          emit("close-login-from-google");
        });
    }
    return { LoginWithGoogle };
  },
};
</script>

<style>
</style>