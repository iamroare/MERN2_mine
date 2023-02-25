import React, { useState } from 'react'
import covertToBase64 from '../helper/convert';
import { toast, Toaster } from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';
import styles from "../styles/Username.module.css";
import extend from "../styles/Username.module.css";
// import { profileValidate } from '../helper/validate';
import useFetch from '../hooks/fetch.hook';
// import { useAuthStore } from '../store/store';

import { updateUser } from '../helper/helper';



const Profile = () => {
  const navigate = useNavigate();
  // const {username} = useAuthStore(state => state.auth)

  // const [{isLoading, apiData, serverError}] = useFetch(`/user/${username}`);
  const [{isLoading, apiData, serverError}] = useFetch();

  console.log(apiData);
  
  // let e_mail = apiData?.email || "";
  // console.log(e_mail);

  

  let [file, setFile] = useState("");
  let [firstname, setFirstname] = useState("");
  let [lastname, setLastname] =useState("");
  let [mobile, setMobile] = useState("");
  let [email, setEmail] =useState("");
  let [address, setAddress] =useState("");


  const onUpload = async (e)=>{
    const base64 = await covertToBase64(e.target.files[0]);
    setFile(base64);
  }
  const handleSubmitForm = async (e)=>{
    e.preventDefault();

    // console.log(firstname);
    // console.log(lastname);
    // console.log(mobile);
    // console.log(email);
    // console.log(address);
    
    if(file.length ===0){
      file = apiData?.Profile;
    }
    if(firstname.length ===0){
      firstname= apiData?.firstName;
    }

    if(lastname.length ===0){
      lastname = apiData?.lastName;
    }
    if(mobile.length ===0){
      mobile = apiData?.mobile;
    }
    if(email.length ===0){
      email = apiData?.email;
    }
    if(address.length ===0){
      address = apiData?.address;
    }

 
    const formData = {
      // profile: file,
      profile: file,
      firstName: firstname,
      lastName: lastname,
      mobile,
      email,
      address
    }

    let updatePromise = updateUser(formData);

     toast.promise(updatePromise,{
      loading: "Updating...",
      success: <b>Update Successful</b>,
      error: <b>could not update</b>
     })

    // const something = await profileValidate(formData);
    // var len = Object.keys(something).length;

    //  if(len ===0){

     
    //  }
    // console.log(something);
    setFirstname("");
    setLastname("");
    setEmail("");

    
  
  }

  // logout handler function
  function userLogout(){
    localStorage.removeItem("token");
    navigate("/username");

  }


  
  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>

  if(serverError) return <h1 className='text-xl text-red'>{serverError.message}</h1>
  return (
    <div className="container mx-auto">

    <Toaster position='top-center' reverseOrder={false}></Toaster>

    <div className='flex justify-center items-center h-screen'>
      <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%", paddingTop: '3em'}}>

        <div className="title flex flex-col items-center">
          <h4 className='text-4xl font-bold'>Profile</h4>
          <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              You can update the details.
          </span>
        </div>

        <form className='py-1' onSubmit={handleSubmitForm}>
            <div className='profile flex justify-center py-4'>
                <label htmlFor="profile">
                  <img src={ apiData?.profile|| file || "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
                </label>
                
                <input onChange={onUpload} type="file" id='profile' name='profile' />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input 
                // value={apiData?.firstname|| firstname} 
                onChange={e => setFirstname(e.target.value)}
                 className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder={apiData?.firstName || "enter firstName"} />
                <input 
                // value={apiData?.lastname || lastname}
                 onChange={e=> setLastname(e.target.value)} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder={apiData?.lastName || "lastname"} />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                //  value={apiData?.mobile||  mobile} 
                 onChange={e=> setMobile(e.target.value)} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder={apiData?.mobile || "Mobile"} />
                <input 
                // value={ apiData?.email ||  email }
                 onChange={(e)=> setEmail(e.target.value)} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder={apiData?.email || "email"} />
                
              </div>

             
                <input 
                // value={apiData?.address||  address}
                 onChange={e=> setAddress(e.target.value)} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder={apiData?.address || "address"} />
                <button className={styles.btn} type='submit'>Update</button>
             
                
            </div>

            <div className="text-center py-4">
                <span className='text-gray-500'>come back later? <button onClick={userLogout} className='text-red-500' >Logout</button></span>
              </div>

        </form>

      </div>
    </div>
  </div>  
  )
}

export default Profile