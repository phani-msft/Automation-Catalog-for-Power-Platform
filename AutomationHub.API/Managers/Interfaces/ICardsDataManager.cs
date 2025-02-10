using AutomationHub.API.Models;

namespace AutomationHub.API.Managers.Interfaces
{
    public interface ICardsDataManager
    {
        Task<List<CardsModel>> GetAllCards(string env);
        Task<string[]> SearchCards(SearchCardsRequestModel searchCardsRequestModel);
        Task UpdateClickCount(string cardUniqueName);
    }
}