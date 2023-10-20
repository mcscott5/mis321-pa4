namespace api;
using MySql.Data.MySqlClient;
using System.Collections.Generic;
using System.Data;
using api.Models;


    public class DataAccess
    {
        public static List<Exercise> GetExercises()
    {
        ConnectionString cs = new ConnectionString();
        string con = cs.cs;
        using (MySqlConnection connection = new MySqlConnection(con))
        {
            connection.Open();

            using (MySqlCommand command = new MySqlCommand("SELECT * FROM Exercises", connection))
            {
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    List<Exercise> exercises = new List<Exercise>();
                    while (reader.Read())
                    {
                        exercises.Add(new Exercise
                        {
                            exerciseId = reader.GetInt32("exerciseId"),
                            activityType = reader.GetString("activityType"),
                            distance = reader.GetDouble("distance"),
                            dateCompleted = reader.GetDateTime("dateCompleted"),
                            pinned = reader.GetBoolean("pinned"),
                            deleted = reader.GetBoolean("deleted")
                        });
                    }
                
                    return exercises;
                }
            }
            connection.Close();
        }
    }
}