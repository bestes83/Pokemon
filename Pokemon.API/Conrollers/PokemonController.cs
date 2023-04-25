using System.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PokeApiNet;
using Pokemon.Business.DTO;
using Type = PokeApiNet.Type;

namespace Pokemon.API.Conrollers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokemonController : ControllerBase
    {
        private readonly PokeApiClient pokeClient;
        public PokemonController()
        {
            pokeClient = new PokeApiClient();
        }

        [HttpGet("GetList/{page}")]
        public async Task<IList<PokemonDTO>> GetList(int? page = 0)
        {
            var chunk = 60;
            var currentIndex = page * chunk + 1;
            var resource = await pokeClient.GetNamedResourcePageAsync<PokeApiNet.Pokemon>(chunk, currentIndex == null || currentIndex <= 0 ? 0 : currentIndex.Value - 1);

            var pagedPokemon = resource.Results.Select(x =>
            {
                var url = new ApiResource<PokeApiNet.Pokemon>() { Url = x.Url };
                var pokemon = pokeClient.GetResourceAsync<PokeApiNet.Pokemon>(url).Result;
                var species = pokeClient.GetResourceAsync<PokemonSpecies>(pokemon.Id).Result;
                return new PokemonDTO(pokemon, null, species:species, null, null) { IsDetail = true };
            }).ToList();

            return pagedPokemon;
        }

        [HttpGet("GetPokemon/{id}")]
        public async Task<PokemonDTO> GetPokemon(int? id)
        {
            if (id == null)
                return null;

            var pokemon = await pokeClient.GetResourceAsync<PokeApiNet.Pokemon>(id.GetValueOrDefault());
            var species = await pokeClient.GetResourceAsync<PokemonSpecies>(id.GetValueOrDefault());
            var genuses = species.Genera.FirstOrDefault(x => x.Language.Name == "en");

            var weaknesses = new List<Type>();
            var strengths = new List<Type>();

            foreach (var pokemonType in pokemon.Types)
            {
                var type = await pokeClient.GetResourceAsync<Type>(pokemonType.Type);
                weaknesses.AddRange(type.DamageRelations.DoubleDamageFrom.Select(x => pokeClient.GetResourceAsync<Type>(x.Name).Result).ToList());
                strengths.AddRange(type.DamageRelations.DoubleDamageTo.Select(x => pokeClient.GetResourceAsync<Type>(x.Name).Result).ToList());
            }

            weaknesses = weaknesses.Where(x => strengths.All(y => y.Id != x.Id)).ToList();
            //var pokemonTypes = pokeClient.GetResourceAsync<Type>(pokemon.Types.First().Type);
            
            

            var pokemonDTO = new PokemonDTO(pokemon, genuses, species, weaknesses, strengths);// { Evolution = evolution };

            return pokemonDTO;
        }

        [HttpGet("GetEvolutionChain/{id}")]
        public async Task<EvolutionDTO> GetEvolutionChain(int? id)
        {
            //var pokemon = await pokeClient.GetResourceAsync<PokeApiNet.Pokemon>(id.GetValueOrDefault());
            var species = await pokeClient.GetResourceAsync<PokemonSpecies>(id.GetValueOrDefault());

            var evolutionChain = await pokeClient.GetResourceAsync<EvolutionChain>(species.EvolutionChain);
            var stage1Species = await pokeClient.GetResourceAsync<PokemonSpecies>(evolutionChain.Chain.Species);
            var stage1Pokemon = await pokeClient.GetResourceAsync<PokeApiNet.Pokemon>(stage1Species.Id);

            PokemonSpecies? stage2Species = null;
            PokeApiNet.Pokemon? stage2Pokemon = null;
            PokemonSpecies? stage3Species = null;
            PokeApiNet.Pokemon? stage3Pokemon = null;

            if (evolutionChain.Chain.EvolvesTo.Any())
            {
                var namedApiResource = evolutionChain.Chain.EvolvesTo.FirstOrDefault()?.Species;
                if (namedApiResource != null)
                    stage2Species = await pokeClient.GetResourceAsync<PokemonSpecies>(namedApiResource);

                if (stage2Species != null)
                    stage2Pokemon = await pokeClient.GetResourceAsync<PokeApiNet.Pokemon>(stage2Species.Id);

                if (evolutionChain.Chain.EvolvesTo.FirstOrDefault().EvolvesTo.Any())
                {
                    namedApiResource = evolutionChain.Chain.EvolvesTo?.FirstOrDefault().EvolvesTo.FirstOrDefault()?.Species;
                    if (namedApiResource != null)
                        stage3Species = await pokeClient.GetResourceAsync<PokemonSpecies>(namedApiResource);

                    if (stage3Species != null)
                        stage3Pokemon = await pokeClient.GetResourceAsync<PokeApiNet.Pokemon>(stage3Species.Id);
                }
            }

            var evolution = new EvolutionDTO()
            {
                Stage1 = new PokemonDTO(stage1Pokemon, null, stage1Species, null, null),
                Stage2 = stage2Pokemon == null ? null : new PokemonDTO(stage2Pokemon, null, stage2Species, null, null),
                Stage3 = stage3Pokemon == null ? null : new PokemonDTO(stage3Pokemon, null, stage3Species, null, null)
            };

            return evolution;
        }
    }
}
