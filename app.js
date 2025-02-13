import express from "express";
import {PORT} from "./config/env.js";
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import subRouter from "./routes/subscription.route.js"
import connectDb from "./database/db.js"
import errorMiddleware from "./middlewares/errorMiddleware.js"
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";


const app = express();

// middleware that allow you to handle json data sent in req
app.use(express.json());

app.use(express.urlencoded({extended: false }))

// this one is allow you to store user data
app.use(cookieParser())

//ARCJET middleware 
app.use(arcjetMiddleware)

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`subscription tracking run in http://localhost:${PORT}`);
  await connectDb();
});