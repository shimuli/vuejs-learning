<template>
  <div class="flex flex-wrap w-full relative">
    <div class="absolute w-full" v-for="(color, index) in sliders" :key="color">
      <transition name="fade">
        <div v-if="currentSlide == index" :class="color" style="height:350px"></div>
      </transition>
    </div>
    <div class="w-full" style="height:340px">
      <div class="absolute bottom-0 flex w-full justify-center">
        <div v-for="(slider, index) in sliders" 
        :key="slider"
        @click="makeACtive(index)"
        :class="currentSlide == index ? 'bg-gray-700' : 'bg-red-300'"
        class=" mx-2 w-4 h-4 rounded-full cursor-pointer shadow-md "></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 1,
      interval: "",
      sliders: ["bg-green-600", "bg-red-600", "bg-yellow-600"],
      isTitleShowing: true,
    };
  },
  methods:{
    makeACtive(index){
      this.currentSlide = index;
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.currentSlide = this.currentSlide == 2 ? 0 : this.currentSlide + 1;
    }, 2000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style> 