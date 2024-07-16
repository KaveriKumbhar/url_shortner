const express = require('express');
const { mongoDBConnection } = require('./connect');
const cookieParser = require('cookie-parser');
const {checkAuthentication,restrictTo} = require('./middlewares/auth');

const path = require("path");

const URL = require('./models/url');

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const PORT = 8001;

mongoDBConnection("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log("MongoDB connected"));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());//---------to support json data-------------
app.use(express.urlencoded({extended:false}))//---------to support form data------
app.use(cookieParser());
app.use(checkAuthentication);

app.use('/url',restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use('/user',userRoute);
app.use('/',staticRoute);

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push:{
                visitHistory:{
                    timestamp :Date.now(),
                },
            }
        },
    );
    res.redirect(entry.redirectedUrl);
});

app.listen(PORT, () => console.log(`SERVER RUN AT PORT ${PORT}`));