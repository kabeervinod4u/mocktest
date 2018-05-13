using MockTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MockTest.DAL
{
    public class ExamDetailDAL
    {
        private readonly MockTestDBEntities db = new MockTestDBEntities();

        public bool submitDetail(ExamDetailModel model)
        {
            try
            {
                if (model != null)
                {
                    tbl_ExamDetail objTest = new tbl_ExamDetail();
                    objTest.EmailId = model.EmailId;
                    objTest.SubjectId = model.SubjectId;
                    objTest.CategoryId = model.CategoryId;
                    objTest.TestDuration = model.TestDuration;
                    objTest.Createdate = DateTime.Now;
                    db.tbl_ExamDetail.Add(objTest);
                    db.SaveChanges();

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


        public List<ExamDetailModel> GetExamDetails()
        {
            var Result = (from a in db.tbl_ExamDetail
                          join b in db.tbl_subjectCategory on a.CategoryId equals b.Id
                          join c in db.tbl_subjectMaster on b.SubjectId equals c.Id
                          select new { a, b, c }).Select(x => new ExamDetailModel
                          {
                              EmailId = x.a.EmailId,
                              SubjectId = x.a.SubjectId,
                              CategoryId = x.a.CategoryId,
                              TestDuration = x.a.TestDuration,
                              Category = x.b.SubjectCategory,
                              Subject = x.c.SubjectName,
                          }).ToList();
            return Result;
        }

    }
}
