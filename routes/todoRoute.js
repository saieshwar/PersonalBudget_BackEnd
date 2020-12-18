const express = require("express");
const { route } = require("./userRouter");
const router = express.Router();
const auth = require('../middleware/auth');
const Todo = require('../models/todoModel')

router.post("/",auth,async(req,res) =>{
    try{
        const {title} = req.body;

        if(!title){
            return res.status(400).json({ msg: "Title should been entered" });
        }
        const newTodo = new Todo({
            title,
            userId: req.user
        });

        const savedTodo = await  newTodo.save();
        res.json(savedTodo);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.get("/all",auth,async(req,res) => {
    const todos = await Todo.find({userId: req.user});
    res.json(todos);
});

router.delete("/:id",auth,async(req,res)=>{
    const todo = await Todo.findOne({user_id : req.user, _id: req.params.id });
    if(!todo) {
        return res.status(400).json({ msg: "No todo found by this ID that belongs to current user" });
    }
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(deletedTodo);
});

module.exports = router;