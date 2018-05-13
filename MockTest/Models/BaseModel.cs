using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MockTest.Models
{
    public class BaseModel
    {

    }

    public enum ResponseStatus
    {
        Success = 0,
        Faild = 1
    }

    public class ResponseBase
    {
        public ResponseBase()
        {
            Status = ResponseStatus.Success;
            Message = ResponseStatus.Success.ToString();
            ErrorDescription = string.Empty;
        }

        [Required]
        public ResponseStatus Status { get; set; }

        [Required]
        public string ErrorDescription { get; set; }

        [Required]
        public string Message { get; set; }

    }
}