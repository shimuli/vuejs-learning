<template>
  <section class="flex w-full">
    <div class="m-auto">
      <h1 class="text-4xl text-center mt-5">User Crud</h1>
      <div class="mt-10">
        <table>
          <thead>
            <tr class="bg-gradient-to-r from-green-900 to-blue-600 text-white">
              <th class="px-4 py-2 border">ID</th>
              <th class="px-4 py-2 border">Avator</th>
              <th class="px-4 py-2 border">First Name</th>
              <th class="px-4 py-2 border">Last Name</th>
              <th class="px-4 py-2 border">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in state.users.data" :key="user.id">
                <td class="border px-4 py-2">{{user.id}}</td>
                <td class="border px-4 py-2">
                    <img :src="user.avatar" :alt="user.first_name"
                    width="50"
                    class="rounded-full">
                </td>
              <td class="border px-4 py-2">{{user.first_name}}</td>
              <td class="border px-4 py-2">{{user.last_name}}</td>
              <td class="border px-4 py-2">{{user.email}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, reactive } from "vue";
import axios from "axios";
export default {
  setup() {
    const state = reactive({
      users: [],
    });
    onMounted(async () => {
      const { data } = await axios.get("https://reqres.in/api/users/");
      state.users = data;
    });

    return { state };
  },
};
</script>

<style>
</style>