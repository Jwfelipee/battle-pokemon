<template>
  <div class="h-full flex justify-center items-center">
    <div class="flex flex-col items-center w-4/5 h-4/5 bg-indigo-100 rounded-xl shadow-lg p-4">
      <div class="w-full flex justify-center items-center h-1/5">
        <div class="w-4/5 h-3/5 flex flex-col">
          <h1 class="flex justify-end w-full text-xl text-gray-600 font-medium gap-4">
            <span>Nome do Adversário:</span> <b> {{ adversary?.name }}</b>
          </h1>
          <div class="max-w-min flex flex-col bg-yellow-100 shadow-xl gap-4 p-3 rounded-xl">
            <h2 class="text-gray-600 inline-flex flex-row gap-2">
              <span>Pokemon:</span> <b>{{ adversary?.pokemon?.name }}</b>
            </h2>
            <div class="flex gap-3 items-center">
              <input
                type="range"
                min="0"
                :max="adversary?.maxLifePokeomon"
                :value="adversary?.pokemon?.life"
                :class="`input cursor-default ${
                  adversary?.pokemon?.life < adversary?.maxLifePokeomon * 0.4 ? 'input-lowlife bg-red-200' : 'input-normallife bg-green-200'
                }`"
                disabled
              />
              <span class="mb-1">
                {{ adversary?.pokemon?.life }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="h-3/5 w-full flex justify-center items-center">
        <div class="flex justify-center items-center bg-purple-100 h-3/5 w-3/5 rounded-xl shadow-xl">
          {{ turn === "player" ? "Sua Vez" : "Vez do Adversário" }}
        </div>
      </div>

      <div class="h-1/5 w-full flex flex-col justify-center items-center mb-12">
        <div class="h-3/5 max-h-full w-4/5 flex flex-col justify-center items-center">
          <div class="flex w-full justify-end">
            <div class="max-w-min items-end flex flex-col bg-yellow-100 shadow-xl gap-4 p-3 rounded-xl">
              {{ player?.pokemon?.name }}
              <div class="flex gap-3 items-center">
                <input
                  type="range"
                  min="0"
                  :max="player?.maxLifePokeomon"
                  :value="player?.pokemon?.life"
                  :class="`input cursor-default ${
                    player?.pokemon?.life < player?.maxLifePokeomon * 0.4 ? 'input-lowlife bg-red-200' : 'input-normallife bg-green-200'
                  }`"
                  disabled
                />
                <span class="mb-1">
                  {{ player?.pokemon?.life }}
                </span>
              </div>
            </div>
          </div>

          <div class="w-3/5 flex justify-center">
            <ul v-if="turn === 'player'" class="flex flex-wrap justify-center gap-4">
              <li v-for="command of player?.pokemon?.commands" :key="command.name">
                <button @click="executeCommandPokemon(command)" class="bg-white rounded-xl shadow-xl h-16 px-2">
                  {{ command?.name }}
                </button>
              </li>
            </ul>

            <div class="h-3/5" v-else>...</div>
          </div>

          <div class="flex justify-start w-full gap-3 text-gray-600 text-xl">
            <span>Jogador:</span> <b>{{ player?.name }}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { NewGameCode, ICommand } from "../NewGame/NewGame";
import { GameCode } from "./Game";

@Options({
  data() {
    return {
      player: undefined,
      adversary: undefined,
      turn: Math.floor(Math.random() * 2) === 0 ? "player" : "adversary",
    };
  },
  async created() {
    const gameCode = new GameCode(new NewGameCode());
    this.player = await gameCode.getDatas(this.$route.params);
    const pokemons = await new NewGameCode().getChampions();
    const randomIndex = Math.floor(Math.random() * pokemons.length);
    this.adversary = {
      name: "Gary",
      pokemon: pokemons[randomIndex],
      maxLifePokeomon: pokemons[randomIndex]?.life,
    };
    if (this.turn === "adversary") {
      this.turnOfAdversary();
    }
  },
  methods: {
    executeCommandPokemon(command: ICommand) {
      const attackValue = this.randomAttack(command);
      this.adversary.pokemon.life = this?.adversary?.pokemon?.life - attackValue;
      this.turn = "adversary";
      this.whoDefeat();
      this.turnOfAdversary();
    },
    turnOfAdversary() {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * this?.adversary?.pokemon?.commands?.length);
        const command = this.adversary.pokemon.commands;
        this.player.pokemon.life = this.player.pokemon.life - this.randomAttack(command[randomIndex]);
        this.whoDefeat();
        this.turn = "player";
      }, 1500);
    },

    whoDefeat() {
      const whatPlayerLose = this.verefy();
      if (!whatPlayerLose) return true;
      setTimeout(() => {
        this.finallyGame(whatPlayerLose);
      }, 1000);
    },
    verefy() {
      if (this.player.pokemon.life <= 0) return "player-defeat";
      else if (this.adversary.pokemon.life <= 0) return "adversary-defeat";
      return undefined;
    },

    finallyGame(whatPlayerLose: "player-defeat" | "adversary-defeat" | undefined) {
      const res = confirm(whatPlayerLose === "player-defeat" ? "Voce perdeu, deseja jogar novamente?" : "Voce Ganhou, deseja jogar novamente?");
      if (!res) return this.$router.push("/");
      this.player.pokemon.life = this.player.maxLifePokeomon;
      this.adversary.pokemon.life = this.adversary.maxLifePokeomon;
      return (this.turn = Math.floor(Math.random() * 2) === 0 ? "player" : "adversary");
    },

    randomAttack(command: ICommand) {
      const max = command?.action[1];
      const min = command?.action[0];
      return Math.floor(Math.random() * (max + 1 - min) + min);
    },
  },
})
export default class Game extends Vue {}
</script>

<style lang="postcss" scoped>
.input {
  -webkit-appearance: none;
  appearance: none;
  height: 15px;
  border-radius: 5px;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.input::-webkit-slider-thumb {
  border-radius: 5px;
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 100%;
}

.input-normallife::-webkit-slider-thumb {
  background: #04aa6d;
}

.input-lowlife::-webkit-slider-thumb {
  background: #a40404;
}
</style>
