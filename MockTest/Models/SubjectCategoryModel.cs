using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MockTest.Models
{
    public class SubjectCategoryModel
    {

    }


    public class GetSubjectDataResponse : BaseModel
    {
        public GetSubjectDataResponse()
        {
            Data = new List<SubjectModel>();
        }
        public List<SubjectModel> Data { get; set; }
    }
    public class SubjectModel
    {
        public int Id { get; set; }
        [Required]
        public string Subject { get; set; }
        public bool IsActive { get; set; }
    }


    public class GetCategoryDataResponse : BaseModel
    {
        public GetCategoryDataResponse()
        {
            Data = new List<CategoryModel>();
        }
        public List<CategoryModel> Data { get; set; }
    }
    public class CategoryModel
    {
        public int Id { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public int SubjectId { get; set; }
        public string Subject { get; set; }
    }
}