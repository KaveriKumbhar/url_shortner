const {getUser} = require('../service/auth');

//AUTHENTICATION
function checkAuthentication(req,res,next){
    const tokenCookie = req.cookies?.token;
    req.user = null;
    if(!tokenCookie ){
        return next();
    }

    const token = tokenCookie;
    const user = getUser(token);
    req.user = user
    return next();
}

//AUTHORIZATION
function restrictTo(roles=[]){
    return function (req,res,next){
        if(!req.user) return res.redirect('/login');

        if(!roles.includes(req.user.role)) return res.render("unAutherised");

        return next();
    }
}

module.exports = {
    checkAuthentication,
    restrictTo,
}
























// async function restrictToLoggedInUserOnly (req,res,next){
//     //const userUid = req.cookies?.uid;       --------cookie based-------
//     const userUid = req.headers["authorization"]; // -------response based-----
//     if(!userUid) {
//         return res.redirect("/login");
//     }

//     const token = userUid.split("Bearer ")[1];//---------response based-----

//     //const user = getUser(userUid);/////////cookie based------

//     const user = getUser(token);
//     if(!user){
//         return res.redirect("/login");
//     }

//     req.user = user;
//     next();
// }

// async function checkAuth(req,res,next){
//      //const userUid = req.cookies?.uid;       --------cookie based-------
//      const userUid = req.headers["authorization"]; // -------response based-----
//      //console.log(req.headers);
     
//      const token = userUid.split("Bearer ")[1];//---------response based-----
   
//      //const user = getUser(userUid);/////////cookie based------
//     const user = getUser(token);
   
//     req.user = user;
//     next();
// }

// module.exports = {
//     restrictToLoggedInUserOnly,
//     checkAuth,
// }