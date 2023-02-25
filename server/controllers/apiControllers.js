import UserModel from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";




// middleware for verify user, this middleware has been made inorder to first verify the username, if username doesnot exists in mongo db database then we wont move further for password authentication

export async function verifyuser(req,res,next){
    // try {
    //     const {username} = req.method == "GET" ? req.query : req.body;
    //     // check the user existance
    //     let exist = await UserModel.findOne({username});
    //     if(!exist){
    //         return res.status(404).send({error : "Cant find User!!"});
    //     }
    //     next();
    // } catch (error) {
    //     return res.status(404).send({error: "Authenticaiton Error"});
    // }


    try {
        
        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if(!exist) return res.status(404).send({ error : "Can't find User!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}

export async function register(req,res){

    // ********
    try {

        const {username, password, profile, email} = req.body;
        // lets check existing user
        const existUsername = new Promise((resolve, reject) =>{
            UserModel.findOne({username}, function(err, user){
                if(err){
                    reject( new Error(err))
                }
                if(user){
                    reject({error : "Please use a unique username"});
                }
                //   here we didnt find a username with given username
                resolve();

              
            })
        });

        // lets check for existing mail

        const existEmail = new Promise((resolve, reject) =>{
            UserModel.findOne({email}, function(err, user){
                if(err){
                    reject( new Error(err))
                }
                if(user){
                    reject({error : "Please use a unique username"});
                }
                //   here we didnt find a email with given username
                resolve();
              
            })
        });

        Promise.all([existUsername, existEmail])
        .then(()=>{
            if(password){
                bcrypt.hash(password,10)
                .then( hashedPassword =>{
                    // storing data in database
                    const user = new UserModel({
                        username,
                        password: hashedPassword,
                        email,
                        profile : profile || "",
                    })
                    // return save result as a response
                    user.save()
                    .then(result => res.status(201).send({message: "User Registerd Successfully"}))
                    .catch(error =>res.status(500).send({error}))

                }).catch(error => {
                    return res.status(500).send({
                        error: "Enable to hashed Password"
                    })
                })
            }

        }).catch(error => {
            return res.status(500).send({
                error: "Enable to hashed Password"
            })
        })

        
    } catch (error) {
        return res.status(500).send(error);
    }
    
}

export async function login(req,res){

    // post request we get username and password as req
    const {username, password} = req.body;

    try {

        UserModel.findOne({
            username
        }).then(user=>{
            bcrypt.compare(password, user.password)
            .then( passwordCheck =>{
                if(!passwordCheck)   return res.status(400).send({error: "Dont have password"})

                // create jwt tokken
              const token=   jwt.sign({
                                        userId: user._id,
                                        username: user.username
                                    },"secret", {expiresIn : "24h"});
                 return res.status(200).send({
                    message: "Login Successful",
                    username: user.username,
                    token   
                 })
            } )
            .catch(error =>{
                return res.status(400).send({error: "Password is incorrect"})
            })
        })
        .catch(error =>{
            return res.status(404).send({error: "Username not found"})
        })
        
    } catch (error) {
        return res.status(500).send({error});
    }

}

// get request localhost:4000/api/user/falanadhimnakana
export async function getUser(req,res){
    // we are using params instead of body becoz the username has been provided with the url

    const {username} = req.params;

    try {
        if(!username){
            return res.status(501).send({error: "Invalid Username"});
        }

        UserModel.findOne({username},function(err, user){
            if(err){
                return res.status(500).send({err});
            }
            if(!user){
                return res.status(501).send({error: "Couldnt find the user"});

            }
            // remove password from user mongoose then we have to to return users data values///// return "data" object

            const {password, ...rest} = Object.assign({}, user.toJSON());

            return res.status(201).send(rest)
        })
    } catch (error) {
        return res.status(404).send({error: "Cannot find the user"});
    }
}


export async function updateUser(req,res){
    //  PUT request we will get userId and data  and we need to return teh updated data
    
    // try {
        
    //     // const id= req.query.id;
    //     // WE HAVE GOT THIS "userId" as we have created the this "userId" in AUTHENCTICATION IN MIDDLEWARE

    //     const {userId} = req.user;
    //     if(userId){

    //         const body = req.body;


    //         // now i can simply update the userdata
    //         UserModel.updateOne({_id :userId},body, function(err, data){
    //             if(err){
    //                 throw err;
    //             }

    //             return res.status(201).send({message: "User has been updated Succesfully"});
    //         })

    //     }
    //     else{
    //         return res.status(401).send({ error: "User not found"});
    //     }
    // } catch (error) {
    //     return res.status(401).send({error})
    // }


    try {
        
        // const id = req.query.id;
        const { userId } = req.user;

        if(userId){
            const body = req.body;

            // update the data
            UserModel.updateOne({ _id : userId }, body, function(err, data){
                if(err) throw err;

                return res.status(201).send({ message : "Record Updated...!"});
            })

        }else{
            return res.status(401).send({ error : "User Not Found...!"});
        }

    } catch (error) {
        return res.status(401).send({ error });
    }

}


export async function generateOTP(req,res){
    // GET request 

   req.app.locals.OTP = await otpGenerator.generate(6, {lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars:false})
    res.status(201).send({code: req.app.locals.OTP});
}

export async function verifyOTP(req,res){
    // GET request
    const {code} =req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; //reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({message: "OTP has been verified successfully"});

    }
    return res.status(400).send({error:"Invalid OTP"});
}

// HERE SUCCESSFULLY REDIRECT USER WHEN OTP IS VALID
export async function createResetSession(req, res){

    // GET request
    // if(req.app.locals.resetSession){
    //     // req.app.locals.resetSession = false; // for creating sessoin one time
    //     return res.status(201).send({
    //         // message: "Access Granted..!"
    //        flag: req.app.locals.resetSession
    //     });
    // }

    // return res.status(440).send({error: "Session expired"});


    if(req.app.locals.resetSession){
        return res.status(201).send({ flag : req.app.locals.resetSession})
   }
   return res.status(440).send({error : "Session expired!"})
}

// UPDATE THE PASSWORD WHEN WE HAVE VALID SESSION
export async function resetPassword(req,res){

    // PUT request








    try {
        
        if(!req.app.locals.resetSession) return res.status(440).send({error : "Session expired!"});

        const { username, password } = req.body;

        try {
            
            UserModel.findOne({ username})
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            UserModel.updateOne({ username : user.username },
                            { password: hashedPassword}, function(err, data){
                                if(err) throw err;
                                req.app.locals.resetSession = false; // reset session
                                return res.status(201).send({ message : "Record Updated...!"})
                            });
                        })
                        .catch( e => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                })
                .catch(error => {
                    return res.status(404).send({ error : "Username not Found"});
                })

        } catch (error) {
            return res.status(500).send({ error })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }
}