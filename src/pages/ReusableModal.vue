<template>
  <section class="flex flex-wrap w-full">
    <div class="m-auto">
      <h1 class="text-2xl my-5">Reusable Modal</h1>
      <modal v-if="isRedModalOpen" @close="isRedModalOpen= false">
        <template #title>Red Modal</template>
        <template #body>
          <p>This is the body slot</p>
        </template>
      </modal>

      <button class="border rounded px-2 mx-4 bg-red-500 text-white" @click="isRedModalOpen = true">Red Modal</button>

      <modal v-if="isBlueModalOpen" @close="isBlueModalOpen= false">
        <template #title>Blue Modal</template>
        <template #body>
          <p>This is the body slot for modal two</p>
        </template>
      </modal>
      <button class="border rounded px-2 mx-4 bg-blue-500 text-white" @click="isBlueModalOpen = true">Blue Modal</button>
    </div>
  </section>
</template>

<script>
import Modal from "../components/Modal.vue";
import { ref } from "vue";
export default {
  components: { Modal },
  setup() {
    const isRedModalOpen = ref(false);

    const isBlueModalOpen = ref(false);

    return { isRedModalOpen, isBlueModalOpen };
  },
};
</script>

<style>
</style>