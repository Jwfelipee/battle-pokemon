export type Player = {
  name: string;
  id: number;
  idChampion: number[];
  pokemon: Pokemon[];
};

export type Pokemon = {
  name: string;
  id: number;
  type: string;
};

export class NewGameCode {
  isFetching = true;

  async get(): Promise<{ players: Player[]; pokemons: Pokemon[]; isFetching: boolean | undefined }> {
    return await this.getDatas();
  }

  async getDatas(): Promise<{ players: Player[]; pokemons: Pokemon[]; isFetching: boolean | undefined }> {
    const [pokemons, players] = await Promise.all([this.getChampions(), this.getPlayers()]).finally(() => (this.isFetching = false));

    const newPlayers = this.relationPlayerWithPokemons(players, pokemons);

    return {
      players: newPlayers,
      pokemons,
      isFetching: this.isFetching,
    };
  }

  async getPlayers(): Promise<Player[]> {
    const res = await fetch("http://localhost:3000/players").then((data) => data.json());
    return res;
  }

  async getChampions(): Promise<Pokemon[]> {
    const res = await fetch("http://localhost:3000/champions").then((data) => data.json());
    return res;
  }

  private relationPlayerWithPokemons(players: Player[], pokemons: Pokemon[]) {
    return players.map((player) => {
      const res = pokemons.filter((pokemon) => player.idChampion.includes(pokemon.id));
      return {
        ...player,
        pokemon: res,
      };
    });
  }
}
