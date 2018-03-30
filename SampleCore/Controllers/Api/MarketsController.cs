using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace SampleCore.Controllers.Api
{
    [Route("api/[controller]")]
    public class MarketsController : Controller
    {
        [HttpGet("mostactive")]
        public object Markets()
        {
            var client = new System.Net.WebClient();
            var markets = client.DownloadString(new Uri("https://api.iextrading.com/1.0/stock/market/list/mostactive"));
            return JsonConvert.DeserializeObject(markets);
        }
    }
}