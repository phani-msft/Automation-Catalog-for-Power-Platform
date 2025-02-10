using AutomationHub.API.Models;

namespace AutomationHub.API.Managers.Interfaces
{
    public interface ICatalogDataManager
    {
        Task<List<SolutionTemplateCardModel>> GetAllItems(string envName);

        Task<string[]> SearchCards(SearchCardsRequestModel searchCardsRequestModel);
    }
}