using AutomationHub.API.Models;

namespace AutomationHub.API.Managers.Interfaces
{
    public interface IAnnouncementManager
    {
        Task<AnnouncementModel> GetAnnouncement(string env);
    }
}