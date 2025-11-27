
using CShap.RestApi.BLL;
using CShap.RestApi.BLL.Interfaces;
using CShap.RestApi.DAL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace CShap.RestApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Load configure parameters from secert or environment variables
            var connectionString = LoadConnectiongString(builder);

            // Cors policy added (allow requests from any IP address in default)
            string[] clientUrls = {};
            var corsPolicyName = "Allow_All";
            ConfigureCORSPolicy(builder, corsPolicyName, clientUrls);

            // Configure database connection string
            builder.Services.AddDbContext<AppDbContext>(options =>
            {
                options.UseNpgsql(connectionString);
            });

            // Register service interface
            builder.Services.AddScoped<IBillDtoService, BillDtoService>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add CORS policy
            const string CORS_POLICY_NAME = "allow_all";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: CORS_POLICY_NAME,
                policy =>
                {
                    policy.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });

            // Configure JWT authentication
            const string authIssueer = "https://stirred-urchin-27.clerk.accounts.dev";
            const string authAudience = "dmit2015-jwt";
            ConfigureAuthority(builder, authIssueer, authAudience);

            var app = builder.Build();

            // Enable CORS
            app.UseCors(CORS_POLICY_NAME);

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }

        // Load database connection string
        //  1. At first, try to find connenction string from securet/appsettings.json
        //  2. If failed, then load it from local environement variable
        private static string LoadConnectiongString(WebApplicationBuilder builder)
        {
            // Read db connection string from local secret at first/appsettings.json (For Dev)
            // If failed, get it from environment variable (For online Test and Production)
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "";
            if (String.IsNullOrWhiteSpace(connectionString))
            {
                connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING") ?? "";
            }
            if (String.IsNullOrWhiteSpace(connectionString))
            {
                throw new Exception("No database connection string available, please add DB_CONNECTION_STRING to environment variables");
            }

            return connectionString;
        }

        // Configure CORS for client requests
        private static void ConfigureCORSPolicy(WebApplicationBuilder builder, String policyName, String[]? origins)
        {
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: policyName,
                policy =>
                {
                    // Only allow origins which are set in environment variables,
                    // otherwise allow all origins
                    if (origins?.Length > 0)
                    {
                        policy.WithOrigins(origins)
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                    }
                    else
                    {
                        policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                    }
                });
            });
        }
        // Configure JWT for Clerk
        private static void ConfigureAuthority(WebApplicationBuilder builder, String authIssuer, String authAudience)
        {
            // Set authority to JWT
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = authIssuer;
                    options.Audience = authAudience;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true
                    };
                    options.Events = new JwtBearerEvents
                    {
                        // Add role to token
                        OnTokenValidated = context =>
                        {
                            var claimsIdentity = context.Principal.Identity as ClaimsIdentity;
                            var roleClaim = claimsIdentity?.FindFirst("role");
                            if (roleClaim != null)
                            {
                                claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, roleClaim.Value));
                            }
                            return Task.CompletedTask;
                        },

                        // Failed
                        OnAuthenticationFailed = ctx =>
                        {
                            Console.WriteLine("Token invalid: " + ctx.Exception.Message);
                            Console.WriteLine("InnerException: " + ctx.Exception.InnerException?.Message);
                            return Task.CompletedTask;
                        }
                    };
                });

            builder.Services.AddAuthorization();
        }
    }
}
