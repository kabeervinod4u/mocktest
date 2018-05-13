using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MockTest.Models
{
    public class RegisterModel
    {
        public Guid RegistrationId { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [RegularExpression(@"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}", ErrorMessage = "Not a valid Emailid !")]
        public string EmailId { get; set; }

        [Required]
        [StringLength(11, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 10)]
        [RegularExpression(@"[0-9]{1,11}", ErrorMessage = "Not a valid mobile number !")]
        [DataType(DataType.PhoneNumber)]
        public string Mobile { get; set; }

        [Required]
        [StringLength(15, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 4)]
        public string UserName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match !")]
        public string ConfirmPassword { get; set; }
    }
}