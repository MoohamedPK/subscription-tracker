import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User is required"],
        trim: true,
        minLength: 2,
        maxLength: 30,
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match : [/\S+@\S+\.S+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        minLength: 6,
        required: [true, "Password is required"]
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;