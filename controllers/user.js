const {v4:uuidv4} = require('uuid');
const User = require('../models/user');
const {setUser} = require('../service/auth');

async function handleUserSignUp(req,res){
    const { name,email,password} = req.body;

    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}


async function handleUserLogIn(req,res){
    const { email,password} = req.body;

    const user = await User.findOne({email,password});
    console.log("User",user);
    if(!user){
        return res.render("login",{
            error : "Invalid User Name or Password",
        });
    }

    //--statefull authentication-----
    // const sessionId = uuidv4();
    // setUser(sessionId,user);
    // res.cookie("uid",sessionId);

    //------stateless authentication---------
    const token = setUser(user);
    res.cookie("token",token);//-------this is for cookie based authentication-------
    return res.redirect("/");

   // return res.json({token});//------this id for response based authentication------------
}



module.exports = {
    handleUserSignUp,
    handleUserLogIn,
}
