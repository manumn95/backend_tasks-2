const express = require("express");
const app = express();
const { mongoose, connectdb } = require("./db");
const { MentorModel, StudentModel } = require("./schema");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
console.log(process.env.MONGO_DB)
connectdb();

//to connect with mongodb
app.get("/", async (req, res) => {
  res.send("Server Working");
});

//API to create mentor DB
app.post("/createMentor", async (req, res) => {
  const { name, qualification, age, mentor_Id } = req.body;
  const response = await MentorModel.create({
    name,
    qualification,
    age,
    mentor_Id,
  });
  console.log(response);
  res.send(response);
});

//API to create Student DB

app.post("/createStudent", async (req, res) => {
  const { name, standard, student_ID } = req.body;
  const response = await StudentModel.create({
    name,
    standard,
    student_ID,
  });
  res.send(response);
});

//API to assign a student to a mentor
app.put("/connectMentor", async (req, res) => {
  const { id, mentor_Name } = req.body;
  const filter = { student_ID: id };
  const update = { mentor: mentor_Name,mentorList:mentor_Name };
  const response = await StudentModel.findOneAndUpdate(filter, update);
  res.send(response);
});

//API to connect multiple studets with a mentor
app.put("/conncetStudents", async (req, res) => {
  const { id, studentList } = req.body;
  const filter = { mentor_Id: id };
  const update = { students: studentList };
  const response = await MentorModel.findOneAndUpdate(filter, update);
  res.send(response);
});

//API to show all students for a particlar mentor
app.get("/allStudents/:id", async (req, res) => {
  const response = await MentorModel.find(
    {
      mentor_Id: req.params.id,
    },
    { students: 1 }
  );
  res.send(response);
});

//API to get previous mentor
app.get("/getteachers/:id",async (req,res)=>{
const response = await StudentModel.find({student_ID:req.params.id})
const previousMentor = response.mentorList[response.mentorList.length-2]
res.send(previousMentor);
})
//to connect the server
app.listen(4000, () => {
  console.log("server Connected to http://localhost: 4000");
});
