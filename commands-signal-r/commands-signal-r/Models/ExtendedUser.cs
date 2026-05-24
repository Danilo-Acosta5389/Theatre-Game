using Microsoft.AspNetCore.Identity;

namespace commands_signal_r.Models
{
    //ExtendedUser extends IdentityUser which comes from the nuget packege AspNetCore.Identity
    //Identity handles all user properties - such as UserName, Email, Password and so on...
    //ExtendedUser class will contain properties that are not standard, like if the user is premium user or something else.
    public class ExtendedUser : IdentityUser
    {
        public bool IsPremium { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
