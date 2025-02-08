using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureServices(services =>
    {
        string cosmosDbConnectionString = Environment.GetEnvironmentVariable("AzureResumeConnectionString");

        if (string.IsNullOrEmpty(cosmosDbConnectionString))
        {
            throw new InvalidOperationException("CosmosDB connection string is missing.");
        }

        services.AddSingleton<CosmosClient>(sp => new CosmosClient(cosmosDbConnectionString));
    })
    .Build();

host.Run();
