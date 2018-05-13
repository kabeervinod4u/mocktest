using MockTest.BAL;
using MockTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MockTest.Controllers
{
    [RoutePrefix("api/Question")]
    public class QuestionController : ApiController
    {
        private readonly QuestionBAL _que;

        public QuestionController()
        {
            this._que = new QuestionBAL();
        }

        [HttpGet]
        [Route("QuestionList/")]
        public GetQuestionDataResponse getQuestionList()
        {
            GetQuestionDataResponse result = new GetQuestionDataResponse();
            result.Data = _que.getQuestionList();
            return result;
        }

        [HttpPost]
        [Route("CreateQuestion")]
        public IHttpActionResult CreateQuestion(MainModel model)
        {
            if (ModelState.IsValid)
            {
                int questionId = _que.InsertQuestion(model.Que);
                _que.InsertAnswer(model.Ans, questionId);

            }
            return Ok();
        }

        [HttpGet]
        [Route("getCategoryById")]
        public List<CategoryModel> getCategoryById(int? Id)
        {
            return _que.getCategoryDetail(Id.Value);
        }

        [HttpGet]
        [Route("getAnswer/")]
        public List<DataModel> getAnswer(int? Id)
        {
            List<DataModel> ans = _que.getAnswerList(Id.Value).Select(p => new DataModel() { itemcheck = p.IsActive == false ? 0 : 1, itemname = p.Answer }).ToList();
            return ans;
        }

        [HttpGet]
        [Route("QuestionListForExam/")]
        public List<QuestionModel> QuestionListForExam()
        {
            return _que.QuestionListForExam();
        }

        [HttpGet]
        [Route("getQuestionDetail/")]
        public GetQuestion getQuestionDetail(int Id)
        {
            return _que.getQuestionDetail(Id);
        }
    }
}
