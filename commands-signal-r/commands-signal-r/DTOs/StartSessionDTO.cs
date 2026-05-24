namespace commands_signal_r.DTOs
{
    public class StartSessionDTO
    {
            public string SessionId { get; set; } = "";
            public bool IsLoggedIn { get; set; }
            public bool IsActor { get; set; }
            public string FunctionName { get; set; } = "";
    }
}
