namespace commands_signal_r.Models
{
    public class SessionModel
    {
        public int Id { get; set; }
        public string PublicId { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string SessionMasterId { get; set; } = string.Empty;
        public ICollection<RoleModel> Roles { get; set; } = new List<RoleModel>();
        public ICollection<FunctionModel> Functions { get; set; } = new List<FunctionModel>();
        public ICollection<CommandModel> Commands { get; set; } = new List<CommandModel>();
    }
}

