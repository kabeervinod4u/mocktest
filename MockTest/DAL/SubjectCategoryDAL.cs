using MockTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MockTest.DAL
{
    public class SubjectCategoryDAL
    {
        private readonly MockTestDBEntities db = new MockTestDBEntities();


        #region Subject
        public int InsertSubject(SubjectModel model)
        {
            try
            {
                var result = db.tbl_subjectMaster.FirstOrDefault(x => x.Id == model.Id);
                if (result != null)
                {
                    result.SubjectName = model.Subject;
                    db.SaveChanges();

                    return 0;
                }
                else
                {
                    tbl_subjectMaster sub = new tbl_subjectMaster();
                    sub.SubjectName = model.Subject;
                    sub.IsActive = true;
                    db.tbl_subjectMaster.Add(sub);
                    db.SaveChanges();

                    return sub.Id;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool ActiveInActive(int Id)
        {
            try
            {
                var result = db.tbl_subjectMaster.FirstOrDefault(x => x.Id == Id);
                if (result != null)
                {
                    result.IsActive = !result.IsActive;
                    db.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception ex) { throw ex; }
        }

        public List<SubjectModel> getSubjectList()
        {
            var Result = db.tbl_subjectMaster.Select(x => new SubjectModel
            {
                Id = x.Id,
                Subject = x.SubjectName,
                IsActive = x.IsActive.Value
            }).ToList();
            return Result;
        }

        public SubjectModel getSubjectDetail(int Id)
        {
            var Result = db.tbl_subjectMaster.Where(x => x.Id == Id).Select(x => new SubjectModel
            {
                Id = x.Id,
                Subject = x.SubjectName,
                IsActive = x.IsActive.Value
            }).FirstOrDefault();

            return Result;
        }

        public bool DeleteSubject(int Id)
        {
            try
            {
                var data = db.tbl_subjectMaster.FirstOrDefault(x => x.Id == Id);
                if (data != null)
                {
                    db.tbl_subjectMaster.Remove(data);
                    db.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        #endregion

        #region Category

        public int InsertCategory(CategoryModel model)
        {
            try
            {
                var result = db.tbl_subjectCategory.FirstOrDefault(x => x.Id == model.Id);
                if (result != null)
                {
                    result.SubjectId = model.SubjectId;
                    result.SubjectCategory = model.Category;
                    db.SaveChanges();

                    return 0;
                }
                else
                {
                    tbl_subjectCategory cat = new tbl_subjectCategory();
                    cat.SubjectId = model.SubjectId;
                    cat.SubjectCategory = model.Category;
                    db.tbl_subjectCategory.Add(cat);
                    db.SaveChanges();

                    return cat.Id;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<CategoryModel> getCategoryList()
        {
            var Result = (from a in db.tbl_subjectCategory
                          join b in db.tbl_subjectMaster on a.SubjectId equals b.Id
                          select new { a, b }).Select(x => new CategoryModel
                          {
                              Id = x.a.Id,
                              SubjectId = x.a.SubjectId,
                              Category = x.a.SubjectCategory,
                              Subject = x.b.SubjectName
                          }).ToList();
            return Result;
        }

        public CategoryModel getCategoryDetail(int Id)
        {
            var Result = (from a in db.tbl_subjectCategory
                          join b in db.tbl_subjectMaster on a.SubjectId equals b.Id
                          select new { a, b }).Where(x => x.a.Id == Id).Select(x => new CategoryModel
                          {
                              Id = x.a.Id,
                              SubjectId = x.a.SubjectId,
                              Category = x.a.SubjectCategory,
                              Subject = x.b.SubjectName
                          }).FirstOrDefault();

            return Result;
        }

        public bool DeleteCategory(int Id)
        {
            var data = db.tbl_subjectCategory.FirstOrDefault(x => x.Id == Id);
            if (data != null)
            {
                db.tbl_subjectCategory.Remove(data);
                db.SaveChanges();
                return true;
            }
            return false;
        }
        #endregion
    }
}