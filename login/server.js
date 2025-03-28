require("dotenv").config()
const path=require("path")
const exp=require("express")
const app=exp();
const cors=require("cors");
const mg=require("mongoose")
const sch=require("./schm.js")
const router=require("./route.js")
const bp=require("body-parser")
const pth=require("path")
const passport=require("passport")
const google=require("passport-google-oauth20").Strategy;
const session=require("express-session");
const github=require("passport-github2").Strategy

mg.connect("mongodb+srv://mouna:Mouna%40mongo25@chatapplication.jhxti.mongodb.net/")
app.use(exp.static(pth.join(__dirname,"login")))

//session is used to store user details, it initailizes  session storage , , session create a storage space in express and store the id of it in cookies
app.use(session({
    secret:"secret",
    resave:false,// it prevents the unecessary session resaving 
    saveUninitialized:true,// it saves the session even it is unintailzer

}))
app.use(passport.initialize());// it setup password for authentication
app.use(passport.session());// it allows session based authentication , but it doesn't create session(or storage ) on it own , we need above session to create storage 
// it is just store and retrive data from the session

passport.use(new google({
    clientID:process.env.GOOGLE_ID,
    clientSecret:process.env.GOOGLE_SECRETE,
    callbackURL:"http://localhost:8000/auth/google/callback"//google redirect to here after login
},
async (accessToken,refreshToken,profile,done)=>{
    try{
        const user= await sch.findOne({email:profile.emails[0].value})
        if(!user){
            return done(null,{profile,newuser:true})
        }
        return done(null,profile)
        }catch(err){
            console.log("not stored")
        }// profile contain user details like name,email etc and the user profile is saved in the session
}
))
// profile is the user info returned by google after sign in , it conatain displayName(name), emails:[{value:""}], id, photos
// done is a callback function it calls the callbackurl

passport.use(new github({
    clientID:process.env.GITHUB_ID,
    clientSecret:process.env.GITHUB_SECRET,
    callbackURL:"http://localhost:8000/auth/github/callback"
},async(accessToken,refreshToken,profile,done)=>{
    try{
        const user= await sch.findOne({email:profile.emails[0].value})
        if(!user){
            return done(null,{profile,newuser:true})
        }
        return done(null,profile)
        }catch(err){
            console.log("not stored")
        }
        
}))

//here user , if user is exist in database  then user contains the mongodb user object,if user  is not exist or new then it contain the profile details
passport.serializeUser((user,done)=> done(null,user))//saves user details in session 
passport.deserializeUser((user,done)=> done(null,user))//retrive user details from session


/*passport.deserializeUser(async (email, done) => {
    try {
        console.log("Deserializing user:", email); // Debugging
        const user = await sch.findOne({ email });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});*/

app.get("/auth",(req,res)=>{
    res.send("<a href='/auth/google'> login with google</a>")
})

app.get("/auth/google",(req, res, next) => {
    console.log("Google Auth Route Hit!");  // Debugging Log
    next();
}, passport.authenticate("google",{scope:["profile","email"]}))// passport start  authentication ,scope:["profile","email"] specifices the what user data we want to request from google
// once the user login in google then it ask user to allow  this app to acess your profile then it callback to give url

app.get("/auth/google/callback",passport.authenticate("google",{failureRedirect:"/"}),(req,res)=>{//failureRedirect:"/" means if authentication fails then it redirect to"/" else profile
    console.log("hhhhhhhhhh")
     // Check if req.user and req.user.profile exist
     if (req.user && req.user.profile && req.user.newuser) {
        req.session.ud = {
            name: req.user.profile.displayName ,
            email: req.user.profile. emails[0].value 
        };

        console.log("Session Data:", req.session.ud); // Debugging
        return res.sendFile(path.join(__dirname, "setpasswrd.html"));
    }

    if (!req.user) {
        return res.status(400).send("User not authenticated");
    }
    res.redirect('/profile')
    next();
})
app.get("/profile",(req,res)=>{
    res.send(`Welcome ${req.user.displayName}`)
})
app.get("/logout",(req,res)=>{
    req.logOut(function(err){
        if(err){
            return res.send("error ocured")
        }
        res.send("Sucessfully logout")
    });
    
})

app.get("/auth/github",(req,res,next)=>{
    console.log("hi");
    next();
},passport.authenticate("github",{scope:["profile","email"]}))

app.get("/auth/github/callback", 
    passport.authenticate("github", { failureRedirect: "/" }), 
    (req, res, next) => {
        console.log("GitHub Authentication Successful. User:", req.user); // Debugging

        // Check if req.user and req.user.profile exist
        if (req.user && req.user.profile && req.user.newuser) {
            req.session.ud = {
                name: req.user.profile.displayName ,
                email: req.user.profile. emails[0].value 
            };

            console.log("Session Data:", req.session.ud); // Debugging
            return res.sendFile(path.join(__dirname, "setpasswrd.html"));
        }

        if (!req.user) {
            return res.status(400).send("User not authenticated");
        }

        res.send(`Hello ${req.user.displayName || "User"}`);
        next();
    }
);











app.use(cors())//cross origin resource sharing, it is a middleware which allows 
app.use(bp.json())
app.use("/",router)
app.use(exp.json())

app.listen(8000,()=>{
    console.log("connecting...")
})