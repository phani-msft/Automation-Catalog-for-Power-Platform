using Newtonsoft.Json;

namespace AutomationHub.API.Models
{
    public class SolutionTemplateCardModel
    {
        [JsonProperty("mspcat_tpsid")]
        public string SolutionTemplateUniqueId{ get; set; }

        [JsonProperty("mspcat_applicationsid")]
        public string SolutionTemplateVersionId { get; set; }

        [JsonProperty("mspcat_name")]
        public string CardTitle { get; set; }

        [JsonProperty("mspcat_description")]
        public string CardDescription { get; set; }

        private string _cardImageUrl = "https://imageassetssa.z5.web.core.windows.net/images/detailedViewPlaceholder.png";
        public string CardImageUrl
        {
            get => _cardImageUrl;
            set => _cardImageUrl = value;
        }

        public string CardVideoUrl { get; set; }

        private string _cardIconUrl = "https://imageassetssa.z5.web.core.windows.net/images/task.png";
        public string CardIconUrl { 
            get => _cardIconUrl;
            set => _cardIconUrl = value;
        }

        private bool _isFeatured = true;
        public bool IsFeatured
        {
            get => _isFeatured;
            set => _isFeatured = value;
        }

        private string _cardCategory = "General";
        public string CardCategory
        {
            get => _cardCategory;
            set => _cardCategory = value;
        }

        private int _noOfClicks = 0;
        public int NoOfClicks
        {
            get => _noOfClicks;
            set => _noOfClicks = value;
        }

        private bool _isNew = false;
        public bool IsNew
        {
            get => _isNew;
            set => _isNew = value;
        }
    }
}
