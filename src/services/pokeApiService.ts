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
   * Api Result object, to map messages and result
   *
   * @private
   * @type {PokedexApiResult<any>}
   * @memberof pokeApiService
   */
  private apiResult: PokedexApiResult<any> = {
    result: {},
    message: "",
  };

  /**
   * Standard Error Message
   *
   * @private
   * @type {string}
   * @memberof pokeApiService
   */
  private errorMessage: string = "Error whilte loading ";
  /**
   * Fetch Pokemons from api
   *
   * @param {number} limit - the result limit for each call
   * @param {number} offset - where to start in the list
   * @return {Promise<PokemonsApiResourceList>}
   * @memberof pokeApiService
   */

  async fetchPokemons(
    limit: number,
    offset: number
  ): Promise<PokedexApiResult<PokemonsApiResourceList>> {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    if (response.ok) {
      this.apiResult.result = await response.json();
      return this.apiResult;
    } else {
      this.apiResult.result = response;
      this.apiResult.message = this.errorMessage + "Pokemon List";
      return this.apiResult;
    }
  }

  /**
   * Get Pokemon Detail from api
   *
   * @param {string} url - the pokemon name to get info for
   * @return {Promise<PokemonDetail>}
   * @memberof pokeApiService
   */
  async fetchPokemonDetail(
    url: string
  ): Promise<PokedexApiResult<PokemonDetail>> {
    const response = await fetch(url);
    if (response.ok) {
      this.apiResult.result = await response.json();
      return this.apiResult;
    } else {
      this.apiResult.result = response;
      this.apiResult.message = this.errorMessage + "Pokemon Detail";
      return this.apiResult;
    }
  }

  /**
   * Get Pokemon Detail from api
   *
   * @param {string} url - the pokemon name to get info for
   * @return {Promise<PokemonDetail>}
   * @memberof pokeApiService
   */
  async fetchPokemonDetailByName(
    name: string
  ): Promise<PokedexApiResult<PokemonDetail>> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (response.ok) {
      this.apiResult.result = await response.json();
      return this.apiResult;
    } else {
      this.apiResult.result = response;
      this.apiResult.message = this.errorMessage + "Pokemon Detail";
      return this.apiResult;
    }
  }

  /**
   * Get the evolution chain for the pokemon id
   *
   * @param {number} pokemonId
   * @return {Promise<EvolutionChain>}
   * @memberof pokeApiService
   */
  async fetchPokemonEvolution(
    pokemonId: number
  ): Promise<PokedexApiResult<EvolutionChain>> {
    const response = await fetch(
      `https://pokeapi.co/api/v2/evolution-chain/${pokemonId}`
    );
    if (response.ok) {
      this.apiResult.result = await response.json();
      return this.apiResult;
    } else {
      this.apiResult.result = response;
      this.apiResult.message = this.errorMessage + "Evolution Chain";
      return this.apiResult;
    }
  }
}

export default new pokeApiService();

export interface PokedexApiResult<T> {
  result: T;
  message: string;
}
