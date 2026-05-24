namespace commands_signal_r.Models
{
    public class FunctionModel
    {
        public int Id { get; set; }
        public string FunctionName { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public int SessionId { get; set; }
        public DateTime CreatedAt { get; set; }
        public SessionModel Session { get; set; } = null!;
        public ICollection<CommandModel> Commands { get; set; } = new List<CommandModel>();

    }
}
