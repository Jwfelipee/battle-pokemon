import { Router } from "vue-router";
import { ICommand, NewGameCode, Player, Pokemon } from "../NewGame/NewGame";

export class GameCode {
  pokemons: Array<Pokemon> = [];
  constructor(readonly newGamecode: NewGameCode, readonly router: Router) {}

  public async getDatas(params: any): Promise<any> {
    const datas = await this.newGamecode.getPlayersInMemory();
    const player = datas.find((player: Player) => player.id === +params.idPlayer);
    const pokemon = player?.pokemon.find((pokemon: Pokemon) => pokemon.id === +params.idPokemon);
    return { id: player?.id, name: player?.name, pokemon, maxLifePokeomon: pokemon?.life };
  }

  public async createOponentIA(): Promise<{ name: string; pokemon: Pokemon; maxLifePokeomon: number }> {
    this.pokemons = await this.newGamecode.getChampions();
    const radomIndex = Math.floor(Math.random() * this.pokemons.length);
    return {
      name: "Gary",
      pokemon: this.pokemons[radomIndex],
      maxLifePokeomon: this.pokemons[radomIndex].life,
    };
  }

  attackAction({ attackCommand, adversary }: { attackCommand: ICommand; adversary: any }): any {
    const attackValue = this.randomAttack(attackCommand);
    adversary.pokemon.life = adversary.pokemon.life - attackValue;
  }

  randomAttack(command: ICommand) {
    const max = command?.action[1];
    const min = command?.action[0];
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }

  whoDefeat(player: Player, adversary: any, turn: any) {
    const whatPlayerLose = this.verefy(player, adversary);
    if (!whatPlayerLose) return true;
    setTimeout(() => {
      this.finallyGame(whatPlayerLose, player, adversary, turn);
    }, 1000);
  }

  verefy(player: any, adversary: any) {
    if (player.pokemon.life <= 0) return "player-defeat";
    else if (adversary.pokemon.life <= 0) return "adversary-defeat";
    return undefined;
  }

  finallyGame(whatPlayerLose: "player-defeat" | "adversary-defeat" | undefined, player: any, adversary: any, turn: string) {
    const res = confirm(whatPlayerLose === "player-defeat" ? "Voce perdeu, deseja jogar novamente?" : "Voce Ganhou, deseja jogar novamente?");
    if (!res) return this.router.push("/");
    player.pokemon.life = player.maxLifePokeomon;
    adversary.pokemon.life = adversary.maxLifePokeomon;
    return (turn = Math.floor(Math.random() * 2) === 0 ? "player" : "adversary");
  }
}
