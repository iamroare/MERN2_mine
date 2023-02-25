import React, { useEffect, useState } from 'react'
import {  toast, Toaster} from 'react-hot-toast';
// import { resetPasswordValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';
import styles from "../styles/Username.module.css";
import { resetPassword } from '../helper/helper';
import { Navigate, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook';

 
const Reset = () => {
  const navigate =useNavigate();


  const {username} =useAuthStore(state=>state.auth);

 const [{isLoading,apiData, status, serverError}] =  useFetch("createResetSession");


 useEffect(()=>{
  console.log(apiData);
 })
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword]= useState("");

 const handleformSubmit = async (e) =>{
    e.preventDefault();

    if(password !== confirmPassword){
       return toast.error("new password & confirm new password did not match");
  }
  if(password === confirmPassword){
      // errors.message = toast.success("yeah password has been changed");



      let resetPromise = resetPassword({username, password});
      console.log(resetPromise);

      toast.promise(resetPromise,{
        loading: "Updating...",
        success: <b>Reset Successfully...!</b>,
        error: <b>Could not Reset!</b>
      });


      resetPromise.then(function(){navigate("/password")});
  }

    // const res= await resetPasswordValidate(password, confirmPassword);

    // console.log(res);

    // var len = Object.keys(res).length;
    // console.log(len);

    // if(len ===0){

     
     
    // }
    console.log("newpassword", password);
    console.log("newConfirmPassword", confirmPassword);

    setPassword("");
    setConfirmPassword("");
 }


 if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>

  if(serverError) return <h1 className='text-xl text-red'>{serverError.message}</h1>


  if(status && status !==201){
    return <Navigate to="/password" replace="true"></Navigate>
  }
  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{ width : "50%"}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Reset</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter new password.
            </span>
          </div>

          <form className='py-20' onSubmit={handleformSubmit} >
              <div className="textbox flex flex-col items-center gap-6">
                  <input  className={styles.textbox} type="text" onChange={(e)=>{setPassword(e.target.value)}} placeholder='New Password' />
                  <input  className={styles.textbox} type="text" onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder='Repeat Password' />
                  <button className={styles.btn} type='submit'>Reset</button>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Reset