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
    
    public partial class tbl_role
    {
        public tbl_role()
        {
            this.tbl_user_in_roles = new HashSet<tbl_user_in_roles>();
        }
    
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    
        public virtual ICollection<tbl_user_in_roles> tbl_user_in_roles { get; set; }
    }
}
