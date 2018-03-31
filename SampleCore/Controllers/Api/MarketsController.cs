using System;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace SampleCore.Controllers.Api
{
    [Route("api/[controller]")]
    public class MarketsController : Controller
    {
        private static object Get(string url)
        {
            var client = new WebClient();
            try
            {
                var data = client.DownloadString(new Uri(url));
                return JsonConvert.DeserializeObject(data);

            }
            finally
            {
                client.Dispose();
            }
        }

        [HttpGet("mostactive")]
        public object MostActive() => Get("https://api.iextrading.com/1.0/stock/market/list/mostactive");

        [HttpGet("gainers")]
        public object Gainers() => Get("https://api.iextrading.com/1.0/stock/market/list/gainers");

        [HttpGet("Losers")]
        public object Losers() => Get("https://api.iextrading.com/1.0/stock/market/list/losers");

        [HttpGet("news")]
        public object News() => Get("https://api.iextrading.com/1.0/stock/aapl/news");

        [HttpGet("stocks")]
        public object Stocks() => Get("https://api.iextrading.com/1.0/ref-data/symbols");
    }
}