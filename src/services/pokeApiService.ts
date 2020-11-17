import EvolutionChain from "./models/interfaces/EvolutionChain";
import PokemonDetail from "./models/interfaces/PokemonDetail";
import PokemonsApiResourceList from "./models/interfaces/PokemonsApiResourceList";

/**
 * Api Service to get pokemons data from pokeapi
 *
 * @class pokeApiService
 */
class pokeApiService {
  /**
   * Fetch Pokemons from api
   *
   * @param {number} limit - the result limit for each call
   * @return {Promise<PokemonsApiResourceList>}
   * @memberof pokeApiService
   */
  async fetchPokemons(limit: number): Promise<PokemonsApiResourceList> {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=150&limit=${limit}`
    );
    if (response.ok) {
      return response.json();
    } else {
      throw response;
    }
  }

  /**
   * Get Pokemon Detail from api
   *
   * @param {string} pokemonName - the pokemon name to get info for
   * @return {Promise<PokemonDetail>}
   * @memberof pokeApiService
   */
  async fetchPokemonDetail(pokemonName: string): Promise<PokemonDetail> {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    if (response.ok) {
      return response.json();
    } else {
      throw response;
    }
  }

  /**
   * Get the evolution chain for the pokemon id
   *
   * @param {number} pokemonId
   * @return {Promise<EvolutionChain>}
   * @memberof pokeApiService
   */
  async fetchPokemonEvolution(pokemonId: number): Promise<EvolutionChain> {
    const response = await fetch(
      `https://pokeapi.co/api/v2/evolution-chain/${pokemonId}`
    );
    if (response.ok) {
      return response.json();
    } else {
      throw response;
    }
  }
}

export default new pokeApiService();
