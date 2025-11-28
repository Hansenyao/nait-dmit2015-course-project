using CShap.RestApi.BLL.Interfaces;
using cshap_restapi.BLL.Interfaces;
using cshap_restapi.ViewModels;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace cshap_restapi.BLL
{
    public class AuthService : IAuthService
    {
        private readonly string clerk_host = "https://stirred-urchin-27.clerk.accounts.dev";
        private readonly string clerk_secert = "sk_test_BtZAsgHm0S3Bc1YRALFM2uIbYz2RgBjeypf17Mvx0E";
        private readonly IHttpClientFactory _httpClientFactory;

        public AuthService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<SResult<LoginResponse>> LoginAsync(LoginRequest dto)
        {
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = 
                new AuthenticationHeaderValue("Bearer", clerk_secert);

            // Step 1: sign-in attempt
            var attemptPayload = new
            {
                identifier = dto.Email
            };

            var attemptContent = new StringContent(
                JsonConvert.SerializeObject(attemptPayload),
                Encoding.UTF8,
                "application/json"
            );

            var attemptResponse = await client.PostAsync(
                $"{clerk_host}/v1/client/sign_ins", attemptContent
            );
            if (!attemptResponse.IsSuccessStatusCode)
                return SResult<LoginResponse>.Fail(await attemptResponse.Content.ReadAsStringAsync());

            var attemptJson = await attemptResponse.Content.ReadAsStringAsync();
            dynamic attemptData = JsonConvert.DeserializeObject(attemptJson);
            string attemptId = attemptData.id;

            // Step 2: Submit password
            var passwordPayload = new
            {
                strategy = "password",
                password = dto.Password
            };

            var passwordContent = new StringContent(
                JsonConvert.SerializeObject(passwordPayload),
                Encoding.UTF8,
                "application/json"
            );

            var passwordResponse = await client.PostAsync(
                $"{clerk_host}/v1/client/sign_ins/{attemptId}/attempt",
                passwordContent
            );

            if (!passwordResponse.IsSuccessStatusCode)
                return SResult<LoginResponse>.Fail(await passwordResponse.Content.ReadAsStringAsync());

            var passwordJson = await passwordResponse.Content.ReadAsStringAsync();
            dynamic passwordData = JsonConvert.DeserializeObject(passwordJson);

            // 登录成功，返回 session token
            string sessionId = passwordData.created_session_id;
            string sessionToken = passwordData.created_session_jwt; // JWT token

            // 可选：获取用户信息
            string userId = passwordData.user_id;
            var userResponse = await client.GetAsync(
                $"{clerk_host}/v1/users/{userId}"
            );
            dynamic userData = JsonConvert.DeserializeObject(await userResponse.Content.ReadAsStringAsync());

            string role = userData.public_metadata?.role;
            string name = userData.first_name;
            var response = new LoginResponse
            {
                SessionId = sessionId,
                SessionToken = sessionToken,
                Role = role ?? "",
                Name = name
            };
            return SResult<LoginResponse>.Ok(response);
        }
        public async Task<SResult> LogoutAsync()
        {
            return SResult.Fail("No implement");
        }
    }
}
