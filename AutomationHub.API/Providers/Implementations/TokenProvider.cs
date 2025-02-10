using AutomationHub.API.Cache;
using AutomationHub.API.Configuration;
using AutomationHub.API.Providers.Interfaces;
using Azure.Core;
using Azure.Identity;
using Azure.Security.KeyVault.Certificates;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;
using Microsoft.Identity.Web;
using System.Security.Cryptography.X509Certificates;
using System;

namespace AutomationHub.API.Providers.Implementations
{
    public class TokenProvider : ITokenProvider
    {

        private readonly AzureADConfiguration _configuration;
        private readonly ILogger<TokenProvider> _logger;
        private readonly IConfidentialClientApplication _confidentialClientApplication;
        private readonly CertificateClient _certificateClient;
        private readonly X509Certificate2 _x509Certificate;

        public TokenProvider(IOptions<AzureADConfiguration> configuration, ILogger<TokenProvider> logger)
        {
            _configuration = configuration.Value;
            _logger = logger;
            _certificateClient = new CertificateClient(new Uri(_configuration.KeyVaultUri), new DefaultAzureCredential());
            _x509Certificate = _certificateClient.DownloadCertificate(_configuration.AuthCertName);

            _confidentialClientApplication = ConfidentialClientApplicationBuilder
                .Create(_configuration.ClientId) //This is the client id for your SPN
                .WithCertificate(_x509Certificate, true)
                .WithAuthority($"https://login.microsoftonline.com/{_configuration.TenantId}")
                .Build();
        }

        public async Task<string> GetOBOTokenForUser(string userToken, string[] scopes)
        {
            try
            {
                var result = await _confidentialClientApplication
                                    .AddInMemoryTokenCache() //this can cause problems later with memory, consider using a distributed cache
                                    .AcquireTokenOnBehalfOf(scopes, new UserAssertion(userToken))
                                    .ExecuteAsync();
                return result.AccessToken;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while exchanging user token");
            }
            return null;
        }

        public OnBehalfOfCredential GetCredentialForGraph(string userToken)
        {
            try
            {
                var result = new OnBehalfOfCredential(_configuration.TenantId, _configuration.ClientId, _x509Certificate, userToken);
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while exchanging user token for graph");
            }
            return null;
        }
    }
}