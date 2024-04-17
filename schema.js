const { mongoose } = require("./db");

const Schema = mongoose.Schema;

const Mentor = new Schema({
  name: { type: String },
  qualification: { type: String },
  age: { type: Number },
  mentor_Id: { type: Number },
  students:{type:Array}
});
const MentorModel = mongoose.model("mentors", Mentor);

const Student = new Schema({
  name:{type:String},
  standard:{type:Number},
  student_ID:{type:String},
  mentor:{type:String},
  mentorList:{type:Array}
}
);

const StudentModel = mongoose.model("students",Student)

module.exports = {
  MentorModel,
  StudentModel
};
