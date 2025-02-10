using AutomationHub.API.Models;

namespace AutomationHub.API.Providers.Interfaces
{
    public interface ISemanticKernelProvider
    {
        Task<string[]> SearchCardsFromUserPrompt(string prompt, List<CardsModel> cards);
    }
}