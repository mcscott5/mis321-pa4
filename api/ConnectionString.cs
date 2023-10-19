namespace api
{
    public class ConnectionString
    {
        public string cs {get; set;}
        public ConnectionString(){
            string server = "dt3bgg3gu6nqye5f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string database = "u6tzjcg5ag2uuuhf";
            string port = "3306";
            string username = "pw2xmtfevxv1qj87";
            string password = "rjaxx4tkb47y9e0l";

            cs = $@"server = {server}; user = {username}; database={database}; port={port}; password={password};";
            
        }
    }
}