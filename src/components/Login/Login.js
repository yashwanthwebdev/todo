import React from 'react'
import style from './Login.module.css'
import {useState, useEffect} from 'react'
import { ConsoleSqlOutlined } from '@ant-design/icons';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {auth} from '../Firebase-utils/Firebase-config'
// import ToDoList from '../ToDoList';


function Login(props) {

  const [ loginEmailId, setLoginEmailId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmailId, setRegisterEmailId] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registrationResult, setRegistrationResult] = useState(false);
  const [loginError, setLoginError] = useState("")
//  const [user,setUser] = useState(null)

  const registerUser = async () => {
    console.log("registerd credentials are  ", registerEmailId, " ", registerPassword);
    try {
      const tempUser = await createUserWithEmailAndPassword(auth, registerEmailId,registerPassword)
      console.log("registration successfully done. user is ", tempUser);
      setRegistrationResult(true);
    }
    catch (error){
      console.log("error is ", error)
    }
  }

  const loginUser = async () => {
    console.log("login credentials are ", loginEmailId, " " , loginPassword)
   try {
    const result = await signInWithEmailAndPassword(auth, loginEmailId, loginPassword)
      console.log("login is successfull! ", result);
     
  
   }
   catch (error) {
     console.log("Wrong username/password ");
     setLoginError("Wrong username/password")
   }
  }


  useEffect ( ()=> {
    onAuthStateChanged( auth, (currentUser) => {
       props.setUser(currentUser);
      console.log("auth state changed to", currentUser);
        setLoginError("")
     })
  },[])

  const logout = async () => {
    signOut(auth);
  }

  return (
    <div className={style.mainContainer}>
      
       
      { props.user ? <div>  

        <button className={style.logoutButton} onClick={(event)=> {
      logout(event);
     }}>Logout</button>

  
      </div> : <>
   
      <div>
        <div> 
            <span>email id</span>
            <input type="text" onChange={ (event) => {
              setLoginEmailId(event.target.value)
            }}/>
        </div>


        <div> 
            <span>password </span>
            <input type="text"   onChange={ (event) => {
              setLoginPassword(event.target.value)
            }}/>
        </div>
        <button onClick={(event) => {loginUser()}}>login</button>


        <span className={style.loginError}>{loginError}</span>
            </div>

        <span> or </span>


            <div>
        <div> 
            <span>email id</span>
            <input type="text"   onChange={ (event) => {
              setRegisterEmailId(event.target.value)
            }}/>
        </div>


        <div> 
            <span>password </span>
            <input type="text"   onChange={ (event) => {
              setRegisterPassword(event.target.value)
            }}/>
        </div>
 
        <button onClick={(event) => {registerUser()}}>register</button>
        {registrationResult==true? <span>registration successfull!</span>: <></>}
       
 
        </div>
    
      </>}


     


    </div>
  )
}

export default Login