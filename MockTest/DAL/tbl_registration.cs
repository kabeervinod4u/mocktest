//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MockTest.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbl_registration
    {
        public tbl_registration()
        {
            this.tbl_login = new HashSet<tbl_login>();
            this.tbl_verification_info = new HashSet<tbl_verification_info>();
        }
    
        public int Id { get; set; }
        public System.Guid RegistrationId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string EmailId { get; set; }
        public string Mobile { get; set; }
    
        public virtual ICollection<tbl_login> tbl_login { get; set; }
        public virtual ICollection<tbl_verification_info> tbl_verification_info { get; set; }
    }
}
