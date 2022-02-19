<template>
  <div class="game">
    <h1 v-if="isFetching">carregando...</h1>
    <div v-else class="list-options">
      <h2 class="inline-flex justify-center items-center h-14">escolha um pokemon de um dos personagens disponiveis para jogar com ele</h2>
      <ul class="players">
        <li v-for="player of players" :key="player.id" class="player">
          <p>
            jogador: <b>{{ player.name }}</b>
          </p>
          <hr class="w-full border-2 bg-gray-600 my-2" />
          <ul>
            possui esses pokemons:
            <li v-for="pokemon of player.pokemon" :key="pokemon.id" class="inline-flex">
              <button @click="selectPokemon(pokemon, player)" class="bg-green-200 border border-green-300 rounded-xl shadow-xl m-2 ml-0 p-2">
                <b>{{ pokemon.name }}</b>
              </button>
            </li>
          </ul>
        </li>
      </ul>
      <div class="flex justify-center items-center h-20">
        <button
          :class="`flex justify-center items-center uppercase h-2/4 p-4 rounded-lg shadow-xl ${
            this.selected.playerId ? 'bg-green-500' : 'bg-gray-400 cursor-not-allowed '
          }`"
          :disabled="!this.selected.playerId"
          @click="initGame"
        >
          Iniciar Jogo
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { NewGameCode, Pokemon, Player } from "./NewGame";

@Options({
  data() {
    return {
      newGame: new NewGameCode(),
      players: [],
      isFetching: true,
      selected: {},
    };
  },
  async created() {
    const { players, isFetching } = await this.newGame.get();
    this.players = players;
    this.isFetching = isFetching;
  },
  methods: {
    selectPokemon(pokemon: Pokemon, player: Player) {
      this.selected = {
        player: player.name,
        playerId: player.id,
        pokemon: pokemon.name,
        pokemonId: pokemon.id,
      };
    },
    initGame() {
      this.$router.push(`/game/${this.selected.playerId}/${this.selected.pokemonId}`);
    },
  },
})
export default class NewGame extends Vue {}
</script>

<style lang="postcss" scoped>
.game {
  @apply h-full flex justify-center items-center border border-red-500;
}

.list-options {
  @apply w-3/5 h-3/5 flex flex-col border border-red-500;
}

.players {
  @apply w-full h-full flex items-center justify-center flex-wrap border border-blue-500 gap-4;
}

.player {
  @apply p-4 h-auto w-72 shadow-xl rounded-2xl bg-gray-200 border border-gray-300;
}
</style>
