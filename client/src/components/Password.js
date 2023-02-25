import React, { useState } from 'react'
import {  toast, Toaster} from 'react-hot-toast';
import styles from "../styles/Username.module.css";
import { Link, useNavigate } from 'react-router-dom';
import {passwordValidate} from "../helper/validate";
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store';
import { verifyPassword } from '../helper/helper';


 
const Password = () => {
  const navigate = useNavigate();

  const {username} = useAuthStore(state => state.auth)

 const [{isLoading, apiData, serverError}] = useFetch(`/user/${username}`);
  const [password, setPassword]= useState("");

  const handleformSubmit = async (e) =>{
    e.preventDefault();
  

     const something = await passwordValidate(password);


     var len = Object.keys(something).length;
     if(len ===0){

      let loginPromise = verifyPassword({username,password});
      toast.promise(loginPromise,{
        loading: "checking...",
        success: <b>Login Successful</b>,
        error: <b>Password Not matched</b>
      });

      loginPromise.then(res=>{
        let {token} = res.data;
        localStorage.setItem("token", token);
        navigate("/");
      })

     }

    console.log("password", something);
    setPassword("");
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>

  if(serverError) return <h1 className='text-xl text-red'>{serverError.message}</h1>









  return (
    <div className="container mx-auto">


    <Toaster position='top-center' reverseOrder="false" ></Toaster>
    <div className='flex justify-center items-center h-screen'>
      <div className={styles.glass}>
    
        <div className="title flex flex-col items-center">
          <h4 className='text-5xl font-bold'>Hello {apiData?.firstName || apiData?.username} !</h4>
          <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
            Explore More by connecting with us.
          </span>
        </div>
         
        <form onSubmit={handleformSubmit} className='py-1' >
            <div className='profile flex justify-center py-4'>
                <img src={ apiData?.profile || "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"} className={styles.profile_img} alt="avatar" />
            </div>
    
          
    
            <div className='textbox flex flex-col items-center gap-6'>
                       <input
                       onChange={(e)=>setPassword(e.target.value)}
                        className={styles.textbox} type="password" placeholder="Password" />
                       <button className={styles.btn} type='submit'>Sign In</button>
                   </div>
    
            <div className="text-center py-4">
              <span className='text-gray-500'>Forgot Password <Link className='text-red-500' to="/recovery">Recover Now</Link></span>
            </div>
    
        </form>
    
      </div>
    </div>
    </div>
    
  )
}

export default Password