<template>
  <div class="m-auto">
    <h1 class="text-center">Welcome to Vue Learning</h1>
    <table class="table-fixed mt-10">
      <thead>
        <tr>
          <th class="w-1/2 ...">Name</th>
          <th class="w-1/4 ...">Date of Birth</th>
          <th class="w-1/4 ...">Location</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="firstperson in jsondata " :key="firstperson.id">
          <td>{{firstperson.name}}</td>
          <td>{{firstperson.DOB}}</td>
          <td>{{firstperson.Location}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const jsondata = ref([
      { id: 1, name: "Cedric", DOB: 1996, Location: "Kisii" },
      { id: 2, name: "Nelson", DOB: 1996, Location: "Kahawa Wendani" },
      { id: 3, name: "Peter", DOB: 1996, Location: "Kisii" },
      { id: 4, name: "Kenneth", DOB: 1996, Location: "Thika" },
      { id: 5, name: "Asiko", DOB: 1996, Location: "Cape Town" },
      { id: 6, name: "Faith", DOB: 1996, Location: "Ngara" },
    ]);
    return { jsondata };
  },
  data(){
    return{
      store:this.$store.state,
    }
  }
   

};
</script>

<style>
</style>