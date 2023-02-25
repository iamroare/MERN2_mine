
import React, { useState } from 'react'
import {  toast, Toaster} from 'react-hot-toast';
import styles from "../styles/Username.module.css";
import { Link, useNavigate} from 'react-router-dom';
import covertToBase64 from '../helper/convert';
import { registerValidate } from '../helper/validate';
import { registerUser } from '../helper/helper';


const Register = () => {

  const navigate = useNavigate();

  const [file, setFile] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =useState("");

  const onUpload = async (e)=>{
    const base64 = await covertToBase64(e.target.files[0]);
    setFile(base64);
  }

  const handleRegisterForm = async (e) =>{
    e.preventDefault();
  
    // console.log("file", file);
    // console.log(username);
    // console.log(email);
    // console.log(password);

    let formData={
      username: username,
      email: email,
      password: password,
      profile: file
    }
    console.log("formData", formData);

    const something = await registerValidate(formData);

    console.log("something",something);


    var len = Object.keys(something).length;
    console.log("lenght of errors", len);

    if(len === 0){
      console.log("there was all fine");


      let registerPromise = registerUser(formData)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success : <b>Register Successfully...!</b>,
        error : <b>Could not Register.</b>
      });

      registerPromise.then(function(){ navigate('/username')});
    //  let response =  registerUser(formData);

    //  toast.promise(response,{
    //   loading: "Registering User...",
    //   success: <b>Registered Successfully</b>,
    //   error: <b>Couldnot Register..</b>

    //  })

    //  registerPromise.then(function(){ navigate("/login")});
    }
    if(len !== 0){

      console.log("there was some error");
      return ;
    }

    

    setUsername("");
    setEmail("");
    setPassword("");
  }

  return (

    <div className="container mx-auto">

    <Toaster position='top-center' reverseOrder={false}></Toaster>

    <div className='flex justify-center items-center h-screen'>
      <div className={styles.glass} style={{ width: "45%", paddingTop: '3em'}}>

        <div className="title flex flex-col items-center">
          <h4 className='text-5xl font-bold'>Register</h4>
          <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Happy to join you!
          </span>
        </div>

        <form className='py-1' onSubmit={handleRegisterForm} >
            <div className='profile flex justify-center py-4'>
                <label htmlFor="profile">
                  <img src={file || "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"} className={styles.profile_img} alt="avatar" />
                </label>
                
                <input onChange={onUpload}  type="file" id='profile' name='profile' />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
                <input onChange={(e)=>setEmail(e.target.value)}  className={styles.textbox} type="email" placeholder='Email*' />
                <input onChange={(e)=>setUsername(e.target.value)}  className={styles.textbox} type="text" placeholder='Username*' />
                <input onChange={(e)=>setPassword(e.target.value)} className={styles.textbox} type="password" placeholder='Password*' />
                <button className={styles.btn} type='submit'>Register</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>Already Register? <Link className='text-red-500' to="/">Login Now</Link></span>
            </div>

        </form>

      </div>
    </div>
  </div>



    // <div className="container mx-auto">


    // <Toaster position='top-center' reverseOrder="false" ></Toaster>
    // <div className='flex justify-center items-center h-screen'>
    //   <div className={styles.glass}>
    
    //     <div className="title flex flex-col items-center">
    //       <h4 className='text-5xl font-bold'>Hello Again!</h4>
    //       <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
    //         Explore More by connecting with us.
    //       </span>
    //     </div>
         
    //     <form onSubmit={handleformSubmit} className='py-1' >
    //         <div className='profile flex justify-center py-4'>
    //             <img src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" className={styles.profile_img} alt="avatar" />
    //         </div>
    
          
    
    //         <div className='textbox flex flex-col items-center gap-6'>
    //                    <input
    //                    onChange={(e)=>setPassword(e.target.value)}
    //                     className={styles.textbox} type="password" placeholder="Password" />
    //                    <button className={styles.btn} type='submit'>Sign In</button>
    //                </div>
    
    //         <div className="text-center py-4">
    //           <span className='text-gray-500'>Forgot Password <Link className='text-red-500' to="/recovery">Recover Now</Link></span>
    //         </div>
    
    //     </form>
    
    //   </div>
    // </div>
    // </div>
    
  )
}

export default Register;