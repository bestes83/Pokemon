using Microsoft.AspNetCore.Mvc;
using Pokemon.React.Models;
using System.Diagnostics;
using System.Security.Cryptography;
using PokeApiNet;
using Pokemon.Business.DTO;

namespace Pokemon.React.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly PokeApiClient pokeClient;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
            pokeClient = new PokeApiClient();
        }

        public IActionResult Index(int? id = 0)
        {
            ViewBag.CurrentIndex = id;
            return View();
        }

        public IActionResult GetList(int? id = 0)
        {
            var currentIndex = id;
            var resource = pokeClient.GetNamedResourcePageAsync<PokeApiNet.Pokemon>(50, currentIndex == null || currentIndex <= 0 ? 0 : currentIndex.Value - 1).Result;

            var pagedPokemon = resource.Results.Select(x =>
            {
                var url = new ApiResource<PokeApiNet.Pokemon>() { Url = x.Url };
                var pokemon = pokeClient.GetResourceAsync<PokeApiNet.Pokemon>(url).Result;
                var species = pokeClient.GetResourceAsync<PokemonSpecies>(pokemon.Id).Result;
                return new PokemonDTO(pokemon, null, species) { IsDetail = true };
            }).ToList();

            return Json(pagedPokemon);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}