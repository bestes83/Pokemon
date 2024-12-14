global using MediatR;

using Microsoft.Extensions.DependencyInjection;

namespace Pokemon.Core
{
    public static class Global
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Global).Assembly));
            
            return services;
        }
    }
}
