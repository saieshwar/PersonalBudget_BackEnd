const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const budget = require("../models/budgetModel");

//post details

router.post("/", auth, async(req,res) => {
    try{
        const {title,related_value, Color} = req.body;
        if(!title || !related_value || !Color) 
            return res.status(400).json({ msg: "All details should be entered" });
        if(isNaN(related_value)){
            return res.status(400).json({ msg: "Related value should be number" });
        }
        if(!title) 
            return res.status(400).json({ msg: "Title should been entered" });

        const budgetData = new budget({
                title,related_value,Color, 
                userId : req.user,
        });

        const saveData = await budgetData.save();
        res.json(saveData);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

//Get

router.get("/",auth,async(req,res) => {
    res.json(await budget.find({userId: req.user}));
})

module.exports = router;