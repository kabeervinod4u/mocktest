using MockTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MockTest.DAL
{
    public class QuestionDAL
    {
        private readonly MockTestDBEntities db = new MockTestDBEntities();

        public int InsertQuestion(QuestionModel model)
        {
            try
            {
                var result = db.tbl_questions.FirstOrDefault(x => x.Id == model.Id);
                if (result != null)
                {
                    result.SubCategoryId = model.CategoryId;
                    result.Question = model.Question;
                    db.SaveChanges();

                    return result.Id;
                }
                else
                {
                    tbl_questions que = new tbl_questions();
                    que.SubCategoryId = model.CategoryId;
                    que.Question = model.Question;
                    db.tbl_questions.Add(que);
                    db.SaveChanges();

                    return que.Id;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<QuestionModel> getQuestionList()
        {
            var Result = (from a in db.tbl_questions
                          join b in db.tbl_subjectCategory on a.SubCategoryId equals b.Id
                          join c in db.tbl_subjectMaster on b.SubjectId equals c.Id
                          select new { a, b, c }).Select(x => new QuestionModel
                          {
                              Id = x.a.Id,
                              Question = x.a.Question,
                              CategoryId = x.a.SubCategoryId,
                              Category = x.b.SubjectCategory,
                              Subject = x.c.SubjectName,
                              SubjectId = x.c.Id
                          }).ToList();
            return Result;
        }

        public List<CategoryModel> getCategoryDetail(int Id)
        {
            var Result = db.tbl_subjectCategory.Where(x => x.SubjectId == Id).Select(x => new CategoryModel
            {
                Id = x.Id,
                Category = x.SubjectCategory,
            }).ToList();

            return Result;
        }

        public int InsertAnswer(List<DataModel> model, int questionId)
        {
            var IsPresent = db.tbl_answers.Where(x => x.QuestionId == questionId).ToList();
            if (IsPresent != null && IsPresent.Count > 0)
            {
                foreach (var d in IsPresent)
                {
                    db.tbl_answers.Remove(d);
                }
                db.SaveChanges();
            }
            foreach (var item in model)
            {
                tbl_answers ans = new tbl_answers();
                ans.Answer = item.itemname;
                ans.IsRight = item.itemcheck == 0 ? false : true;
                ans.QuestionId = questionId;
                db.tbl_answers.Add(ans);
            }
            db.SaveChanges();


            return 0;
        }

        public List<AnswerModel> getAnswerList(int Id)
        {
            var Result = db.tbl_answers.Where(x => x.QuestionId == Id).Select(x => new AnswerModel
            {
                Answer = x.Answer,
                QuestionId = x.QuestionId,
                IsActive = x.IsRight
            }).ToList();

            return Result;
        }

        public List<QuestionModel> QuestionListForExam()
        {
            var result = db.tbl_questions.ToList().Select((x, index) => new QuestionModel
            {
                Id = x.Id,
                Index = index + 1,
            }).ToList();

            return result;
        }

        public GetQuestion getQuestionDetail(int Id)
        {
            var result = db.tbl_questions.Where(x => x.Id == Id).AsEnumerable().Select(x => new GetQuestion
            {
                QuestionId = x.Id,
                Question = x.Question,
                _getAnswer = db.tbl_answers.Where(y => y.QuestionId == x.Id).Select(y => new GetAnswer
                {
                    AnswerId = y.Id,
                    Answer = y.Answer,
                }).ToList(),
            }).FirstOrDefault();

            return result;
        }
    }
}