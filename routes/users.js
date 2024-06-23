 require('dotenv').config();
 const router = require('express').Router();
 const bcrypt =require('bcryptjs');
 const bodyParser = require('body-parser');
 const {check,validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const User=require('../modules/User');
const token_key = process.env.TOKEN_KEY;

//middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get(
    '/',
    (req,res)=>{
        res.status(200) .json(
         {
            "status":true,
            "message":"User default route"
         }
        );
    }
);

module.exports =router;