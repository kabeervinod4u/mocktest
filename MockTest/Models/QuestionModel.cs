using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MockTest.Models
{
    public class GetQuestionDataResponse : BaseModel
    {
        public GetQuestionDataResponse()
        {
            Data = new List<QuestionModel>();
        }
        public List<QuestionModel> Data { get; set; }
    }
    public class QuestionModel
    {
        public int Id { get; set; }
        [Required]
        public string Question { get; set; }
        [Required]
        public int CategoryId { get; set; }
        public string Category { get; set; }
        public string Subject { get; set; }
        public int SubjectId { get; set; }
        public int Index { get; set; }
    }

    public class DataModel
    {
        public string itemname { get; set; }
        public int itemcheck { get; set; }
        public int questionId { get; set; }
    }


    public class AnswerModel
    {
        public int QuestionId { get; set; }
        public string Answer { get; set; }
        public bool IsActive { get; set; }
    }

    public class MainModel
    {
        public QuestionModel Que { get; set; }
        public List<DataModel> Ans { get; set; }
    }

    public class GetQuestion
    {
        public int QuestionId { get; set; }
        public string Question { get; set; }
        public List<GetAnswer> _getAnswer { get; set; }
    }

    public class GetAnswer
    {
        public int AnswerId { get; set; }
        public string Answer { get; set; }
    }
}