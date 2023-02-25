import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "../styles/Username.module.css"
import {  Toaster} from 'react-hot-toast'
// import { useFormik } from 'formik'
import { usernameValidate } from '../helper/validate'
import { useAuthStore } from '../store/store';

const Username = () => {

  // here we are storing the value of typed USERNAME into my store file


 const setUsername=  useAuthStore(state=> state.setUsername);
//  const username = useAuthStore(state =>state.auth.username);

//  useEffect(()=>{
//   console.log("here useeffect username",username);
//  })

const navigate = useNavigate();

const [Username, SETUsername] =useState("");

const handleformSubmit = async  (e) =>{
    e.preventDefault();
    console.log("Username",Username);

    const something = await usernameValidate(Username);

    // here in "something " we are grabbig the errors
    var len = Object.keys(something).length;
    // console.log("length of something",len);

    // console.log("something", something);


    if(len === 0){
      navigate("/password");
    }
    // 




    
    setUsername(Username);
    SETUsername(" ");
}
  return (

<div className="container mx-auto">


<Toaster position='top-center' reverseOrder="false" ></Toaster>
<div className='flex justify-center items-center h-screen'>
  <div className={styles.glass}>

    <div className="title flex flex-col items-center">
      <h4 className='text-5xl font-bold'>Hello Again!</h4>
      <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
        Explore More by connecting with us.
      </span>
    </div>
     
    <form onSubmit={handleformSubmit} className='py-1' >
        <div className='profile flex justify-center py-4'>
            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" className={styles.profile_img} alt="avatar" />
        </div>

      

        <div className='textbox flex flex-col items-center gap-6'>
                   <input
                   onChange={(e)=>SETUsername(e.target.value)}
                    className={styles.textbox} type="text" placeholder="username" />
                   <button className={styles.btn} type='submit'>Lets Go</button>
               </div>

        <div className="text-center py-4">
          <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
        </div>

    </form>

  </div>
</div>
</div>

  )
}

export default Username