import mongoose from "mongoose";

enum StudentType {
  school = "school",
  college = "college",
}
enum ProjectType {
  solo = "Solo Project",
  group = "Group Project",
}
enum ExperienceType {
  intern = "Intern",
  fulltime = "Full Time",
}

const studentSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  mobile: String,
  otp: {
    type: Number,
    default: 123456,
  },
  profile_pic: String,
  linkedin_url: String,
  github_url: String,
  resume: String,
  student_type: String,
  school_name: String,
  start_date: Date,
  end_date: Date,
  project_name: String,
  project_description: String,
  project_type: String,
  project_link: String,
  experience_type: [
    {
      company_name: String,
      type: String,
      company_website_link: String,
      start_date: Date,
      end_date: Date,
      role: String,
      cover_letter: String,
    },
  ],
  points: {
    type: Number,
    default: 0,
  },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
