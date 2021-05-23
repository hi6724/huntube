import mongoose from "mongoose";
//db를 mongoose와 연결시켜서 video model 을 인식
mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connect to DB");
const handleError = (error) => console.log("❌DB Error", error);
db.on("error", handleError);
db.once("open", handleOpen);
