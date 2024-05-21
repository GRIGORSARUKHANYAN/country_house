

import express from 'express'
import dotenv from "dotenv";
import {authMiddleware} from "./auth.middleware.js"
const app = express();
const port = 3000;
import mongoose from 'mongoose';
app.use(express.json());
dotenv.config();
import cors from "cors";
import bodyParser from 'body-parser'

import User from './models/userModel.js'
import Accept from './models/acceptModel.js'
import Lesson from './models/LessonModel.js'
import jwt_decode from "jwt-decode";


import {generateTokens} from './token.js';
// import authRoute from "./routes/auth.routes.js";

// import UserDocument from "../models/users.model";
// const routers=[
//   { path: "/auth", router: authRoute }
// ]

// function initializeRoutes(routes) {
//   routes.forEach((route) => {
//     app.use(route.path, route.router);
//   });
// }
// initializeRoutes(routers);

// mongoose.connect('mongodb://localhost:27017/node-mongodb-crud', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
// const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/node-mongodb-crud')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
  function isValidEmail(email) {
    // Regular expression to match valid email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
app.use(cors());


// app.post('/register', async (req, res) => {    
//   console.log("register");
//   if (!req.body || !req.body.name || !req.body.surname || !req.body.email || !req.body.password || !req.body.birtDay || !isValidEmail(req.body.email) ) {
// console.log(req.body);
//     return  res.status(400).send("data is invalid");
//   }
//   const oldUser = await User.findOne({email:req.body.email});
//   if (oldUser) {
//     return  res.status(400).send("is already havn");
//   }
  
//   let newUser=req.body  
//   newUser.IsAdmin=false
//   const user = new User(req.body);
//    let myUser= await user.save()
//   res.send(myUser);
// }
// );



// app.post('/accept',authMiddleware, async (req, res) => {    
//   console.log("asdzuasgd");
//   if (!req.body ||!req.body.room || !req.body.name || !req.body.surname ||  !req.body.email || !req.body.phone || !isValidEmail(req.body.email) ) {

//     return  res.status(400).send("data is invalid");
//   }
//   const accept = new Accept(req.body);
//    let myAccept= await accept.save()
//   res.send(myAccept);
// }
// );

app.post('/accept', async (req, res) => {    
  console.log("accep",new Date().getTime()-new Date(req.body.date).getTime());
  if (!req.body ||!req.body.room || !req.body.name || !req.body.surname ||  !req.body.email || !req.body.phone || !req.body.date || !isValidEmail(req.body.email)||new Date().getTime()-new Date(req.body.date).getTime()>0 ) {

    return  res.status(400).send("data is invalid");
  }
  const acepor = await Accept.find({date:req.body.date,room:req.body.room,isActive:true});
  if (acepor) {
    return  res.status(400).send("the room is already booked");
  }
  acepor = await Accept.find({date:req.body.date,room:req.body.room,email:req.body.email});
  if (acepor) {
    return  res.status(400).send("request is pending");
  }
  const accept = new Accept(req.body);
   let myAccept= await accept.save()
   if (myAccept) {
  res.send({data:[1]});
    
   }
   res.send({data:[]});

}
);

app.post('/reqAccept', async (req, res) => {    
  if (!req.body || !req.body.date ||new Date().getTime()-new Date(req.body.date).getTime()>0 ) {
    return  res.status(400).send("data is invalid");
  }
  const accept = await Accept.find({date:req.body.date,isActive:true});
  if (acepor) {
    return  res.status(400).send("the room is already booked");
  }
  res.send(accept);
}
);


app.get('/pendingAccept',authMiddleware, async (req, res) => {    
  const accepts = await Accept.find({isActive:false});
res.send(accepts);
}
);
app.get('/activeAccept',authMiddleware, async (req, res) => {    
  const accepts = await Accept.find({isActive:true});
res.send(accepts);
}
);


// app.post('/lesson',authMiddleware, async (req, res) => { 
//   const token = req.header("Authorization")?.split("Bearer ")[1];
//   if (!token) {
//     return  res.status(400).send("token is invalid");
//   }
//   const payload = jwt_decode(token);
//      const user = await User.findOne({_id:payload.userId});
//      if (!user || !user.isAdmin) {
//        return  res.status(400).send("is already havn");
//      }
//   // console.log("asdzuasgd",req.body);
//   if (!req.body || !req.body.title || !req.body.text ) {
//     return  res.status(400).send("data is invalid");
//   }
//   const lesson = new Lesson(req.body);
//    let myLesson= await lesson.save()
//   res.send(myLesson);
// }
// );

// app.get('/lesson', async (req, res) => { 
//   const lessons = await Lesson.find();
// res.send(lessons);
// }
// );
// app.get('/user/:id', async (req, res) => { 
//     const user = await User.find({_id:req.params.id});
//   res.send(user);
// }
// );

// app.get('/contact',authMiddleware, async (req, res) => { 
//   const token = req.header("Authorization")?.split("Bearer ")[1];
//   if (!token) {
//     return  res.status(400).send("token is invalid");
//   }
//   const payload = jwt_decode(token);
//      const user = await User.findOne({_id:payload.userId});
//      if (!user || !user.isAdmin) {
//        return  res.status(400).send("is already havn");
//      }
//   const contacts = await Contact.find();
// res.send(contacts);
// }
// );



app.post('/login', async (req, res) => {
  console.log("login");  
  if (!req.body || !req.body.email || !req.body.password ) {
    console.log(req.body);
    return  res.status(400).send("data is invalid");
  }
  const user = await User.findOne({email:req.body.email});
if (!user || user.password!==req.body.password) {
  return  res.status(400).send("email or password is invalid");
  
}
 let token =await generateTokens(user._id,user.email)
  token.isAdmin=user.isAdmin
  res.send(token);
}
);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
