
// *** validate username ***


import  toast from "react-hot-toast";
import { authenticate } from "./helper";

export async function usernameValidate(user_name){
    const errors = await usernameVerify({}, user_name);

    if(user_name){
        // check the existance of username in database
        const {status} = await authenticate(user_name);
        if(status !==200){
            errors.exist = toast.error("User doesnot exist..!");
        }
    }
    return errors;
}


export async function passwordValidate(values){
    const errors = await passwordVerify({}, values);

    return errors;
}

export async function resetPasswordValidate(pass1, pass2){
    const errors = await resetPasswordVerify({}, pass1, pass2);

    return errors;
}

export async function registerValidate(values){
    // const errors = usernameVerify({},)
    // console.log(values);

    // here the values are object of username, email, password


    const errors = usernameVerify({}, values.username );
    passwordVerify(errors, values.password);
    emailVerify(errors, values.email);


    return errors;
}


// validate profile page
export async function profileValidate(values){
    // console.log(values);
    // values are object form data
    const errors = emailVerify({}, values.email);

    return errors;

}



// ************************************************************//

function usernameVerify(errors={}, user_name){
    if(!user_name){
        errors.user_name = toast.error("Username Required....!");

    }
    else if(user_name.includes(" ")){
        errors.user_name= toast.error("Invalid Username....!");

    }

    return errors
}

function passwordVerify(errors = {}, pass){
    const specialChars= /[`!@#$%^&*()_+\-=};':"\\|,.<>{?~]/

    if(!pass){
        errors.value = toast.error("Password Require...!");
    }
    else if(pass.includes(" ")){
        errors.value = toast.error(" Wrong Password..!");



    }
    else if(pass.length< 4){
        errors.value = toast.error("Password must be more than 4 units");
    }
    else if(!specialChars.test(pass)){
        errors.value = toast.error("Password should contain atleast one Special char");
    }
     
    return errors
}





function resetPasswordVerify(errors={}, pass1, pass2){

    // console.log("pass1", pass1);
    // console.log("pass2", pass2);
    if(pass1 !== pass2){
        errors.message = toast.error("new password & confirm new password did not match");
    }
    if(pass1 === pass2){
        errors.message = toast.success("yeah password has been changed");
    }

     return errors;

 
}

// validate email
function emailVerify(errors={}, gotEmail ){

    if(!gotEmail){
        errors.email = toast.error("Email Required....!");
    }
    else if(gotEmail.includes(" ")){
        errors.email = toast.error("Invalid Email...");
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(gotEmail)){
         
        errors.email = toast.error("Invalid Email...!");
    }

    return errors;

}



// ********** register form validate


