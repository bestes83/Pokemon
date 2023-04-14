import { EvolutionModel } from "./EvolutionModel";

export interface PokemonModel{
    name: string;
    id:string;
    types:string[];
    heightInMeters: number;
    weightInKg: number;
    genus:string;
    abilities:string[];
    weaknesses:string[];
    evolution: any;
}
