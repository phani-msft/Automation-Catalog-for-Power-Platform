using AutomationHub.API.Providers.Interfaces;
using AutomationHub.API.Services.Interfaces;
using Azure.Identity;
using Microsoft.Graph;
using Microsoft.Graph.Models;
using Microsoft.Graph.Users.Item.CheckMemberGroups;

namespace AutomationHub.API.Services.Implementations
{
    public class GraphService : IGraphService
    {
        private readonly ILogger<GraphService> _logger;
        private readonly GraphServiceClient _graphServiceClient;

        public GraphService(ILogger<GraphService> logger
            , ITokenProvider tokenProvider
            , IHttpContextAccessor httpContextAccessor)
        {
            _logger = logger;
            string userToken = httpContextAccessor.HttpContext.Request.Headers.Authorization.ToString().Replace("Bearer ", "");
            OnBehalfOfCredential credential = tokenProvider.GetCredentialForGraph(userToken);
            _graphServiceClient = new GraphServiceClient(credential);
        }

        public async Task<User?> GetUserInformation(string userId)
        {
            try
            {
                return await _graphServiceClient.Users[userId].GetAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user information");
                return null;
            }
        }

        public async Task<List<string>> CheckUserMembership(string userId, List<string> groupsToCheck)
        {
            try
            {
                CheckMemberGroupsPostRequestBody checkMemberGroupsPostRequestBody = new CheckMemberGroupsPostRequestBody();
                checkMemberGroupsPostRequestBody.GroupIds = groupsToCheck;
                var userGroups = await _graphServiceClient.Users[userId].CheckMemberGroups.PostAsCheckMemberGroupsPostResponseAsync(checkMemberGroupsPostRequestBody);
                return userGroups?.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking if user is TCA consumer group member");
                return null;
            }
        }
    }
}
