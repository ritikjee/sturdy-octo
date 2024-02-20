import { Request, Response } from "express";
import Student from "../models/student.modal";

export async function updateProfile(req: Request, res: Response) {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await Student.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const {
      name,
      mobile,
      profile_pic,
      linkedin_url,
      github_url,
      resume,
      type,
      school_name,
      start_date,
      end_date,
      project_name,
      project_description,
      project_type,
      project_link,
      experience_type,
    } = req.body;

    if (name) user.name = name;
    if (mobile) user.mobile = mobile;
    if (profile_pic) user.profile_pic = profile_pic;
    if (linkedin_url) user.linkedin_url = linkedin_url;
    if (github_url) user.github_url = github_url;
    if (resume) user.resume = resume;
    // if (type) user. = type;
    if (school_name) user.school_name = school_name;
    if (start_date) user.start_date = start_date;
    if (end_date) user.end_date = end_date;
    if (project_name) user.project_name = project_name;
    if (project_description) user.project_description = project_description;
    if (project_type) user.project_type = project_type;
    if (project_link) user.project_link = project_link;
    if (experience_type) user.experience_type = experience_type;

    await user.save();

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
