using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        // GET: api/Exercise
        [HttpGet]
        public ActionResult<List<Exercise>> Get()
        {
            // List<string> myStrings = new List<string>();
            // myStrings.Add("Anne");
            // return myStrings;
            List<Exercise> exercises = DataAccess.GetExercises();
            return Ok(exercises);
        }

        // GET: api/Exercise/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Exercise
        [HttpPost]
        public void Post([FromBody] Exercise value)
        {
            System.Console.WriteLine(value);
            DataAccess.AddExercise(value);
        }

        // PUT: api/Exercise/5
        [HttpPut("{id}")]
        public void Put(int id)
        {
            //System.Console.WriteLine(id);
            DataAccess.PinExercise(id);
        }

        // DELETE: api/Exercise/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            DataAccess.DeleteExercise(id);
        }
    }
}
