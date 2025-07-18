import { UserModel } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const ExistedUser = await UserModel.findOne({ email });
    if (ExistedUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          res.status(400);
          throw new Error("Error hashing password");
        }
        const user = await UserModel.create({
          name,
          email,
          password: hash,
        });
        let token = generateToken(user);
        res.cookie("token", token);
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token,
        });
        console.log(token);
      });
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = UserModel.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("User does not exist");
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.send("password not matched");
      else if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token,
        });
      }
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

export const getUserProfile = async (req, res) => {
  try{
    const user = req.LoggedInUser;
    const getUser = await UserModel.findById(user._id);
    res.status(200).json(getUser);
  }
  catch(error){
    res.status(400);
    throw new Error(error.message);
  }
};
