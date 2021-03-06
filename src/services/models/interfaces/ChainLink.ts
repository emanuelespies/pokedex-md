import { EvolutionDetail } from "./EvolutionDetail";

export default interface ChainLink {
  is_babe: boolean;
  species: {
    name: string;
    url: string;
  };
  evolves_to: ChainLink[];
  evolution_details: EvolutionDetail[];
}
