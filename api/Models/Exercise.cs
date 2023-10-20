namespace api.Models
{
    public class Exercise
    {
        public int exerciseId {get; set;}

        public string activityType {get; set;}
        public double distance {get; set;}
        public DateTime dateCompleted {get; set;}
        public bool pinned {get; set;}
        public bool deleted {get; set;}
        
    }
}