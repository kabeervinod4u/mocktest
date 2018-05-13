using MockTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MockTest.BAL
{
    public class SubjectCategoryBAL
    {
        #region Subject
        public int InsertSubject(SubjectModel model)
        {
            return new DAL.SubjectCategoryDAL().InsertSubject(model);
        }
        public bool ActiveInActive(int Id)
        {
            return new DAL.SubjectCategoryDAL().ActiveInActive(Id);
        }
        public List<SubjectModel> getSubjectList()
        {
            return new DAL.SubjectCategoryDAL().getSubjectList();
        }

        public SubjectModel getSubjectDetail(int Id)
        {
            return new DAL.SubjectCategoryDAL().getSubjectDetail(Id);
        }

        public bool DaleteSubject(int Id)
        {
            return new DAL.SubjectCategoryDAL().DeleteSubject(Id);
        }

        #endregion

        #region Category

        public int InsertCategory(CategoryModel model)
        {
            return new DAL.SubjectCategoryDAL().InsertCategory(model);
        }

        public List<CategoryModel> getCategoryList()
        {
            return new DAL.SubjectCategoryDAL().getCategoryList();
        }

        public CategoryModel getCategoryDetail(int Id)
        {
            return new DAL.SubjectCategoryDAL().getCategoryDetail(Id);
        }

        public bool DaleteCategory(int Id)
        {
            return new DAL.SubjectCategoryDAL().DeleteCategory(Id);
        }

        #endregion
    }
}