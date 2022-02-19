import { NewGameCode, Player, Pokemon } from "../NewGame/NewGame";

export class GameCode {
  constructor(readonly newGamecode: NewGameCode) {}

  public async getDatas(params: any): Promise<any> {
    const datas = await this.newGamecode.getPlayersInMemory();
    const player = datas.find((player: Player) => player.id === +params.idPlayer);
    const pokemon = player?.pokemon.find((pokemon: Pokemon) => pokemon.id === +params.idPokemon);
    return { id: player?.id, name: player?.name, pokemon: pokemon, maxLifePokeomon: pokemon?.life };
  }
}
