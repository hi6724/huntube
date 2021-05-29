import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";

import app from "./server";

const PORT = process.env.PORT || 4000;

//open app
const handleListening = () => console.log(`✅ http://localhost:${PORT}`);
app.listen(PORT, handleListening);
