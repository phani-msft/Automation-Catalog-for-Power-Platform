using AutomationHub.API.Models;

namespace AutomationHub.API.Managers.Interfaces
{
    public interface IUserManager
    {
        Task<bool> CheckIfUserExists(string userId);
        Task<UserDetails> AddNewUser(string userId);
        Task<UserDetails> GetUserDetails(string userId);
        Task<bool> UpdateUserLastVisitTime(string userId);
        Task<bool> UpdateUserEmailsSubscription(string userId, bool preference);
        Task<bool> UpdateUserTeamsNotificationsSubscription(string userId, bool preference);
        Task<bool> UpdateUserPersonalDevEnvId(string userId, string envId);
        Task<UserMemberships> GetUserMemberships(string userId);
    }
}