using System;
using System.Collections.Generic;
using System.Linq;using System.Linq.Dynamic;
using System.Web;
using System.Web.Mvc;

namespace DataTableExample.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Testing()
        {
            return View();
        }
        //Server side sorting, paging and searching with data table
        public JsonResult GetTableData(DataTableModel searchdata)
        {
            SearchModel<SearchData> modelList = new SearchModel<SearchData>();
            
            if (Request.Form["order[0][column]"] != null)
            {
                searchdata.sortColumn = Request.Form["order[0][column]"];
            }
            if (Request.Form["order[0][dir]"] != null)
            {
                searchdata.sortDirection = Request.Form["order[0][dir]"];
            }
            //switch (searchdata.sortColumn)
            //{
            //    case "0":
            //        searchdata.sortColumn = "Name";
            //        break;
            //    case "1":
            //        searchdata.sortColumn = "Title";
            //        break;
            //}
            List<SearchData> data = new List<SearchData> {
                new SearchData{ Name="Alpesh",Title="Developer"},
                new SearchData{ Name="Testting1",Title="testing1"},
                new SearchData{ Name="Testting1",Title="testing1"},
                new SearchData{ Name="Testting1",Title="testing1"},
                new SearchData{ Name="Testting1",Title="testing1"},
                new SearchData{ Name="Testting1",Title="testing1"},
                new SearchData{ Name="Testting1",Title="testing1"},
                new SearchData{ Name="Testting1",Title="testing1"},
                new SearchData{ Name="Testting1",Title="testing1"},
                new SearchData{ Name="Testting1",Title="testing1"},
                new SearchData{ Name="Testting1",Title="testing1"},
                new SearchData{ Name="Testting1",Title="testing1"},
                new SearchData{ Name="Testting1",Title="testing1"},
                new SearchData{ Name="Testting1",Title="testing1"},
                new SearchData{ Name="Testting1",Title="testing1"},
                new SearchData{ Name="Testting1",Title="testing1"},
                new SearchData{ Name="Testting1",Title="testing1"},
                new SearchData{ Name="Testting1",Title="testing1"},

            };
            
            if (!string.IsNullOrEmpty(searchdata.search))
            {
                data = data.Where(x => x.Name.ToLower().IndexOf(searchdata.search.ToLower()) > -1 || x.Title.ToLower().IndexOf(searchdata.search.ToLower()) > -1).ToList();
            }

            data = data.OrderBy(searchdata.data + " " + searchdata.sortDirection).ToList();
            modelList.data = data.Skip(searchdata.start).Take(searchdata.length).ToList();
            modelList.recordsFiltered = data.Count();
            modelList.recordsTotal = data.Count();
            modelList.draw = searchdata.draw;
            
            return Json(modelList, JsonRequestBehavior.AllowGet);
        }

        public class SearchModel<T> where T : class {
            public List<T> data { get; set; }
            public int draw { get; set; }
            public int recordsTotal { get; set; }
            public int recordsFiltered { get; set; }
        }
        public class SearchData {
            public string Name { get; set; }
            public string Title { get; set; }
        }

        public class DataTableModel {
            //Here you can declare property like if we required property IsActive etc
            //here i have taken id for testing purpose
            public string data { get; set; }
            public int id { get; set; }
            public int start { get; set; }
            public int length { get; set; }
            public int draw { get; set; }
            public string search { get; set; }
            public string sortDirection { get; set; }
            public string sortColumn { get; set; }
        }
    }
}