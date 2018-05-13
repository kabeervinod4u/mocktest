using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MockTest.Utility
{
    public class CommonMethod
    {
        public static bool SendMail(string toAddress, string subject, string body, string attachment = null)
        {
            Boolean rt = true;
            try
            {
                //SmtpClient objSmtpClient = new SmtpClient();

                //MailAddress FromAddress = new MailAddress(System.Configuration.ConfigurationManager.AppSettings["SMTPFromEmail"]);
                //string pass = System.Configuration.ConfigurationManager.AppSettings["SMTPpassword"];

                //using (MailMessage objMail = new MailMessage())
                //{
                //    objMail.From = FromAddress;
                //    objMail.To.Add(toAddress);
                //    objMail.Subject = subject;
                //    objMail.Body = body;
                //    objMail.IsBodyHtml = true;

                //    if (attachment != null)
                //    {
                //        Attachment objAttachment = new Attachment(Path.GetFullPath(attachment));
                //        objMail.Attachments.Add(objAttachment);
                //    }

                //    objSmtpClient.Host = "smtp.gmail.com";
                //    objSmtpClient.Port = 25;
                //    objSmtpClient.EnableSsl = true;
                //    objSmtpClient.Credentials = new NetworkCredential(FromAddress.ToString(), pass);
                //    objSmtpClient.Send(objMail);

                //}
            }
            catch (Exception ex)
            {

                rt = false;
            }
            return rt;

        }

        public static string getRandomString()
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[8];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            var finalString = new String(stringChars);
            return finalString;
        }
    }
}