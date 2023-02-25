
import jwt from "jsonwebtoken";
// auth middleware
export default async function Auth(req, res,next){

    try {

        // WHEN WE MAKE A PUT REQUEST , WE PROVIDE AUTH HEADER AS AUTH BARRIER 
        // SO IN AUTH BEARER OBJECT , WE GIVE TOKKEN WHICH WE HAVE GOT DURING LOGIN , 
        //  REST IN PUT METHOD WE PROVIDE THE QUERY AS OBJECT OF ID 
        
        const token = req.headers.authorization.split(" ")[1];

        // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2RiODVmYjU1OWY2ZGJiZjZlOWIxNmYiLCJ1c2VybmFtZSI6InRob21zb24xIiwiaWF0IjoxNjc1MzMxMTA4LCJleHAiOjE2NzU0MTc1MDh9.6OUsu_acrI6tG5gNY25Px7A-Zla27SThx3iGkN1ZvLk"

        // we need to only get the token so we will separate bearer

       const decodedToken=  await jwt.verify(token, "secret");
       req.user = decodedToken


    //    BY THIS DECODED TOKEN WE WILL GET USERiD OF THAT PERSON

        // res.json(decodedToken);
       next();


    } catch (error) {
        res.status(401).json({error: "Authencticaiton failed"});
    }
}


export function localVariable(req,res,next){
    req.app.locals = {
        OTP:null,
        resetSession: false,
    }
    next();
}