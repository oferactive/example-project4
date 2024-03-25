using DataModel.Repositories;
using DataModel.Services;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services)
        {
            services.TryAddTransient<IUserRepository, UserRepository>();
            services.TryAddTransient<IInsurancePolicyRepository, InsurancePolicyRepository>();
            return services;
        }
    }
}