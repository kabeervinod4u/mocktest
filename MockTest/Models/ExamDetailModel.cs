using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MockTest.Models
{
    public class GetExamDetailResponce : BaseModel
    {
        public GetExamDetailResponce()
        {
            Data = new List<ExamDetailModel>();
        }
        public List<ExamDetailModel> Data { get; set; }
    }

    public class ExamDetailModel
    {
        public int Id { get; set; }
        public string EmailId { get; set; }
        public int SubjectId { get; set; }
        public int CategoryId { get; set; }
        public int TestDuration { get; set; }
        public DateTime CreatedDate { get; set; }

        public string Subject { get; set; }

        public string Category { get; set; }
    }
}