using MockTest.BAL;
using MockTest.Models;
using MockTest.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MockTest.Controllers
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private readonly AccountBAL _account;

        public AccountController()
        {
            this._account = new AccountBAL();
        }

        [HttpGet]
         [Route("Login/")]
        public IHttpActionResult Login(string UserName, string Password)
        {
            if (ModelState.IsValid)
            {
                var IsValid = _account.getLoginDetail(UserName, Password);
                if (IsValid == (int)login.notVerifiedYet)
                    return Ok("Your registerd mail Id is not verified yet.Kindly Verify Mail-Id.");
                else if (IsValid == (int)login.wrongCredentials)
                    return Ok("Incorrect username and password.");
                else
                    return Ok(IsValid);
            }
            return Ok("Model / Input parameters are not valid");
        }

        [HttpPost]
        [Route("Register/")]
        public IHttpActionResult Register(RegisterModel model)
        {
            bool result = false;

            if (ModelState.IsValid)
            {
                result = _account.Register(model);
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("ValidateEmail/")]
        public IHttpActionResult ValidateEmail(string email)
        {
            var IsValid = _account.vaildEmail(email);
            if (IsValid)
            {
                return Ok(IsValid);
            }
            else
            {
                return Ok(IsValid);
            }
        }
    }
}
