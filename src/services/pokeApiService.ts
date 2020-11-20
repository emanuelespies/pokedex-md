import { Dispatch, SetStateAction } from "react";
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
  private errorMessage: string = "Error while loading ";
  /**
   * Fetch Pokemons from api
   *
   * @param {number} limit - the result limit for each call
   * @param {number} offset - where to start in the list
   * @param {Dispatch<SetStateAction<boolean>>} setLoading - set loading to true or false
   * @return {Promise<PokemonsApiResourceList>}
   * @memberof pokeApiService
   */

  async fetchPokemons(
    limit: number,
    offset: number,
    setLoading: Dispatch<SetStateAction<boolean>>
  ): Promise<PokedexApiResult<PokemonsApiResourceList>> {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    if (response.ok) {
      this.apiResult.result = await response.json();
      this.apiResult.message = "";
      setLoading(false);
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
   * @param {Dispatch<SetStateAction<boolean>>} setLoading - set loading to true or false
   * @return {Promise<PokemonDetail>}
   * @memberof pokeApiService
   */
  async fetchPokemonDetail(
    url: string,
    setLoading: Dispatch<SetStateAction<boolean>>
  ): Promise<PokedexApiResult<PokemonDetail>> {
    const response = await fetch(url);
    if (response.ok) {
      this.apiResult.result = await response.json();
      this.apiResult.message = "";
      setLoading(false);
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
   * @param {Dispatch<SetStateAction<boolean>>} setLoading - set loading to true or false
   * @return {Promise<PokemonDetail>}
   * @memberof pokeApiService
   */
  async fetchPokemonDetailByName(
    name: string,
    setLoading: Dispatch<SetStateAction<boolean>>
  ): Promise<PokedexApiResult<PokemonDetail>> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (response.ok) {
      this.apiResult.result = await response.json();
      this.apiResult.message = "";
      setLoading(false);
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
   * @param {Dispatch<SetStateAction<boolean>>} setLoading - set loading to true or false
   * @return {Promise<EvolutionChain>}
   * @memberof pokeApiService
   */
  async fetchPokemonEvolution(
    pokemonId: number,
    setLoading: Dispatch<SetStateAction<boolean>>
  ): Promise<PokedexApiResult<EvolutionChain>> {
    const pokemonSpecies = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
    );

    const { evolution_chain } = await pokemonSpecies.json();

    const response = await fetch(evolution_chain.url);

    if (response.ok) {
      this.apiResult.result = await response.json();
      this.apiResult.message = "";
      setLoading(false);
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
