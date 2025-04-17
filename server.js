
require("dotenv").config();
const path=require("path")
const exp = require("express");
const mg=require("mongoose");
const passport=require("passport");
const session=require("express-session");
const google=require("passport-google-oauth20").Strategy
const github=require("passport-github2").Strategy
const route=require("./api/rout.js")
const sch=require("./budget_tracker/database.js")
const cors=require("cors")
console.log("✅ Server is starting...");

/*mg.connect("mongodb+srv://mouna:Mouna%40mongo25@bugetplanner.ibtwc.mongodb.net/",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));*/
mg.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS:50000,
  }).then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

//Mouna%40mongo25
const app=exp();

app.use(cors({
    origin: ["http://localhost:3000", "https://your-frontend.vercel.app"],  // Allow your frontend's origin
    credentials: true,                // Enable sending cookies with credentials
}));
app.use(exp.json())

//icon can acess in react files also
app.use("/images",exp.static(path.join(__dirname,"budget_tracker/img")))


app.use(session({
    secret:"MounaBank25",
    resave:false,
    saveUninitialized :true ,
    cookie: { secure: false, httpOnly: true }

}));
app.use(passport.initialize())
app.use(passport.session())



app.use("/",route);


passport.use(new google({
    clientID:process.env.GOOGLE_ID,
    clientSecret:process.env.GOOGLE_SECRETE,
    
    callbackURL: "https://your-backend.vercel.app/auth/google/callback"


},async(accessToken,refreshToken,profile,done)=>{
    try{
    const usr= await sch.auth.findOne({email:profile.emails[0].value})
    if(!usr){
        return done(null,{profile,newuser:true})
    }
    return done(null,profile);
}catch(err){
    return done(err,null);
}

}))

passport.use(new github({
    clientID:process.env.GITHUB_ID,
    clientSecret:process.env.GITHUB_SECRET,
    callbackURL: "https://your-backend.vercel.app/auth/github/callback"


},async(accessToken,refreshToken,profile,done)=>{
    try{
    const usr= await sch.auth.findOne({email:`${profile.emails[0].value}`})
    if(!usr){
        return done(null,{profile,newuser:true})
    }
    return done(null,profile);
}catch(err){
    return done(err,null)
}
}))


passport.serializeUser((user,done)=>done(null,user))
passport.deserializeUser((user,done)=>done(null,user))

app.get("/auth/google",(req,res,next)=>{
    console.log("google authentication")
    next()
},passport.authenticate("google",{scope:["profile","email"]}))

app.get("/auth/google/callback",passport.authenticate("google",{failureRedirect:"/"}),(req,res)=>{
    const user=req.user
    if(user && user.profile && user.newuser){
        req.session.usrdetails={
            name:user.profile.displayName,
           email:user.profile.emails[0].value
        }
        console.log("Session User Details Set:", req.session.usrdetails); 
        return res.redirect("http://localhost:3000/setpasswrd")
    }
    
    res.redirect("http://localhost:3000/home")
    
})


app.get("/auth/github",(req,res,next)=>{
    console.log("github authentication")
    next()
},passport.authenticate("github",{scope:["profile","email"]}))

app.get("/auth/github/callback",passport.authenticate("github",{failureRedirect:"/"}),(req,res)=>{
    
    if(req.user && req.user.profile && req.user.newuser){
        req.session.usrdetails={
            name:req.user.profile.displayName,
           email:req.user.profile.emails[0].value
        }
        return res.redirect("http://localhost:3000/setpasswrd")
    }  
   console.log("GitHub Authentication Successful. User:", req.user); 
   res.redirect("http://localhost:3000/home")

    
})
app.get("/check-session", (req, res) => {
    console.log("Session Data:", req.session.usrdetails);
    res.json({ session: req.session.usrdetails || "No session found" });
});
app.listen(8000,()=>{
    console.log("connected..");
})