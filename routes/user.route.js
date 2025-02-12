import {Router} from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => {res.send({title:"GET all users"})});

userRouter.get('/:id', (req, res) => {res.send({title:"GET a specific user"})});

userRouter.post('/', (req, res) => {res.send({title:"create a new user"})});

userRouter.put('/:id', (req, res) => {res.send({title:"update a specific user"})});

userRouter.delete('/:id', (req, res) => {res.send({title:"delete a specific user"})});


export default userRouter;