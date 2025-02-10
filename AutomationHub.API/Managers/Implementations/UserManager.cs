using AutomationHub.API.Configuration;
using AutomationHub.API.Constants;
using AutomationHub.API.Extensions;
using AutomationHub.API.Managers.Interfaces;
using AutomationHub.API.Models;
using AutomationHub.API.Providers.Interfaces;
using AutomationHub.API.Services.Interfaces;
using Azure;
using Azure.Data.Tables;
using Microsoft.Extensions.Options;
using Microsoft.Graph.Models;

namespace AutomationHub.API.Managers.Implementations
{

    public class UserManager : IUserManager
    {
        private readonly TableClient _usersTableClient;
        private readonly IServiceProvider _serviceProvider;
        private readonly MembershipGroupsConfiguration _membershipGroupsConfiguration;
        private readonly ILogger<UserManager> _logger;

        public UserManager(ITableStorageProvider tableStorageProvider
            , IServiceProvider serviceProvider
            , IOptions<MembershipGroupsConfiguration> membershipGroupsConfiguration
            , ILogger<UserManager> logger)
        {
            _usersTableClient = tableStorageProvider.GetUsersTableClient();
            _membershipGroupsConfiguration = membershipGroupsConfiguration.Value;
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        public async Task<bool> CheckIfUserExists(string userId)
        {
            try
            {
                TableEntity userEntity = await GetUserEntity(userId);
                return userEntity != null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error checking if user exists for userId:{userId}");
                return false;
            }
        }

        public async Task<UserDetails> GetUserDetails(string userId)
        {
            try
            {
                TableEntity userEntity = await GetUserEntity(userId);
                if (userEntity != null)
                {
                    ///TODO: add TCA consumer membership logic
                    return userEntity.ToUserDetails();
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting user details for userId:{userId}");
                return null;
            }
        }

        public async Task<UserDetails> AddNewUser(string userId)
        {
            try
            {
                TableEntity userEntity = await GetUserEntity(userId);
                if (userEntity == null)
                {
                    using (var serviceProviderScope = _serviceProvider.CreateScope())
                {
                    IGraphService _graphService = serviceProviderScope.ServiceProvider.GetRequiredService<IGraphService>();
                    User? user = await _graphService.GetUserInformation(userId);
                    if (user == null)
                    {
                        _logger.LogError($"Error getting user information for userId:{userId}");
                        return null;
                    }
                    UserDetails userDetails = new UserDetails
                    {
                        UserId = userId,
                        DisplayName = user.DisplayName,
                        UserEmail = user.Mail,
                        TeamsNotificationsSubscribed = true,
                        EmailsSubscribed = true,
                        IsFirstVisit = true,
                    };
                    return await AddUserDetails(userDetails);
                }
                }
                else
                {
                    return userEntity.ToUserDetails();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error adding new user for userId:{userId}");
            }
            return null;
        }

        public async Task<bool> UpdateUserLastVisitTime(string userId)
        {
            TableEntity userEntity = await GetUserEntity(userId);
            if (userEntity != null)
            {
                TableEntity updatedEntity = new TableEntity(ApplicationConstants.UsersPartitionKey, userId)
                {
                    { "LastVistTime", DateTime.UtcNow }
                };
                try
                {
                    Response response = await _usersTableClient.UpdateEntityAsync(updatedEntity, userEntity.ETag);
                    return !response.IsError;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error updating user last visit for userId:{userId}");
                    return false;
                }
            }
            return false;
        }

        public async Task<bool> UpdateUserTeamsNotificationsSubscription(string userId, bool preference)
        {
            TableEntity userEntity = await GetUserEntity(userId);
            if (userEntity != null)
            {
                TableEntity updatedEntity = new TableEntity(ApplicationConstants.UsersPartitionKey, userId)
                {
                    { "TeamsNotificationsSubscribed", preference }
                };
                try
                {
                    Response response = await _usersTableClient.UpdateEntityAsync(updatedEntity, userEntity.ETag);
                    return !response.IsError;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error updating user notification subscription for userId:{userId}");
                    return false;
                }
            }
            return false;
        }

        public async Task<bool> UpdateUserEmailsSubscription(string userId, bool preference)
        {
            TableEntity userEntity = await GetUserEntity(userId);
            if (userEntity != null)
            {
                TableEntity updatedEntity = new TableEntity(ApplicationConstants.UsersPartitionKey, userId)
                {
                    { "EmailsSubscribed", preference }
                };
                try
                {
                    Response response = await _usersTableClient.UpdateEntityAsync(updatedEntity, userEntity.ETag);
                    return !response.IsError;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error updating user emails subscription for userId:{userId}");
                    return false;
                }
            }
            return false;
        }

        public async Task<bool> UpdateUserPersonalDevEnvId(string userId, string envId)
        {
            TableEntity userEntity = await GetUserEntity(userId);
            if (userEntity != null)
            {
                TableEntity updatedEntity = new TableEntity(ApplicationConstants.UsersPartitionKey, userId)
                {
                    { "PersonalDevEnvId", envId }
                };
                try
                {
                    Response response = await _usersTableClient.UpdateEntityAsync(updatedEntity, userEntity.ETag);
                    return !response.IsError;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error updating user personal dev environment id for userId:{userId}");
                    return false;
                }
            }
            return false;
        }

        public async Task<UserMemberships> GetUserMemberships(string userId)
        {
            try
            {
                using(var serviceProviderScope = _serviceProvider.CreateScope())
                {
                    IGraphService _graphService = serviceProviderScope.ServiceProvider.GetRequiredService<IGraphService>();
                    List<string> GroupsToCheckMembershipFor = new List<string> { _membershipGroupsConfiguration.TCAConsumers };
                    List<string> GroupsWithUserAsMember = await _graphService.CheckUserMembership(userId, GroupsToCheckMembershipFor);
                    UserMemberships userMemberships = new UserMemberships();
                    userMemberships.IsMemberOfTCAConsumerGroup = GroupsWithUserAsMember.Any(group => group == _membershipGroupsConfiguration.TCAConsumers);
                    return userMemberships;
                }
                
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting user memberships for userId:{userId}");
                return null;
            }
        }

        private async Task<TableEntity> GetUserEntity(string userId)
        {
            NullableResponse<TableEntity> userEntity = await _usersTableClient.GetEntityIfExistsAsync<TableEntity>(ApplicationConstants.UsersPartitionKey, userId);
            if (userEntity.HasValue)
            {
                return userEntity.Value;
            }
            else
            {
                _logger.LogInformation($"User with userId:{userId} not found");
                return null;
            }
        }

        private async Task<UserDetails> AddUserDetails(UserDetails userDetails)
        {
            try
            {
                TableEntity userEntity = new TableEntity(ApplicationConstants.UsersPartitionKey, userDetails.UserId)
                {
                    { "DisplayName", userDetails.DisplayName },
                    { "TeamsNotificationsSubscribed" , userDetails.TeamsNotificationsSubscribed },
                    { "EmailsSubscribed", userDetails.EmailsSubscribed },
                    { "IsFirstVisit", userDetails.IsFirstVisit },
                    { "LastVistTime", DateTime.UtcNow },
                    { "UserId", userDetails.UserId },
                    { "UserEmail", userDetails.UserEmail }
                };
                await _usersTableClient.AddEntityAsync(userEntity);
                _logger.LogInformation($"Added user details for userId:{userDetails.UserId}");
                return userDetails;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error adding user details for userId:{userDetails.UserId}");
                return null;
            }
        }

    }
}
