using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SampleCore.Infrastructure;
using SampleCore.Models.Account.FileIdentityStore;
using SampleCore.Models.Account.User;

namespace SampleCore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddResponseCompression();
            ConfigureAuthenticationServices(services);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            ConfigureEnvironment(app, env);
            app.UseResponseCompression();
            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseMvc();

        }

        private static void ConfigureAuthenticationServices(IServiceCollection services)
        {
            services
                .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme,
                    options =>
                    {
                        options.LoginPath = "/Account/User/login";
                        options.LogoutPath = "/Account/User/logout";
                    });

            services
                .AddMvc()
                .AddRazorPagesOptions(options =>
                {
                    options.Conventions.AuthorizeFolder("/");
                    options.Conventions.AllowAnonymousToPage("/Index");
                    options.Conventions.AllowAnonymousToPage("/About");
                    options.Conventions.AllowAnonymousToPage("/Account/User/Login");
                });

            services.AddTransient<IUserManager, UserManager>();
            services.AddTransient<IUserRepository, FileBasedUserRepository>();
        }

        private static void ConfigureEnvironment(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
        }
    }
}