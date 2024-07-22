import React, {useEffect, useRef, useState, useId} from 'react'
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { uuid } from './uuid';
import '../Login.css';


function Signup() {
  const history=useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [userId] = useState(uuid());
  console.log(userId);


  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);


  const [email, setEmail]=useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);


  const [password, setPassword]=useState('')

  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const REGISTER_URL = '/signup';


  useEffect(() => {
    userRef.current.focus(); //obtained off first render of signup page 
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result); //element now true 
  }, [user]) //only run this when user state changed 

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result); //password is true 
    const match = pwd === matchPwd;
    setValidMatch(match); //passwords match 
  }, [pwd, matchPwd])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result); //password is true 
  }, [email])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])





  async function submit(e){
    e.preventDefault();

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if(!v1 || !v2){
        setErrMsg("Invalid Entry");
        return;
    }
    try{
        await axios.post("http://localhost:3001/signup", {
            //userId,user,email,pwd
            user,pwd,email
        })
        .then(res=>{
            if(res.data==="exist"){
                alert("User exists")
                //history("/home", {state:{id:email}})
            }
            else if(res.data==="notexist"){
                history("/task", {state:{id:user}, theUid:{id:userId}})
                //history("/home", {state:{id:email}})
            }
        })
        .catch(e=>{
            alert("Wrong details")
            console.log(e);
        })
    }catch(e){
        console.log(e);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if(!v1 || !v2){
        setErrMsg("Invalid Entry");
        return;
    }

    try{
        console.log("\n\n\n\nHere\n\n\n\n\n")
        console.log(user)
        await axios.post("http://localhost:3001/signup", {
            //userId,user,email,pwd
            user, pwd, email
            //user,email,pwd
        })
        .then(res=>{
            console.log(res);
            /*
            if(res.data==="exist"){
                alert("User exists")
                //history("/home", {state:{id:email}})
            }
            else if(res.data==="notexist"){
                history("/task", {state:{id:user, uid:userId}})
                //history("/home", {state:{id:email}})
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
    { success ? (
        <section>
            <h1>Success</h1>
            <p>
                <Link to="/">Sign In</Link>
            </p>
        </section>
    ) : (
        <div className="body">
            <div className="wrapper">
                <div className="signup">
                    <form action="POST" onSubmit={handleSubmit}>
                        <p ref={errRef} className={errMsg ? "errmsg" :
                        "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Signup</h1>
                        <div className="input-box">
                            <label htmlFor='username'>
                                <span className={validName ? "valid" : "hide"}>
                                    <i class="bi bi-check"></i>
                                </span>
                                <span className={validName || !user ?  "hide" :
                                "invalid"}>
                                    <i class="bi bi-x"></i>
                                </span>
                            </label>
                            <input 
                                type="text"
                                id="username"
                                placeholder='User Name'
                                ref={userRef} //used to obtain this element upon 1st render
                                autoComplete='off'
                                onChange={(e) => setUser(e.target.value)}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby='uidnote'
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote" className={userFocus && user &&
                                !validName ? "instructions" : "offscreen"}>
                                    4 to 24 characters.<br />
                                    Must begin wtih a letter.<br />
                                    Letters, numbers, underscores, hyphens allowed.
                             </p>
                        </div>
                        <div className="input-box">
                            

                            <label htmlFor='email'>
                                <span className={validEmail ? "valid" : "hide"}>
                                    <i class="bi bi-check"></i>
                                </span>
                                <span className={validEmail || !email ?  "hide" :
                                "invalid"}>
                                    <i class="bi bi-x"></i>
                                </span>
                            </label>
                            <input 
                                type="email"
                                id="email"
                                placeholder='Email'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby='emailnote'
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <p id="emailnote" className={emailFocus && !validEmail ? "instructions" :
                                "offscreen"}>
                                    Figure it out. <br />
                             </p>

                        </div>
                        <div className="input-box">
                            <label htmlFor='password'>
                                <span className={validPwd ? "valid" : "hide"}>
                                    <i class="bi bi-check"></i>
                                </span>
                                <span className={validPwd || !pwd ?  "hide" :
                                "invalid"}>
                                    <i class="bi bi-x"></i>
                                </span>
                            </label>
                            <input 
                                type="password"
                                id="password"
                                placeholder='Password'
                                onChange={(e) => setPwd(e.target.value)}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby='pwdnote'
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" :
                                "offscreen"}>
                                    8 to 24 characters.<br />
                                    Must include uppercase and lowercase letters, a number and a special
                                    character.<br />
                                    Allowed special characters: <span aria-label="exclamation mark">!</span>
                                    <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                                    <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                             </p>

                        </div>
                        <div className="input-box">
                            <label htmlFor='confirm_pwd'>
                                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                    <i class="bi bi-check"></i>
                                </span>
                                <span className={validMatch || !matchPwd ?  "hide" :
                                "invalid"}>
                                    <i class="bi bi-x"></i>
                                </span>
                            </label>
                            <input 
                                type="password"
                                id="confirm_pwd"
                                placeholder='Confirm Password'
                                onChange={(e) => setMatchPwd(e.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby='confirmnote'
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" :
                                "offscreen"}>
                                    Must match the first password input field.
                             </p>

                        </div>
                        <div className="remember-forgot"> 
                            {/*<label><input type="checkbox"/> REmember Me</label>*/}
                            {/*<Link to="#">Forgot Password</Link>*/}
                        </div> 
                        
                       {/* <input  disabled={!validName || !validPwd || !validMatch ? true : false} */}
                       {/*        className="btn"  */}
                       {/*        type="submit"     */}
                       {/*        onClick={submit}/>  */}

                        <button  disabled={!validName || !validPwd || !validMatch ? true : false}
                        className="btn">Sign Up</button>

                        <div className="login-link">
                            <p>Already have an account? <Link to="/">Login</Link></p>
                        </div>
                    </form>

                    {/*<Link to="/">Login</Link>*/}
                </div>
            </div>
        </div>
        )}
    </>
  )
}

export default Signup