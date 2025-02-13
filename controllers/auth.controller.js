import mongoose from "mongoose";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";


export const singUp = async (req, res, next) => {
  // this session is related to mongoose transaction
  const session = await mongoose.startSession();

  // we do this because we want to perform something known as Atomic Updates (Operation)
  // which means either the entire operation success or nothing happens
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    // check if the user is already exist
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      const error = new Error("User already exists");
      error.statusCode = 409; // already exists
      throw error;
    }

    // if the user doesn't exist we should hash the password
    const salt = await bcrypt.genSalt(10); // the default is 10

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    ); // if something wrong happens during the creation then the user will not created

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    res
      .status(201)
      .json({
        success: true,
        message: "User created successfully",
        data: { token, user: newUsers[0] },
      });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};


export const singIn = async(req, res, next) =>{

    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword) {
            const error = new Error("Invalid password");
            error.statusCode = 401 // unauthorized
            throw error;
        }

        // if the pass is correct
        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        res.status(200).json({success: true, message: "User signed in successfully", data: {token, user}})

    } catch (error) {
        next(error);
    }
}


export const singOut = async (req, res) => {};