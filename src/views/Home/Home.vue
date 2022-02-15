<template>
  <div class="home">
    <div class="homepage">
      <h1 class="header">Bem Vindo ao Jogo Estilo GBA</h1>
      <div class="body">o que deseja fazer?</div>
      <NavigatorHome class="nav" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NavigatorHome from "./components/NavigatorHome.vue";

@Options({
  components: { NavigatorHome },
})
export default class Home extends Vue {}
</script>

<style lang="postcss" scoped>
.home {
  @apply h-full w-full flex justify-center items-center;
}

.homepage {
  @apply w-4/5 h-4/5 text-center bg-gray-200 shadow-2xl rounded-xl;
}

.header {
  @apply text-gray-700 h-1/6 flex justify-center items-center;
}

.body {
  @apply h-3/6 flex justify-center items-center;
}

.nav {
  @apply h-2/6 flex justify-center items-center;
}

a {
  @apply h-16;
}
</style>
