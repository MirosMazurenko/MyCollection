using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class IgdbController : BaseApiController
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string _clientId;
        private readonly string _clientSecret;

        public IgdbController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _clientId = configuration["TwitchClientId"];
            _clientSecret = configuration["TwitchClientSecret"];
        }

        [HttpPost("twitchToken")]
        public async Task<IActionResult> GetTwitchToken()
        {
            var client = _httpClientFactory.CreateClient();
            var request = new HttpRequestMessage(HttpMethod.Post, "https://id.twitch.tv/oauth2/token");

            var content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("client_id", _clientId),
                new KeyValuePair<string, string>("client_secret", _clientSecret),
                new KeyValuePair<string, string>("grant_type", "client_credentials")
            });

            request.Content = content;

            var response = await client.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Failed to get Twitch token");
            }

            var responseData = await response.Content.ReadAsStringAsync();
            return Content(responseData, "application/json");
        }

        [HttpPost("{gameName}")]
        public async Task<IActionResult> GetGameUrl(string gameName)
        {
            var client = _httpClientFactory.CreateClient();

            // Step 1: Get the Twitch token
            var tokenRequest = new HttpRequestMessage(HttpMethod.Post, "https://id.twitch.tv/oauth2/token");
            var tokenContent = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("client_id", _clientId),
                new KeyValuePair<string, string>("client_secret", _clientSecret),
                new KeyValuePair<string, string>("grant_type", "client_credentials")
            });

            tokenRequest.Content = tokenContent;

            var tokenResponse = await client.SendAsync(tokenRequest);
            if (!tokenResponse.IsSuccessStatusCode)
            {
                return StatusCode((int)tokenResponse.StatusCode, "Failed to get Twitch token");
            }

            var tokenData = await tokenResponse.Content.ReadAsStringAsync();
            var tokenJson = JsonSerializer.Deserialize<JsonDocument>(tokenData);
            var accessToken = tokenJson.RootElement.GetProperty("access_token").GetString();

            // Step 2: Fetch the game cover ID from IGDB
            var gameRequest = new HttpRequestMessage(HttpMethod.Post, "https://api.igdb.com/v4/games");
            gameRequest.Headers.Add("Accept", "application/json");
            gameRequest.Headers.Add("Client-ID", _clientId);
            gameRequest.Headers.Add("Authorization", $"Bearer {accessToken}");

            var bodyContent = $"fields cover; where name = \"{gameName}\";";
            gameRequest.Content = new StringContent(bodyContent, Encoding.UTF8, "application/json");

            var gameResponse = await client.SendAsync(gameRequest);
            if (!gameResponse.IsSuccessStatusCode)
            {
                return StatusCode((int)gameResponse.StatusCode, "Failed to fetch game details");
            }

            var gameData = await gameResponse.Content.ReadAsStringAsync();
            var gameJson = JsonSerializer.Deserialize<JsonDocument>(gameData);
            var coverId = gameJson.RootElement[0].GetProperty("cover").GetInt32();

            // Step 3: Fetch the game cover URL using the cover ID
            var coverRequest = new HttpRequestMessage(HttpMethod.Post, "https://api.igdb.com/v4/covers");
            coverRequest.Headers.Add("Accept", "application/json");
            coverRequest.Headers.Add("Client-ID", _clientId);
            coverRequest.Headers.Add("Authorization", $"Bearer {accessToken}");

            var coverBodyContent = $"fields url; where id = {coverId};";
            coverRequest.Content = new StringContent(coverBodyContent, Encoding.UTF8, "application/json");

            var coverResponse = await client.SendAsync(coverRequest);
            if (!coverResponse.IsSuccessStatusCode)
            {
                return StatusCode((int)coverResponse.StatusCode, "Failed to fetch game cover details");
            }

            var coverData = await coverResponse.Content.ReadAsStringAsync();
            var coverJson = JsonSerializer.Deserialize<JsonDocument>(coverData);
            var coverUrl = coverJson.RootElement[0].GetProperty("url").GetString();

            coverUrl = coverUrl.Replace("t_thumb", "t_cover_big");

            // Step 4: Return the game cover URL
            return Ok(new { coverUrl });
        }
    }
}