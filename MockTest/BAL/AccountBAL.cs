using MockTest.DAL;
using MockTest.Models;
using MockTest.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace MockTest.BAL
{
    public class AccountBAL
    {
        public int getLoginDetail(string UserName, string Password)
        {
           return new DAL.AccountDAL().getLoginDetail(UserName, Password);
        }

        public int getUserRole(string UseId)
        {
            return new DAL.AccountDAL().getUserRole(UseId);
        }


        public bool Register(RegisterModel model)
        {
            return new DAL.AccountDAL().Register(model);
        }

        public bool vaildEmail(string email)
        {
            return new DAL.AccountDAL().vaildEmail(email);
        }
    }
}