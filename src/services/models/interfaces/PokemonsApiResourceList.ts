import type Pokemon from "./Pokemon";

export default interface PokemonsApiResourceList {
  count: number;
  next: string;
  previous: boolean;
  results: Pokemon[];
}
