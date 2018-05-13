using MockTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MockTest.BAL
{
    public class QuestionBAL
    {
        public int InsertQuestion(QuestionModel model)
        {
            return new DAL.QuestionDAL().InsertQuestion(model);
        }

        public List<QuestionModel> getQuestionList()
        {
            return new DAL.QuestionDAL().getQuestionList();
        }

        public List<CategoryModel> getCategoryDetail(int Id)
        {
            return new DAL.QuestionDAL().getCategoryDetail(Id);
        }

        public int InsertAnswer(List<DataModel> model, int questionId)
        {
            return new DAL.QuestionDAL().InsertAnswer(model, questionId);
        }

        public List<AnswerModel> getAnswerList(int Id)
        {
            return new DAL.QuestionDAL().getAnswerList(Id);
        }

        public List<QuestionModel> QuestionListForExam()
        {
            return new DAL.QuestionDAL().QuestionListForExam();
        }

        public GetQuestion getQuestionDetail(int Id)
        {
            return new DAL.QuestionDAL().getQuestionDetail(Id);
        }
    }
}