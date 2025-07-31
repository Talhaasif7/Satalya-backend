import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
dotenv.config();


//Routes
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import listingRouter from "./routes/listing.route.js";


const PORT = process.env.PORT || 3000;


//Middlewares

app.use(cors());
app.use(express.json());







app.use(cookieParser());
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})

mongoose.connect(process.env.MONGO)
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.error("MongoDB connection error:", err));


app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/listing", listingRouter);





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});