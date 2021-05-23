import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;

//open app
const handleListening = () => console.log(`✅ http://localhost:${PORT}`);
app.listen(PORT, handleListening);
