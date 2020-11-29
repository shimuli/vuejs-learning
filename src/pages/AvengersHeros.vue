<template>
  <div class="m-auto">
    <h1 class="text-2xl text-center">DC Heros {{ herosCount }}</h1>
    <ul>
      <li class="flex justify-between" v-for="(hero, index) in avengers.actors" :key="hero.id">
        <div>Name:{{ hero.name }} , Age:{{ hero.age }}</div>
        <button @click="remove(index)">x</button>
      </li>
    </ul>
    <form class="mt-10" @submit.prevent="addHero()">
      <input
        class="border rounded"
        type="text"
        placeholder="Hero name"
        v-model.trim="newHero"
        ref="newHeroRef"
      />
      <input class="border rounded" type="number" placeholder="Hero age" v-model.trim="newage" />
      <button
        class="border rounded bg-gradient-to-r from-red-700 to-pink-500 text-white"
        type="submit"
      >Add Hero</button>
    </form>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
export default {
  setup() {
    const newHeroRef = ref("");
    const avengers = ref({
      director: "Cedric Shimuli",
      country: "Kenya",
      actors: [
        {
          id: 1,
          name: "Iron Man",
          age: 45,
        },
        {
          id: 2,
          name: "Captain America",
          age: 35,
        },
        {
          id: 3,
          name: "Black Panther",
          age: 36,
        },
        {
          id: 4,
          name: "Black Widow",
          age: 36,
        },
      ],
    });
    const newHero = ref("");
    const newage = ref("");

    onMounted(() => {
      newHeroRef.value.focus();
    });

    const herosCount = computed(
    {
      get: () => avengers.value.actors.length + " Heros ",
    });

    function remove(index) {
      avengers.value.actors = avengers.value.actors.filter(
        (hero, i) => i != index
      );
    }

    function addHero() {
      if (newHero.value !== "" && newage.value !== "") {
        avengers.value.actors.push({ name: newHero.value, age: newage.value });
        newHero.value = "";
        newage.value = "";
      } else alert("Field is empty");
    }

    return {
      avengers,
      newHero,
      newage,
      remove,
      addHero,
      newHeroRef,
      herosCount,
    };
  },
  computed: {
    randC() {
      return Math.random();
    },
    fullname() {
      return `${this.fname} ${this.lname}`;
    },

    allnames: {
      get() {
        return `Full name is: ${this.fname} ${this.lname}`;
      },

      set(allnames) {
        const values = allnames.split(" ");
        this.fname = values[0];
        this.lname = values[1];
      },
    },
  },

  methods: {
    randM() {
      return Math.random();
    },
    setFullName() {
      this.allnames = "Awesome name";
    },
  },
};
</script>
<style>
</style>