using AutomationHub.API.Models;
using Azure.Data.Tables;

namespace AutomationHub.API.Extensions
{
    public static class UserDetailsExtensions
    {
        public static UserDetails ToUserDetails(this TableEntity userEntity)
        {
            return new UserDetails
            {
                DisplayName = userEntity.GetString("DisplayName"),
                LastVistTime = userEntity.GetDateTime("LastVistTime"),
                TeamsNotificationsSubscribed = userEntity.GetBoolean("TeamsNotificationsSubscribed") ?? false,
                EmailsSubscribed = userEntity.GetBoolean("EmailsSubscribed") ?? false,
                UserId = userEntity.GetString("UserId"),
                UserEmail = userEntity.GetString("UserEmail"),
                IsFirstVisit = !userEntity.GetDateTime("LastVistTime").HasValue,
                PersonalDevEnvId = userEntity.GetString("PersonalDevEnvId")
            };
        }
    }
}
