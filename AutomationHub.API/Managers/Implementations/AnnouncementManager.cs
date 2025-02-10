using AutomationHub.API.Constants;
using AutomationHub.API.Extensions;
using AutomationHub.API.Managers.Interfaces;
using AutomationHub.API.Models;
using AutomationHub.API.Providers.Interfaces;
using Azure;
using Azure.Data.Tables;

namespace AutomationHub.API.Managers.Implementations
{
    public class AnnouncementManager : IAnnouncementManager
    {

        private readonly TableClient _announcementTableClient;
        private readonly ILogger<AnnouncementManager> _logger;

        public AnnouncementManager(ITableStorageProvider tableStorageProvider, ILogger<AnnouncementManager> logger)
        {
            _announcementTableClient = tableStorageProvider.GetAnnouncementsTableClient();
            _logger = logger;
        }

        public async Task<AnnouncementModel> GetAnnouncement(string env)
        {
            try
            {
                string searchQuery = $"PartitionKey eq '{ApplicationConstants.AnnouncementPartitionKey}'";
                
                AsyncPageable<TableEntity> result = _announcementTableClient.QueryAsync<TableEntity>(filter: searchQuery);
                List<TableEntity> announcementData = await result.ToList();
                List<AnnouncementModel> announcements = announcementData.toAnnouncementsModel();
                return announcements.Any() ? announcements[0] : null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting all cards for env:{env}");
                return null;
            }
        }
    }
}
