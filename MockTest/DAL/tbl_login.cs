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
    
    public partial class tbl_login
    {
        public tbl_login()
        {
            this.tbl_examtest_info = new HashSet<tbl_examtest_info>();
            this.tbl_user_in_roles = new HashSet<tbl_user_in_roles>();
        }
    
        public string Password { get; set; }
        public System.Guid tbl_registration_RegistrationId { get; set; }
        public int Id { get; set; }
        public string Username { get; set; }
    
        public virtual ICollection<tbl_examtest_info> tbl_examtest_info { get; set; }
        public virtual ICollection<tbl_user_in_roles> tbl_user_in_roles { get; set; }
        public virtual tbl_registration tbl_registration { get; set; }
    }
}
