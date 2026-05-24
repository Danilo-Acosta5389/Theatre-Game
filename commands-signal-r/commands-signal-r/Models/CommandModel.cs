using Microsoft.EntityFrameworkCore;

namespace commands_signal_r.Models
{
    public class CommandModel
    {
        public int Id { get; set; }
        public string CommandText { get; set; } = string.Empty;
        public int RoleId { get; set; }
        public int FunctionId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public int SessionId { get; set; }
        public DateTime CreatedAt { get; set; }
        public RoleModel Role { get; set; } = null!;
        public FunctionModel Function { get; set; } = null!;
        public SessionModel Session { get; set; } = null!;
        
    }
}
