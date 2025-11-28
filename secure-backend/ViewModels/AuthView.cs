namespace cshap_restapi.ViewModels
{
    public class LoginRequest
    {
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
    }
    public class LoginResponse
    {
        public string SessionId { get; set; } = default!;
        public string SessionToken { get; set; } = default!;
        public string Role { get; set; } = default!;
        public string Name { get; set; } = default!;
    }
}
