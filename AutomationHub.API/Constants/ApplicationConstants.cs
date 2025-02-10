namespace AutomationHub.API.Constants
{
    public static class ApplicationConstants
    {
        public const string FailResponseStatus = "fail";

        public const string SuccessResponseStatus = "success";

        public const string CardsPartitionKey = "card";

        public const string CategoriesPartitionKey = "category";

        public const string UsersPartitionKey = "user";

        public const string AnnouncementPartitionKey = "announcement";

        public enum CardStatus : int { Active = 1, Inactive = 0 };
        public enum SectionStatus : int { Active = 1, Inactive = 0 };
    }
}
