using System.Xml.Serialization;

namespace Pokemon.Api
{
    public static class ApiExtensions
    {
        public static IEndpointRouteBuilder ConfigureApiEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapGet("/pokemon", () =>
            {
            })
            .WithName("GetPokemon")
            .WithOpenApi();

            return app;
        }


    }
}
