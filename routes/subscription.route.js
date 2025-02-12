import {Router} from "express";

const subRouter = Router();

subRouter.get("/", (req, res) => res)

subRouter.get("/:id", (req, res) => res)

subRouter.post("/", (req, res) => res)

subRouter.put("/:id", (req, res) => res)

subRouter.delete("/:id", (req, res) => res)

//extract all the subs of a specific user
subRouter.put("/user/:id", (req, res) => res)

subRouter.get("/upcoming-renewals", (req, res) => res);

export default subRouter;