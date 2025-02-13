import {Router} from "express";
import {createSubscription, getUserSubscription, getAllSubscriptions, getSpecificSubscription} from "../controllers/subscription.controller.js"
import authorize from "../middlewares/auth.middleware.js"

const subRouter = Router();

//get all subscriptions
subRouter.get("/", getAllSubscriptions)

// get a specific subscription
subRouter.get("/:id", getSpecificSubscription)

//create subscription 
subRouter.post("/",authorize ,createSubscription);

//extract all the subs of a specific user
subRouter.get("/user/:id", authorize, getUserSubscription);

subRouter.put("/:id", (req, res) => res)

subRouter.delete("/:id", (req, res) => res)


subRouter.get("/upcoming-renewals", (req, res) => res);

export default subRouter;