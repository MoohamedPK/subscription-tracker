import nodemailer from "nodemailer"
import { EMAIL_PASSWORD, ACCOUNT_EMAIL } from "../config/env.js";

export const accountEmail = ACCOUNT_EMAIL;

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user:accountEmail,
        pass: EMAIL_PASSWORD,
    },

})
export default transporter;