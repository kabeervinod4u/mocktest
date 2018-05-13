using MockTest.Models;
using MockTest.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace MockTest.DAL
{
    public class AccountDAL
    {
        private readonly MockTestDBEntities db = new MockTestDBEntities();

        public int getLoginDetail(string UserName, string Password)
        {
            try
            {
                var isValid = db.tbl_login.FirstOrDefault(x => x.Username == UserName && x.Password == Password);
                if (isValid != null)
                {
                    var isVerified = db.tbl_verification_info.Where(m => m.RegistrationId.Equals(isValid.tbl_registration_RegistrationId) && m.IsVerify.Equals(true)).FirstOrDefault();
                    if (isVerified != null)
                    {
                        var Roles = db.tbl_user_in_roles.FirstOrDefault(x => x.UserId == isValid.Id);
                        return Roles.RoleId;
                    }
                    else
                    {
                        return (int)login.notVerifiedYet;//"Your registerd mail Id is not verified yet.Kindly Verify Mail-Id.";
                    }
                }
                else
                {
                    return (int)login.wrongCredentials;//"Incorrect username and password.";
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public int getUserRole(string UseId)
        {
            int id = Convert.ToInt32(UseId);
            var allRoles = db.tbl_user_in_roles;
            return allRoles.FirstOrDefault(z => z.UserId == id).RoleId;
        }

        public bool vaildEmail(string email)
        {
            // tbl_registration obj = new tbl_registration();
            try
            {
                var isValidEmail = db.tbl_registration.FirstOrDefault(x => x.EmailId == email);
                if (isValidEmail != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public bool Register(RegisterModel model)
        {
            try
            {
                string websiteurl = System.Configuration.ConfigurationManager.AppSettings["websiteurl"].ToString();
                string verificationCode = CommonMethod.getRandomString();
                string verificationLink = websiteurl + "Account/VerifyExistingUser?userbeingverified=HelloVerifyme~" + verificationCode + "~ThanksVerifyme~" + model.EmailId;
                bool IsMsgSend = CommonMethod.SendMail(model.EmailId, "Verification Mail By Mock Test", verificationLink);
                if (IsMsgSend)
                {

                    Guid RegId = Guid.NewGuid();
                    model.RegistrationId = RegId;

                    tbl_registration objReg = new tbl_registration();
                    objReg.RegistrationId = model.RegistrationId;
                    objReg.FirstName = model.FirstName.Trim();
                    objReg.LastName = model.LastName.Trim();
                    objReg.EmailId = model.EmailId.Trim();
                    objReg.Mobile = model.Mobile.Trim();
                    objReg.UserName = model.UserName.Trim();
                    db.tbl_registration.Add(objReg);


                    tbl_login objLogin = new tbl_login();
                    objLogin.Username = model.UserName.Trim();
                    objLogin.Password = model.Password.Trim();
                    objLogin.tbl_registration_RegistrationId = RegId;
                    db.tbl_login.Add(objLogin);
                    db.SaveChanges();

                    tbl_user_in_roles objUserinRoles = new tbl_user_in_roles();
                    objUserinRoles.RoleId = 2;
                    objUserinRoles.UserId = objLogin.Id;
                    db.tbl_user_in_roles.Add(objUserinRoles);

                    tbl_verification_info objVerification_info = new tbl_verification_info();
                    objVerification_info.RegistrationId = model.RegistrationId;
                    objVerification_info.LinkGenerateDate = DateTime.Now;
                    objVerification_info.VerificationLink = verificationLink;
                    objVerification_info.VerificationCode = verificationCode;
                    objReg.tbl_verification_info.Add(objVerification_info);
                    db.tbl_verification_info.Add(objVerification_info);

                    db.SaveChanges();

                    return true;
                }
                else { return false; }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}