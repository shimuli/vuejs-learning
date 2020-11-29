<template>
  <section class="flex w-full">
    <div class="m-auto">
      <h1 class="text-center text-2xl">Chats</h1>
      <div class="border rounded-lg">
        <div class="h-64 p-2">
          <div
            v-for="chat in state.chats"
            :key="chat.message"
            class="w-full"
            :class="chat.userId==userId ? 'text-right' : ''"
          >{{chat.message}}</div>
        </div>
      </div>
      <div class="h-8 p-2">
        <input
          v-model="state.message"
          placeholder="start typing"
          class="p-1 border rounded shadow"
          type="text"
          @keydown.enter="addMessage"
        />
      </div>
    </div>
  </section>
</template>
<script>
import { computed, onMounted, reactive } from "vue";
import { chatRef } from "../utilities/firebase";
import { useStore } from "vuex";
export default {
  setup() {
    const state = reactive({
      chats: [],
      message: "",
    });

    let store = useStore();

    let userId = computed(() => store.state.authUser.uid);
    onMounted(async () => {
      chatRef.on("child_added", (snapshot) => {
        state.chats.push({ key: snapshot.key, ...snapshot.val() });
      });
    });

    function addMessage() {
      let newChat = chatRef.push();
      newChat.set({ userId: userId, message: state.message });
      state.message = "";
    }

    return { state, addMessage, userId };
  },
};
</script>

<style>
</style>