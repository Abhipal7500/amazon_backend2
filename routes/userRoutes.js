 require('dotenv').config();
 const router = require('express').Router();
 const bcrypt =require('bcryptjs');
 const bodyParser = require('body-parser');
 const {check,validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const User=require('../modules/User');
const token_key = process.env.TOKEN_KEY;
const storage = require('./storage')
//middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get(
    '/',
    (req,res)=>{
       return res.status(200) .json(
         {
            "status":true,
            "message":"User default route"
         }
        );
    }
);

//register a user
router.post('/register',[
 
    check('username',"Enter Value, field cant be empty").not().isEmpty().escape(),
    check('password',"Password Can't be empty").not().isEmpty().isLength({min:5}).escape(),
    check('email',"Enter Email Properly").isEmail().normalizeEmail()    //normalizeEmail this will covert email to lowercase so (Abhi@gmail.com  and  abhi@gmail.com )will be same

],(req,res)=>{

const errors=validationResult(req);

if(!errors.isEmpty()){
    return res.status(400).json({
        "status":false,
        "error":errors.array(),
        "message":"Form Validation Error..."
    })
}

//saving data to database
User.findOne({email:req.body.email}).then((user)=>{
    if(user){
        return res.status(409).json({
            "status":false,
            "message":"user email already exists"
        })
    }
    else{
        const salt=bcrypt.genSaltSync(10);
const hashPassword=bcrypt.hashSync(req.body.password,salt);
        const newUser= new User({
            email:req.body.email,
            username:req.body.username,
            password:hashPassword

        })
        newUser.save().then((result)=>{
         return res.status(200).json({
            "status":true,
            "user":result
         })
        }).catch((error)=>{
            return res.status(502).json({
                "status":false,
                "error":error
            })
        })
    }
}).catch((error)=>{
    return res.status(502).json({
        "status":false,
        "error":error
    })
})


})

// route to upload profile pic

router.post(
    '/uploadProfilePic',
    (req,res)=>{
        let upload=storage.getProfilePicUpload();

        upload(req,res,(error)=>{
    
            console.log(req.file);
            if(error){
            return res.status(400).json({
                "status":false,
                "error":error,
                "message":"File upload Fail..."

            })
        }else{
            return res.status(200).json({
                "status":false,
                "message":"File upload Success"

            })
        }
            
        })
    }
)


//Login route

router.post('/login',[
    check('password',"Password Can't be empty").not().isEmpty().isLength({min:5}).escape(),
    check('email',"Enter Email Properly").isEmail().normalizeEmail()    //normalizeEmail this will covert email to lowercase so (Abhi@gmail.com  and  abhi@gmail.com )will be same 
],
 (req,res)=>{
    const errors=validationResult(req);

if(!errors.isEmpty()){
    return res.status(400).json({
        "status":false,
        "error":errors.array(),
        "message":"Form Validation Error..."
    })
}
User.findOne({email:req.body.email})
  .then((user)=>{
    if(!user)
        {
            return res.status(404).json({
                "status":false,
                "message":"User's dont exist"
            })
        }
        else{
            let isPasswordMatch=bcrypt.compareSync(req.body.password,user.password);
            //password do not match
            if(!isPasswordMatch)
                {
                   return res.status(401).json({
                     "status":false,
                     "message":"Password not match...."
                   });
                }
                return res.status(200).json({
                    "status":true,
                    "message":"User login successfull"
                });
        }
      
  }).catch((error)=>{
    return res.status(502).json({
        "status":false,
        "error":error
    })
  })

 }
)

module.exports =router;