import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";

import Student from "../models/student.modal";

export async function verify(req: Request, res: Response) {
  if (!process.env.JWT_SECRET_KEY) {
    console.error("JWT_SECRET_KEY is not defined");
    process.exit(1);
  }

  try {
    const email = req.body.email;
    const otp = req.body.otp;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await Student.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (user.otp !== +otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await Student.updateOne({ email }, { otp: null });

    const token = jsonwebtoken.sign({ email }, process.env.JWT_SECRET_KEY!);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function login(req: Request, res: Response) {
  if (!process.env.JWT_SECRET_KEY) {
    console.error("JWT_SECRET_KEY is not defined");
    process.exit(1);
  }

  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    var user = await Student.findOne({ email });

    if (!user) {
      user = new Student({ email });
      await user.save();
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.otp = otp;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NEXT_PUBLIC_MAIL_ID,
        pass: process.env.NEXT_PUBLIC_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_MAIL_ID,
      to: email,
      subject: "Hello from Internxt!",
      text: "Welcome back to Internxt! Your OTP is " + otp + ".",
    };

    const mail = transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
