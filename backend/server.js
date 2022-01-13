const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const session =  require("express-session");
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20");
// const e = require("express");
// const { reset } = require("nodemon");

let secret = process.env.MY_BACKEND_SECRET;
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json())

  
app.use(session({ 
    secret:secret,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24,
        secure:false
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));


let PORT = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost:27017/trelloClone");

const cardSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String
})

const itemSchema = new mongoose.Schema({
    itemTitle:String,
    cardItems:[cardSchema]
});

// There is suppose to be a workspace schema but nahhhhhhhhhhh.
const WorkspaceSchema = new mongoose.Schema({
    workSpaceTitle:String,
    items:[itemSchema]
})

const userSchema = new mongoose.Schema({
    googleID:String,
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    workspaces:[WorkspaceSchema],
    provider:String
});

userSchema.plugin(passportLocalMongoose);

/* 

For example if you want new user document in users collection 
const User  = new User({username:"blahBlahBLAH"})

*/
const User = mongoose.model("users", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,cb){
        User.findOne({googleID:profile.id},(err,result)=>{
            if(err){
                cb(err);
            }
            if(!result){
                // this means that there is no such user;
                const newUser = new User({
                    googleID:profile.id,
                    username:profile.username,
                    workspaces:[],
                    provider:"gooogle"
                })
                User.save((err)=>{
                    if(err){
                        cb(err)
                        res.send("Error Adding Google Client");
                    }
                    cb(null,result);
                    res.send("Done Adding Google Client");
                })

            }else{
                cb(null,result);
                res.send("Logged in Google Client");
            }
        })
    }
))


passport.serializeUser(function(user, done) {
    done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
       done(err, user);
   });
});



// app.route("/api/signup")
// app.get("/api/signup",(req,res)=>{
//     let data = {}
//     res.send(data);
// })

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.send("No such user"); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send("Signed up succesfully");
      });
    })(req, res, next);
  });

app.post("/api/signup",(req,res)=>{
    let userData = req.body;
    User.register(new User({username: userData.username,password:userData.password}), userData.password, function(err,user) {
        if (err) {
            console.log('error while user register!', err);
            let responseData = {
                username:"",
                userRegistered:false,
                userAuthenticated:false,
                reason:err
            }
            res.send(responseData);
        }else{
            passport.authenticate('local')(req, res, function () {
                //gotta log in 
                let responseData = {
                    username:userData.newUserEmail,
                    userRegistered:true,
                    userAuthenticated:true,
                }
                req.logIn(user, function(err) {
                    if (err) { return next(err); }
                    console.log(user);
                    // the user here clearly displays the user that log in however the req.session.user is still undefined when redirected to homepage
                    responseData.user = user;
                    console.log("Registereds");
                    console.log(responseData);
                    return res.send(responseData);
                  });
              });
        }
      });
});

app.route("/api/login")
.post((req,res,next)=>{
    let userData = req.body;
    let user = new User({
        username: userData.username,
        password: userData.password
    })

    if(req.isAuthenticated()){
        let responseData = {
            user : req.session.passport.user,
            userAuth: true
        }
        res.send(responseData);
    }

    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { 
            let responseData = {
                user : "User Do not Exists",
                userAuth: false
            }
            res.send(responseData);
        }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          //console.log(user);
          // the user here clearly displays the user that log in however the req.session.user is still undefined when redirected to homepage
          //req.session.passport.user = user;
          let responseData = {
              user : user.username,
              userAuth: true
          }
          return res.send(responseData);
        });
      })(req, res, next);

})

app.get("/api/logout",(req,res)=>{
    req.logOut();
    res.send("Logged out!");
})



app.route("/api/auth")
.get((req,res)=>{
    let responseData = {}
    //console.log(req.session.user ,"User Home");
    if(req.isAuthenticated()){
        //console.log(req.session.passport.user)
        // user is assign to req.user once req.login is used;
        responseData.user = req.user
        responseData.userAuth = true;
        res.send(responseData);
    }else{
        console.log("not authenticated");
        console.log(req.session.passport, "passport")
        console.log(req.user ,"User");
        responseData.user = "No User Found! You are not authenticated"
        responseData.userAuth = false
        res.send(responseData);
    }
})
.post((req,res)=>{

});

app.route("/api/workspaces")
.get((req,res)=>{
    User.findOne({username:req.session.passport.user},(err,result)=>{
        if(err){
            console.log(err);
            res.send("Theres an err");
        }
        res.send(result.workspaces);
    })
})

app.route("/api/workspaces/items")
.post((req,res)=>{
    let workSpaceTitle = req.body.workspaceTitle;
    User.findOne({username:req.session.passport.user},(err,result)=>{
        if(err){
            console.log(err);
            res.send("Theres an err");
        }
        let specificWorkspace = result.workspaces.filter((workspace,idx)=>{
            return workspace.workSpaceTitle === workSpaceTitle;
        })
        console.log(specificWorkspace)
        res.send(specificWorkspace[0].items);
    })
})

