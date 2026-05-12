import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../Model/AdminModel.js";
import dotenv from "dotenv/config";

export const registerController = async (req, res) => {
  const { name, email, role, password } = req.body;

  try {
    if (!name || !email || !role || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    // Validate role
    const allowedRoles = ["Admin", "Hr", "Manager"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const exist = await Admin.findOne({ email });

    if (exist) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      name,
      email,
      role,
      password: hashPassword,
    });

    res.status(201).json({
      message: "Account Created!",
    });
  } catch (error) {
    console.log("Registration error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, role, password } = req.body;
    console.log(email, password);

    if (!email || !role || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role !== role) {
      return res.status(401).json({
        message: "Invalid role",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1d",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    console.log("login succefully");
  } catch (error) {
    console.log("Login Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const logoutController = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
  console.log("logout succesfull");

  return res.status(200).json({ message: "Logged out successfully" });
};
