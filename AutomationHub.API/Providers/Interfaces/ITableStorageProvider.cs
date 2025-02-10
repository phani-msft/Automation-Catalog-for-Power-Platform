using Azure.Data.Tables;

namespace AutomationHub.API.Providers.Interfaces
{
    public interface ITableStorageProvider
    {
        TableClient GetCardsTableClient();
        TableClient GetUsersTableClient();
        TableClient GetAnnouncementsTableClient();
    }
}