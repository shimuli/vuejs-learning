<template>
  <section class="flex w-full">
    <div class="m-auto">
      <h1 class="text-2xl text-center">User Crud</h1>
      <div class="mt-5">
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
                <img :src="user.avatar" :alt="user.first_name" width="50" class="rounded-full" />
              </td>
              <td class="border px-4 py-2">{{user.first_name}}</td>
              <td class="border px-4 py-2">{{user.last_name}}</td>
              <td class="border px-4 py-2">{{user.email}}</td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-between">
          <button
            class="px-3 py-2 border rounded shadow"
            @click="prev"
            :disabled="state.users.page==1"
            :class="state.users.page == 1 ? 'bg-gray-100' : 'hover:shadow'"
          >Prev</button>
          <button
            class="px-3 py-2 border rounded shadow hover:shadow"
            :disabled="state.users.page==state.users.total_pages"
            :class="state.users.page == state.users.total_pages ? 'bg-gray-100' : 'hover:shadow'"
            @click="next"
          >Next</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, reactive } from "vue";
// import axios from "axios";
// //axios.defaults.baseURL = process.env.VUE_APP_API_URL
import axios from "../plugins/axios";
export default {
  setup() {
    const state = reactive({
      users: [],
    });
    onMounted(async () => {
      const { data } = await axios.get(`/users/`);
      state.users = data;
    });

    async function next() {
      const { data } = await axios.get(`/users?page=2`);
      state.users = data;
    }

    async function prev() {
      const { data } = await axios.get(`/users?page=1`);
      state.users = data;
    }

    return { state, next, prev };
  },
};
</script>

<style>
</style>