app.route("/api/workspaces/additem")
.post((req,res)=>{
    let clientData = req.body;
    console.log(clientData);
    let workSpaceTitle = clientData.workspaceTitle;
    User.findOne({username:req.session.passport.user},(err,result)=>{
        if(err){
            return err;
        }
        let specificWorkspace = result.workspaces.filter((workspace,idx)=>{
            return workspace.workSpaceTitle === workSpaceTitle;
        });

        let Item = mongoose.model("items",itemSchema);
        let newItem = new Item({
            itemTitle : clientData.itemTitle,
            cardItems: clientData.cardItems
        })
        specificWorkspace[0].items.push(newItem);
        result.save((err)=>{
            if(err) return err;
            res.send("Done Adding Items");
        })
    })
})

app.route("/api/addWorkspaces")
.post((req,res)=>{
    let workSpace = req.body.workspace;
    // console.log(req.session.passport.user); this did log out the use
    User.findOne({username:req.session.passport.user},(err,result)=>{
        if(err){
            console.log(err);
            res.send("Theres an err");
        }
        console.log(result);
        let WorkSpace = mongoose.model("workspace",WorkspaceSchema);
        let newWorkSpace = new WorkSpace({
            workSpaceTitle:workSpace,
            items:[]
        })
        result.workspaces.push(newWorkSpace);
        result.save((err)=>{
            if(err){
                res.send(err);
            }
            res.send("result");
        })

    })
})

app.post("/api/workspace/addcard",(req,res)=>{
    let clientData = req.body;
    console.log(clientData);
    User.findOne({username:req.session.passport.user},(err,result)=>{
        if(err){
            return err;
        }
        const Card = mongoose.model("Cards",cardSchema);
        let newCard = new Card({
            title:clientData.cardTitle,
            description:""
        })
        let specificWorkspace = result.workspaces.filter((workspace,idx)=>{
            return workspace.workSpaceTitle === clientData.workspaceTitle;
        });
        specificWorkspace[0].items.forEach((workListItem,idx)=>{
            if(workListItem.itemTitle === clientData.itemTitle){
                workListItem.cardItems.push(newCard);
            }
        })

        result.save((err)=>{
            if(err){
                return err;
            }
            res.send("Done Adding Card to Specific Worklist item");
        });
    })
})

app.post("/api/workspace/editItemTitle",(req,res)=>{
    let clientData = req.body;
    console.log(clientData);
    User.findOne({username:req.session.passport.user},(err,result)=>{
        if(err){
            return err;
        }
        let specificWorkspace = result.workspaces.filter((workspace,idx)=>{
            return workspace.workSpaceTitle === clientData.workspaceTitle;
        })
        specificWorkspace[0].items.forEach((item)=>{
            if(item.itemTitle === clientData.prevItemTitle){
                item.itemTitle = clientData.itemTitle;
            }
            return item;
        })
        result.save((err)=>{
            if(err){
                console.log(err);
            }
            res.send("Done editing item Title");
        })
        

    });
})

app.post("/api/workspace/modal/editCardTitle",(req,res)=>{
    let clientData = req.body;
    console.log(clientData);
    User.findOne({username:req.session.passport.user},(err,result)=>{
        if(err) err;
        let specificWorkspace = result.workspaces.filter((workspace,idx)=>{
            return workspace.workSpaceTitle === clientData.workspaceTitle;
        })
        console.log(specificWorkspace);
        let specificItem = specificWorkspace[0].items.filter((item)=>{
            return item.itemTitle === clientData.itemTitle
        })


        specificItem[0].cardItems.forEach((card,idx)=>{
            if(card.title === clientData.cardTitle){
                card.title = clientData.newCardTitle;
            }
        });

        console.log(specificItem);
        result.save((err)=>{
            if(err)
            res.send("Editing")
        });


    })
})

app.post("/api/workspace/modal/editCardDescription",(req,res)=>{
    let clientData = req.body;
    console.log(clientData);
    User.findOne({username:req.session.passport.user},(err,result)=>{
        if(err) err;
        let specificWorkspace = result.workspaces.filter((workspace,idx)=>{
            return workspace.workSpaceTitle === clientData.workspaceTitle;
        })
        console.log(specificWorkspace);
        let specificItem = specificWorkspace[0].items.filter((item)=>{
            return item.itemTitle === clientData.itemTitle
        })


        specificItem[0].cardItems.forEach((card,idx)=>{
            if(card.title === clientData.cardTitle){
                card.description = clientData.newCardDescription;
            }
        });

        console.log(specificItem);
        result.save((err)=>{
            if(err)
            res.send("Editing")
        });
    })
})



app.route("/api/projectpage")
.get((req,res)=>{
    let responseData = {}
    //console.log(req.session.user ,"User Home");
    if(req.isAuthenticated()){
        //console.log(req.session.passport.user)
        // user is assign to req.user once req.login is used;
        responseData.user = req.user
        responseData.userAuth = true;
        res.send(responseData);
    }else{
        console.log("not authenticated");
        console.log(req.session.passport, "passport")
        console.log(req.user ,"User");
        responseData.user = "No User Found! You are not authenticated"
        responseData.userAuth = false
        res.send(responseData);
    }

})
.post((req,res)=>{
    let responseData = {
        user : "",
        userAuth:false
    }
    if(req.isAuthenticated()){
        // user is assign to req.user once req.login is used;
        responseData.user = req.user
        responseData.userAuth = true;
    }else{
        res.send(responseData);
    }
});

app.use((err,req,res,next)=>{
    console.log(err);
    res.send("Theres an err",err);
})

app.listen(PORT,()=>{
    console.log("Server has started");
})


