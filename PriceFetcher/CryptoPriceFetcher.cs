using System;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using PriceFetcher;

namespace PriceFetcher
{
    public class TokenPrice
    {
        public decimal Amount { get; set; }

        public string Base { get; set; }

        public string Currency { get; set; }

        public DateTime DateTime { get; set; }

    }
    public class CryptoPriceFetcher
    {
        private readonly ILogger _logger;
        private const string CoinbaseUrl = "https://api.coinbase.com/v2/prices/{token}-USD/buy";
        private const string TokenName = "SOL";

        public CryptoPriceFetcher(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<CryptoPriceFetcher>();
        }

        // Get the latest price of BTC every 3 mins from Coinbase
        [Function("CryptoPriceFetcher")]
        public async Task Run([TimerTrigger("0 */3 * * * *")] TimerInfo myTimer)
        {
            _logger.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");

            try
            {
                string url = CoinbaseUrl.Replace("{token}", TokenName);
                using HttpClient httpClient = new();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var response = await httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    string tokenPriceJson = await response.Content.ReadAsStringAsync();
                    var jsonElt = JsonSerializer.Deserialize<JsonElement>(tokenPriceJson);
                    var data = jsonElt.GetProperty("data").ToString();
                    var options = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    };
                    
                    var tokenPriceObj = Newtonsoft.Json.Linq.JObject.Parse(data);

                    var tokenPrice = new TokenPrice
                    {
                        Amount = decimal.Parse(tokenPriceObj["amount"].ToString()),
                        Base = tokenPriceObj["base"].ToString(),
                        Currency = tokenPriceObj["currency"].ToString(),
                        DateTime = DateTime.Now
                    };
                    _logger.LogInformation($"Price of {TokenName} is: {tokenPrice.Amount} {tokenPrice.Currency}");
                }
                else
                {
                    // Log the error message
                    _logger.LogError($"Error occurred while fetching price of {TokenName}: {response.Content}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred in CryptoPriceFetcher: {ex.Message}");
            }
        }
    }
}
