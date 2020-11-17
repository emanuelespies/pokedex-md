import PokemonType from "./PokemonType";

export default interface PokemonDetail {
  id: number;
  name: string;
  types: PokemonType[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    front_default: string;
  };
}
