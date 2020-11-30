<template>
  <section class="flex w-full">
    <div class="m-auto">
      <h1 class="text-2xl text-center">User Crud</h1>

      <div class="mt-5">
        <button
          class="px-2 py-1 border rounded my-4 hover:bg-gray-300"
          @click="isModalOpen=true"
        >Add User</button>

        <button
          class="px-5 ml-100 py-1 border rounded my-4 hover:bg-gray-300"
          @click="isSearchOpen=true"
        >Search</button>

        <div class="pt-2 relative mx-auto content-center text-gray-600">
          <input
            class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
            v-model="state.userId"
          />
          <button @click="searchId(state.userId)" class="absolute right-0 top-0 mt-5 mr-4">Search</button>
        </div>
        <table>
          <thead>
            <tr class="bg-gradient-to-r from-green-900 to-blue-600 text-white">
              <th class="px-4 py-2 border">ID</th>
              <th class="px-4 py-2 border">Avator</th>
              <th class="px-4 py-2 border">First Name</th>
              <th class="px-4 py-2 border">Last Name</th>
              <th class="px-4 py-2 border">Email</th>
              <th class="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in state.users" :key="user._id">
              <td class="border px-4 py-2">{{user._id}}</td>
              <td class="border px-4 py-2">
                <img :src="user.avatar" :alt="user.first_name" width="50" class="rounded-full" />
              </td>
              <td class="border px-4 py-2">{{user.first_name}}</td>
              <td class="border px-4 py-2">{{user.second_name}}</td>
              <td class="border px-4 py-2">{{user.email}}</td>
              <td class="border px-4 py-2">
                <button
                  class="px-2 py-1 bg-red-800 rounded text-white"
                  @click="destroy(user._id)"
                >Delete</button>
              </td>
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
            class="px-3 py-2 border rounded shadow"
            :disabled="state.users.page==state.users.total_pages"
            :class="state.users.page == state.users.total_pages ? 'bg-gray-100' : 'hover:shadow'"
            @click="next"
          >Next</button>
        </div>
      </div>
    </div>
  </section>
  <teleport to="body">
    <modal v-if="isModalOpen" @close="isModalOpen=false">
      <template #title>Add New User</template>
      <template #body>
        <form @submit.prevent="submit">
          <div class="p-2">
            <label for>First Name</label>
            <input
              class="w-full p-2 rounded border"
              type="name"
              placeholder="Name"
              v-model="state.form.first_name"
            />
          </div>
          <div class="p-2">
            <label for>Second Name</label>
            <input
              class="w-full p-2 rounded border"
              type="name"
              placeholder="Name"
              v-model="state.form.second_name"
            />
          </div>
          <div class="p-2">
            <label for>Email</label>
            <input
              class="w-full p-2 rounded border"
              type="email"
              placeholder="Email"
              v-model="state.form.email"
            />
          </div>

          <div class="p-2">
            <label for>Image Url</label>
            <input
              class="w-full p-2 rounded border"
              type="text"
              placeholder="Avator Url"
              v-model="state.form.avatar"
            />
          </div>

          <div class="p-2">
            <input class="w-full p-2 rounded border hover:bg-gray-300" type="submit" value="Create" />
          </div>
        </form>
      </template>
    </modal>

    <modal v-if="isSearchOpen" @close="isSearchOpen=false">
      <template #title>Search User</template>
      <template #body>
        <div class="pt-2 relative mx-auto content-center text-gray-600">
          <input
            class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
            v-model="state.userId"
          />
          <button @click="searchId()" class="absolute right-0 top-0 mt-5 mr-4">Search</button>
        </div>
      </template>
    </modal>
  </teleport>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
// import axios from "axios";
// //axios.defaults.baseURL = process.env.VUE_APP_API_URL
import axios from "../plugins/axios";
import Modal from "../components/Modal.vue";

export default {
  components: { Modal },
  setup() {
    const isModalOpen = ref(false);
    const isSearchOpen = ref(false);
    const state = reactive({
      users: [],
      userId: "",
      form: {
        first_name: "",
        second_name: "",
        email: "",
        avatar: "",
      },
    });
    onMounted(async () => {
      const { data } = await axios.get(`/allusers/`);
      state.users = data;
    });

    async function next() {
      const { data } = await axios.get(`/allusers?page=2`);
      state.users = data;
    }

    async function prev() {
      const { data } = await axios.get(`/allusers?page=1`);
      state.users = data;
    }

    async function submit() {
      const { data } = await axios.post(`/allusers`, state.form);
      state.users.push(data);
      state.form.first_name = "";
      state.form.second_name = "";
      state.form.email = "";
      state.form.avatar = "";
      isModalOpen.value = false;
    }

    async function destroy(id) {
      await axios.delete(`/allusers/${id}`);
      state.users = state.users.filter((user) => user._id !== id);
    }

    async function searchId(id) {
      const searchdata  =  await axios.get(`/allusers/${id}`);
      state.users = searchdata;
      console.log(searchdata);
    }

    return {
      state,
      next,
      prev,
      isModalOpen,
      submit,
      destroy,
      isSearchOpen,
      searchId,
    };
  },
};
</script>

<style>
</style>