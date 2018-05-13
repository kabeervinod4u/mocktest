using MockTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MockTest.BAL
{

    public class ExamDetailBAL
    {
        public bool submitDetail(ExamDetailModel model)
        {
            return new DAL.ExamDetailDAL().submitDetail(model);
        }

        public List<ExamDetailModel> GetExamDetails()
        {
            return new DAL.ExamDetailDAL().GetExamDetails();
        }
    }
}