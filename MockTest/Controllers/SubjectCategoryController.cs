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
    [RoutePrefix("api/Subject")]
    public class SubjectCategoryController : ApiController
    {
        private readonly SubjectCategoryBAL _sub;

        public SubjectCategoryController()
        {
            this._sub = new SubjectCategoryBAL();
        }

        #region Subject

        [HttpGet]
        [Route("SubjectList/")]
        public GetSubjectDataResponse SubjectList()
        {
            GetSubjectDataResponse result = new GetSubjectDataResponse();
            result.Data = _sub.getSubjectList();
            return result;
        }

        [HttpGet]
        [Route("SubjectDetail/")]
        public SubjectModel SubjectDetail(int Id)
        {
            return _sub.getSubjectDetail(Id);
        }

        [HttpPost]
        [Route("CreateSubject/")]
        public IHttpActionResult CreateSubject(SubjectModel model)
        {
            if (ModelState.IsValid)
            {
                var IsValid = _sub.InsertSubject(model);
                if (IsValid > 0)
                {
                    return Ok("Create Successfully");
                }
                else
                {
                    return Ok("Update Successfully");
                }
            }
            return Ok("Error");
        }

        [HttpPost]
        [Route("ActiveInActive/")]
        public bool ActiveInActive(int Id)
        {
            return _sub.ActiveInActive(Id);
        }

        #endregion

        #region Category

        [HttpGet]
        [Route("CategoryList/")]
        public GetCategoryDataResponse CategoryList()
        {
            GetCategoryDataResponse result = new GetCategoryDataResponse();
            result.Data = _sub.getCategoryList();
            return result;
        }

        [HttpGet]
        [Route("CategoryDetail/")]
        public CategoryModel CategoryDetail(int? Id)
        {
            return _sub.getCategoryDetail(Id.Value);
        }

        [HttpPost]
        [Route("CreateCategory/")]
        public IHttpActionResult CreateCategory(CategoryModel model)
        {
            if (ModelState.IsValid)
            {
                var IsValid = _sub.InsertCategory(model);
            }
            return Ok("");
        }

        [HttpDelete]
        [Route("DeleteCategory/")]
        public bool DeleteCategory(int Id)
        {
            return _sub.DaleteCategory(Id);
        }

        #endregion


    }
}
