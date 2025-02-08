using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Company.Function
{
    public class GetResumeCounter
    {
        private readonly ILogger<GetResumeCounter> _logger;
        private readonly CosmosClient _cosmosClient;
        private readonly string databaseName = "AzureResume";
        private readonly string containerName = "Counter";

        public GetResumeCounter(ILogger<GetResumeCounter> logger, CosmosClient cosmosClient)
        {
            _logger = logger;
            _cosmosClient = cosmosClient;
        }

        [Function("GetResumeCounter")]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var container = _cosmosClient.GetContainer(databaseName, containerName);

            // Retrieve the counter document (assumes only one document with id "1")
            string counterId = "1";
            string partitionKey = "1"; // Adjust based on your database schema

            Counter counter;
            try
            {
                ItemResponse<Counter> response = await container.ReadItemAsync<Counter>(counterId, new PartitionKey(partitionKey));
                counter = response.Resource;
            }
            catch (CosmosException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
            {
                _logger.LogWarning("Counter document not found, initializing a new one.");
                counter = new Counter { Id = counterId, PartitionKey = partitionKey, count = 0 };
            }

            // Increment count
            counter.count += 1;
            await container.UpsertItemAsync(counter, new PartitionKey(counter.PartitionKey));

            // Return response
            var responseData = req.CreateResponse(HttpStatusCode.OK);
            responseData.Headers.Add("Content-Type", "application/json");
            await responseData.WriteStringAsync(JsonSerializer.Serialize(counter));

            return responseData;
        }
    }
}