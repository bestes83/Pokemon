using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pokemon.Business.DTO
{
    public class EvolutionDTO
    {
        public EvolutionDTO()
        {
            //Stage1 = new List<PokemonDTO>();
            //Stage2 = new List<PokemonDTO>();
            //Stage3 = new List<PokemonDTO>();
        }
        //public int StageID { get; set; }
        //public PokemonDTO Pokemon { get; set; }

        public PokemonDTO? Stage1 { get; set; }
        public PokemonDTO? Stage2 { get; set; }
        public PokemonDTO? Stage3 { get; set; }
    }
}
