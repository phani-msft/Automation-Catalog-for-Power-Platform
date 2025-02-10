using Azure.Identity;

namespace AutomationHub.API.Providers.Interfaces
{
    public interface ITokenProvider
    {
        Task<string> GetOBOTokenForUser(string userToken, string[] scopes);

        OnBehalfOfCredential GetCredentialForGraph(string userToken);
    }
}