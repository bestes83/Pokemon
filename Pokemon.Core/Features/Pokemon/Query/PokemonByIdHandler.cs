namespace Pokemon.Core.Features.Pokemon.Query
{
    public class PokemonByIdHandler : IRequestHandler<PokemonByIdQuery>
    {
        public PokemonByIdHandler()
        { }

        public async Task Handle(PokemonByIdQuery request, CancellationToken cancellationToken)
        {
            var pokemonId = request.Id;
        }
    }
}
