import multer from "multer";
import path from "path";
import cors from "cors";
import express from "express";
//
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const multerConfig = multer.diskStorage({
    destination:function(req, file, cb){
       cb(null, "./bucket");
    },
    filename:function(req, file, cb){
       cb(null, file.originalname)
    }
});

const multerMiddle = multer({storage:multerConfig});

app.get("/", (req, res)=>{
   res.render("index");
});

app.post("/register", multerMiddle.single("image"),(req, res)=>{
    res.redirect("/");
});

app.listen(3000, ()=>{
    console.log("start server");
});
