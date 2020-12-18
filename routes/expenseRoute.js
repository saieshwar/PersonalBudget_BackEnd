const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const expense = require("../models/expenseModel");

//post expense

router.post("/", auth, async(req,res) => {
    try{
        const {title,related_value, month, year} = req.body;
        if(!title || !related_value || !month || !year) 
            return res.status(400).json({ msg: "All details should be entered" });
        if(!title) 
            return res.status(400).json({ msg: "Title should been entered" });

        const expenseData = new expense ({
                title,related_value,month,year, 
                userId : req.user,
        });

        const expenseSaveData = await expenseData.save();
        res.json(expenseSaveData);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

//get
router.get("/",auth,async(req,res) => {
    res.json(await expense.find({userId: req.user}));
})

module.exports = router;