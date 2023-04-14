using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using PokeApiNet;
using Pokemon.Business.Extensions;
using Type = PokeApiNet.Type;

namespace Pokemon.Business.DTO
{
    public class PokemonDTO
    {
        private const string imageLoc = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
        private const string imageDetailLoc = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

        public PokemonDTO(PokeApiNet.Pokemon pokemon, Genuses genuses, PokemonSpecies species, List<Type> weaknesses, List<Type> strengths)
        {
            Id = pokemon.Id;
            //Name = pokemon.Name.Capitalize();
            Name = species?.Name.Capitalize();
            Types = pokemon?.Types.Select(x => x.Type.Name.Capitalize()).ToList();
            Weaknesses = weaknesses?.Select(x => x.Name).ToList();
            Strengths = strengths?.Select(x => x.Name).ToList();
            HeightInMeters = Math.Round(pokemon.Height * .10, 2).ToString("0.0#");
            WeightInKg = Math.Round((pokemon.Weight * .10), 2).ToString("0.0#");
            Genus = genuses?.Genus;
            Abilities = pokemon.Abilities.Select(x => x.Ability.Name).ToList();

            if (species != null && species.IsLegendary)
                LegendaryOrMethicalTag = "Legendary";
            else if (species != null && species.IsMythical)
                LegendaryOrMethicalTag = "Mythical";
            else
                LegendaryOrMethicalTag = string.Empty;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public List<string> Types { get; private set; }
        public string HeightInMeters { get; set; }
        public string WeightInKg { get; set; }
        public string Genus { get; set; }
        public IList<string> Abilities { get; set; }
        public EvolutionDTO Evolution { get; set; }
        public bool IsDetail { get; set; }
        public string LegendaryOrMethicalTag { get; private set; }
        public string ImageUrl
        {
            get
            {
                var url = IsDetail ? imageDetailLoc : imageLoc;
                return $"{url}{Id.ToString().PadLeft(3, '0')}.png";
            }
        }

        public List<string> Weaknesses { get; private set; }
        public List<string> Strengths { get; private set; }
    }
}
