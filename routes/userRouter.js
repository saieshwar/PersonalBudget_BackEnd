const express = require("express");
const router = express.Router();
const user = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { json } = require("express");

console.log("qwertyuio");
router.get("/hi", (req, res) => {
  // const budget = await budgetSchema.find({});
  // console.log('hi');
  res.send("budget");
});

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "passwords length  should be atleast 8" });
    }

    if (password !== passwordCheck) {
      return res.status(400).json({
        msg: "Passwords are not matching please re enter the password",
      });
    }

    const existingUser = await user.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    if (!displayName) {
      displayName = email;
    }



    const salt = await bcrypt.genSalt();
    const pwd = await bcrypt.hash(password, salt);

    const newUser = new user({
        email,
         password : pwd,
         displayName,
    });

    const savedUser = await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
  
});


router.post('/login', async(req,res) =>{
    try{
    let {email,password} = req.body;

    if (!email || !password ) {
        return res.status(400).json({ msg: "Not all fields have been entered" });
      }
    
    const userAccount = await user.findOne({email: email});

    if(!userAccount){
        return res.status(400).json({ msg: "Please register" });
    }

    const passwordMatch = await bcrypt.compare(password,userAccount.password);

    if(!passwordMatch) {
        return res.status(400).json({ msg: "Invalid Credentials, Please re enter valid credentials" });
    }
   // const secretKey = 'My super secret Key';
   const expiry = 10;
   
    const token = jwt.sign({id: userAccount._id},process.env.secretKey,{expiresIn: 60});
      // {expiresIn: 10});
                      //  alert("Your session expiers in" +
                      //  `expiry`)  ;  
                                                  
    // console.log(token);
    res.json({
        token,
        user : {
            id: userAccount._id,
            displayName: userAccount.displayName,
            
        }
    })


    } catch(err) {
        res.status(500).json({error: err.message});
    }

})


router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await user.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/tokenIsValid', async(req,res) => {
  try {
      const token = req.header("x-auth-token");
      if(!token) return res.json(false);
      const verified = jwt.verify(token, process.env.secretKey);
      // console.log(verified);
      if(!verified) return res.json(false);

      const userData = await user.findById(verified.id);
      // console.log(userData);
      if(!userData) return res.json(false);

      return res.json(true);
  }catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => { 
  const userData = await user.findById(req.user);
  res.json({
    displayName : userData.displayName,
    id: userData._id
  });
});



module.exports = router;
