import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";

const REMINDERS = [7, 5, 2, 1];

const sendReminders = serve(async (context) => {
  // 1 => retrieving the subscription ID through the context requestPayload (handle the Incoming request payload)
  console.log(context.requestPayload)
  const { subscriptionId } = context.requestPayload;

  const subscription = await fetchSubscription(context, subscriptionId);
  console.log("getting subscription")

  // check if the subscription
  console.log('subscription does not match')
  if (!subscription || subscription.status !== "active") return; // exit the process if the subscription doesn't exists on the DB or if it isn't active

  // if the sub is exists, then we will check the renewal date
  const renewalDate = dayjs(subscription.renewalDate);
  console.log(renewalDate)

  if (renewalDate.isBefore(dayjs())) {
    console.log(`Renewal date has passed for subscription ${subscriptionId}.`);
    return; // exit the process
  }

  // if the process is in
  for (const daysBefore of REMINDERS) {
    // EX:  30 - 7 = 23; 30 - 5 = 25;...
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate
      );
    }

    await triggerReminder(context, `Reminder ${daysBefore} days before`);
  }
});

// STEPS
const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    return Subscription.findById(subscriptionId).populate("user", "name email"); // populate the name & email of that user to the SUB
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`sleep unitl ${label} reminder at ${date}`);
  await context.sleepUntil(label, date);
};

const triggerReminder = async (context, label) => {
  await context.run(label, () => {
    console.log(`triggering ${label},  reminder`);
  });
};

export default sendReminders;
