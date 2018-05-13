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
    [RoutePrefix("api/ExamDetail")]
    public class ExamDetailController : ApiController
    {
        private readonly ExamDetailBAL _examDetail;

        public ExamDetailController()
        {
            this._examDetail = new ExamDetailBAL();
        }

        [HttpPost]
        [Route("PostDetail/")]
        public IHttpActionResult submitDetail(ExamDetailModel model)
        {
            bool result = false;

            if (ModelState.IsValid)
            {
                result = _examDetail.submitDetail(model);
            }
            return Ok(result);
        }


        [HttpGet]
        [Route("TestInfo/")]
        public GetExamDetailResponce getQuestionList()
        {

            GetExamDetailResponce result = new GetExamDetailResponce();
            result.Data = _examDetail.GetExamDetails();

            return result;


        }
    }
}

