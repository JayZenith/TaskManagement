import React, { useState } from 'react'
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'
import '../Login.css';

function Login() {

  const history=useNavigate();

  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [userId, setUserID]=useState('')

  async function submit(e){
    e.preventDefault();

    try{
        await axios.post("http://localhost:3001/login", {
            email,password
        })
        .then(res=>{
            if(res.data.error){
                alert(res.data.error);
            }
            else{
                sessionStorage.setItem("accessToken", res.data); 
            }
            /*
            if(res.data.status==="exist"){

                history("/task", {state:{id:res.data.name, uid:res.data.uId}})
            }
            else if(res.data.status==="notexist"){
                alert("User not signed up")
            }
            */
        })
        .catch(e=>{
            alert("Wrong details")
            console.log(e);
        })
    }catch(e){
        console.log(e);
    }
  }

  return (
    <>
        <div className="body">
            <div className="wrapper">
                <div className="signup">
                    <form action="POST">
                        <h1>Login</h1>
                        <div className="input-box">
                            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" required/>
                            <i className="bi bi-envelope"></i>
                        </div>
                        <div className="input-box">
                            <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" required/>
                            <i className="bi bi-lock"></i>
                        </div>
                        <div className="remember-forgot"> 
                            <label><input type="checkbox"/> REmember Me</label>
                            <Link to="#">Forgot Password</Link>
                        </div> 

                        <input className="btn" type="submit" onClick={submit}/>

                        <div className="login-link">
                            <p>No Account? <Link to="/signup">Signup</Link></p>
                        </div>
                    </form>

                    {/*<Link to="/">Login</Link>*/}
                </div>
            </div>
        </div>
    </>
  )
}

export default Login