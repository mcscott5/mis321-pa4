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

            using (MySqlCommand command = new MySqlCommand("SELECT * FROM Exercises WHERE deleted = 0 ORDER BY dateCompleted DESC;", connection))
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
                            dateCompleted = reader.GetDateTime("dateCompleted").ToShortDateString(),
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

    public static void AddExercise(Exercise value)
    {
        ConnectionString cs = new ConnectionString();
        string con = cs.cs;
        using var connection = new MySqlConnection(con);
        connection.Open();
        string stm = @$"INSERT INTO Exercises(activityType, distance, dateCompleted, pinned, deleted)
                            VALUES(@activityType, @distance, @dateCompleted, @pinned, @deleted)";
        using var command = new MySqlCommand(stm, connection);

        command.Parameters.AddWithValue("@activityType", value.activityType);
        command.Parameters.AddWithValue("@distance", value.distance);
        command.Parameters.AddWithValue("@dateCompleted", value.dateCompleted);
        command.Parameters.AddWithValue("@pinned", value.pinned);
        command.Parameters.AddWithValue("@deleted", value.deleted);
        command.Prepare();
        command.ExecuteNonQuery();

        connection.Close();

        // using (MySqlConnection connection = new MySqlConnection(con))
        // {
        //     connection.Open();

        //     using (MySqlCommand command = new MySqlCommand(connection))
        //     {
        //         command.CommandText = @$"INSERT INTO Exercises(activityType, distance, dateCompleted, pinned, deleted)
        //                     VALUES(@activityType, @distance, @dateCompleted, @pinned, @deleted)";
        //         command.Parameters.AddWithValue("@activityType", value.activityType);
        //         command.Parameters.AddWithValue("@distance", value.distance);
        //         command.Parameters.AddWithValue("@dateCompleted", value.dateCompleted);
        //         command.Parameters.AddWithValue("@pinned", value.pinned);
        //         command.Parameters.AddWithValue("@deleted", value.deleted);
        //         command.ExecuteNonQuery();
        //     }
        //     connection.Close();
        // }
    }

    public static void PinExercise(int id){
        ConnectionString cs = new ConnectionString();
        string con = cs.cs;
        using var connection = new MySqlConnection(con);
        connection.Open();
        
        string stm = @"UPDATE Exercises SET pinned = !pinned WHERE exerciseId = @id";
        using var command = new MySqlCommand(stm, connection);
        command.Parameters.AddWithValue("@id", id);
        command.Prepare();
        command.ExecuteNonQuery();
        connection.Close();
    }

    public static void DeleteExercise(int id){
        ConnectionString cs = new ConnectionString();
        string con = cs.cs;
        using var connection = new MySqlConnection(con);
        connection.Open();
        
        string stm = @"UPDATE Exercises SET deleted = !deleted WHERE exerciseId = @id";
        using var command = new MySqlCommand(stm, connection);
        command.Parameters.AddWithValue("@id", id);
        command.Prepare();
        command.ExecuteNonQuery();
        connection.Close();
    }
}