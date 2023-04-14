using Microsoft.AspNetCore.Mvc;
using PokeApiNet;
using Pokemon.Business.DTO;

namespace Pokemon.React.Controllers
{
    public class PokemonController : Controller
    {
        private readonly PokeApiClient pokeClient;

        public PokemonController()
        {
            pokeClient = new PokeApiClient();
        }

        public IActionResult Detail(int? id)
        {
            ViewBag.PokemonId = id;
            return View();
        }

        public IActionResult GetPokemon(int? id)
        {
            //var pokemonList = pokeClient.GetNamedResourcePageAsync<PokeApiNet.Pokemon>().Result;
            var totalPokemon = 905;
            var random = new Random();
            //var pokemonId = random.Next(0, totalPokemon);
            //pokemonId = 6;
            //pokemonId = 44;
            //pokemonId = 642;
            //pokemonId = 60;

            if (id == null)
                return null;

            var pokemon = pokeClient.GetResourceAsync<PokeApiNet.Pokemon>(id.GetValueOrDefault()).Result;
            var species = pokeClient.GetResourceAsync<PokemonSpecies>(id.GetValueOrDefault()).Result;
            var genuses = species.Genera.FirstOrDefault(x => x.Language.Name == "en");
            var evolutionChain = pokeClient.GetResourceAsync<EvolutionChain>(species.EvolutionChain).Result;
            var x = species.PokedexNumbers;
            var evolution = GetEvolution(evolutionChain);

            return Json(new PokemonDTO(pokemon, genuses, species) { Evolution = evolution });
        }

        private EvolutionDTO GetEvolution(EvolutionChain evolutionChain)
        {
            var list = new List<EvolutionDTO>();
            var evolution = new EvolutionDTO();

            var species = pokeClient.GetResourceAsync<PokeApiNet.PokemonSpecies>(evolutionChain.Chain.Species).Result;
            var pokemon = pokeClient.GetResourceAsync<PokeApiNet.Pokemon>(species.Id).Result;
            var genuses = species.Genera.FirstOrDefault(x => x.Language.Name == "en");
            evolution.Stage1.Add(new PokemonDTO(pokemon, genuses, species) { IsDetail = true });

            var evolvesTo = evolutionChain.Chain.EvolvesTo.ToList();

            evolvesTo.ForEach(x =>
            {
                species = pokeClient.GetResourceAsync<PokeApiNet.PokemonSpecies>(x.Species).Result;
                genuses = species.Genera.FirstOrDefault(x => x.Language.Name == "en");
                pokemon = pokeClient.GetResourceAsync<PokeApiNet.Pokemon>(species.Id).Result;
                evolution.Stage2.Add(new PokemonDTO(pokemon, genuses, species) { IsDetail = true });
            });

            evolvesTo.SelectMany(x => x.EvolvesTo).ToList().ForEach(x =>
            {
                species = pokeClient.GetResourceAsync<PokeApiNet.PokemonSpecies>(x.Species).Result;
                genuses = species.Genera.FirstOrDefault(x => x.Language.Name == "en");
                pokemon = pokeClient.GetResourceAsync<PokeApiNet.Pokemon>(species.Id).Result;
                evolution.Stage3.Add(new PokemonDTO(pokemon, genuses, species) { IsDetail = true });
            });

            return evolution;
        }
    }
}
