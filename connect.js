const mongoose = require('mongoose');
mongoose.set("strictQuery",true);

async function mongoDBConnection(url){
    return mongoose.connect(url);
}

module.exports = {
    mongoDBConnection,
}