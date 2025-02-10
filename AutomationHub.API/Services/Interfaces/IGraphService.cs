using Microsoft.Graph.Models;

namespace AutomationHub.API.Services.Interfaces
{
    public interface IGraphService
    {
        Task<User?> GetUserInformation(string userId);
        Task<List<string>> CheckUserMembership(string userId, List<string> groupsToCheck);
    }
}