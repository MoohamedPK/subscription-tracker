import dayjs from "dayjs";
import { emailTemplates } from "./email-template.js";
import transporter, { accountEmail } from "../config/nodemailer.js";

export const sendReminderEmail = async ({to, type, subscription}) => {

    if (!to || !type) throw new Error('Missing required parameters');

    // if it is exists 
    const template = emailTemplates.find((t) => t.label === type) 

    // if we don't have the same label 
    if (!template) throw new Error("Invalide email type");

    const mailInfo = {
        userName : subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate : dayjs(subscription.renewalDate).format('DD/MM/YYYY'),
        planeName: subscription.name,
        price: `${subscription.price} ${subscription.currency} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod
    }

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const emailOptions = {
        from : accountEmail,
        to: to,
        subject: subject,
        html: message
    }

    transporter.sendMail(emailOptions, (error, info) => {
        if (error) return console.log(error, 'Error sending mail');

        console.log('Email sent: ' + info.response);
    })
}
