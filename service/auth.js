//-------- STATEFULL AUTHENTICATION ----------------------------
// const sessionIdToUserMap = new Map();

// function setUser(id,user){
//      sessionIdToUserMap.set(id,user);
// };

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

// module.exports = {
//     setUser,
//     getUser,
// }

//------------STATELESS AUTHENTICATION----------------------------------
const jwt = require('jsonwebtoken');
const secret = "kaveri15";

function setUser(user){
    return jwt.sign({
        _id : user._id,
        email : user.email,
        role : user.role,
    },secret);
};

function getUser(token){
    if(!token) return null
    try {
        return jwt.verify(token,secret);
    } catch (error) {
        return null
    }
    
}

module.exports = {
    setUser,
    getUser,
}