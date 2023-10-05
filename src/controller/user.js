const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config("../../.env");

const {error , responseSender} = require("../util/script");
const userService = require("../service/user");
const tokenService = require("../service/token");

const userController = {};

//signup user
userController.register = async(req,res,next) => {
    /*

     * {name, email, password} = Input()
     * if not provide --> return 400
     * check the email is already taken or not
     * if taken --> return 403
     * hash the password
     * save to database --> return 201
     * if failed --> return 500

    */

    try{
        const name = typeof req.body.name === "string" ? req.body.name.trim() : null ;
        const email = typeof req.body.email === "string" ? req.body.email.trim() : null ;
        const password = typeof req.body.password === "string" ? req.body.password.trim() : null ;

        if(!name || !email || !password){
            throw error(
                400,
                "Please provide name , email and password to signup"
            );
        }else{
            const findEmail = await userService.findByProp("email",email);
            if(findEmail){
                throw error(
                    403,
                    "Email not available"
                );
            }else{
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password,salt);
                const user = await userService.register({
                    name,
                    email,
                    password:hashedPassword,
                });
                if(!user){
                    throw error(
                        500,
                        "Error in the server side"
                    );
                }else{
                    const payload = {
                        _id : user._id,
                        name:user.name,
                        email:user.email,
                    };
                    responseSender(res,201,{
                        message:"User created successfully",
                        user:payload,
                    });
                }
            }
        }
    }catch(err){
        next(err);
    }
}

//login user 
userController.login = async (req,res,next) => {
    /*
    
     * {email, password} = input()
     * if not return 400
     * find in the database
     * if not found return 400
     * compare the password
     * if not match return 400
     * generate a jwt token with basic info in payload
     * save the token in the tokenDB
     * return the jwt token and 200

    */

    try {
        const email = typeof req.body.email === "string" ? req.body.email.trim() : null;
        const password = typeof req.body.password === "string" ? req.body.password.trim() : null;

        if (!email || !password) {
            throw error(400, "Please provide email and password to login");
        }else{
            const user = await userService.findByProp("email",email);
            if(!user){
                throw error(
                    400,
                    "Invalid Credential"
                );
            }else{
                const isCorrectPassword = await bcrypt.compare(
                    password,
                    user.password
                );
                if(!isCorrectPassword){
                    throw error(400,"Invalid credential");
                }else{
                    const payload = {
                        _id : user._doc._id,
                        name : user._doc.name,
                        email:user._doc.email,
                    };
                    const token = jwt.sign(payload,process.env.SECRET_KEY);
                    try{
                        await tokenService.issueToken(token,payload._id);
                    }catch(err){
                        console.log(err.message);
                        next(error(
                            500,
                            "Error occurs in the server side"
                        ));
                    }finally{
                        responseSender(res,200,{
                            message:"Login successful",
                            token,
                            user,
                        });
                    }
                }
            }
        }

    } catch (error) {
        next(error);
    }
}

// Export module
module.exports = userController;