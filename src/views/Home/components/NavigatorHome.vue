<template>
  <div class="header-nav">
    <div id="nav">
      <router-link to="new-game" class="bg-gray-300 border-r border-black w-1/3">Novo Jogo</router-link>
      <router-link to="" class="bg-gray-300 border-r border-black w-1/3">Pagina Inicial</router-link>
      <router-link to="ranking" class="bg-gray-300 w-1/3">Ranking</router-link>
    </div>
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
@Options({})
export default class NavigatorHome extends Vue {}
</script>

<style lang="postcss">
.header-nav {
  @apply w-full flex justify-center;
}
#nav {
  @apply flex justify-around w-3/5 h-10 items-center text-center;
}
</style>
