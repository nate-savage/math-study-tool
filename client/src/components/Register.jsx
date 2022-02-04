import React, { useState } from 'react';
import axios from 'axios';

const Register = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userName, setUserName] = useState("")
  const[confirmP,setConfirmP]=useState("")
  const [errors, setErrors] = useState([])

  const sumbitForm = (e) => {
    e.preventDefault();
    //make axios call
    // console.log("loggin in")
    const sendMe = { "email": email, "password": password, "user_name": userName ,"confirmPassword":confirmP}
    setPassword("")
    setConfirmP("")
    // console.log(sendMe)
    axios.post("http://localhost:8000/api/register", sendMe)
      .then(res => {
        // console.log(res.data)
        // console.log(res)
        // console.log("this worked")
        props.setLoggedIn(true)
        props.setUser(res.data.user)
        props.setUsersFlag(props.usersFlag+1)
      })
      .catch(err => {
        // console.log(err.response.data.errors)
        const base = err.response.data.errors
        const errArr = []
        for (let key in base) {
          // console.log(key)
          errArr.push(base[key]["message"])
        }
        setErrors(errArr)

      })
  }
  return (
    <div>
      <h2>Create a new Account</h2>
      {errors.map((e, i) => {
        return (
          <p key={i}>{e}</p>
        )
      })}
      <form onSubmit={(e) => sumbitForm(e)}>
        <div>

          <p>Email</p>
          <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div>

          <p>User Name</p>
          <input type="text" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
        </div>
        <div>

          <p>Password</p>
          <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <div>

          <p>Confirm Password</p>
          <input type="password" value={confirmP} onChange={(e) => { setConfirmP(e.target.value) }} />
        </div>
        <button>Register</button>

      </form>
    </div>
  );
};

export default Register;
