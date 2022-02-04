import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const sumbitForm = (e) => {
        e.preventDefault();
        //make axios call
        const sendMe = {"email":email,"password":password}
        setPassword("")
        // console.log(sendMe)
        axios.post("http://localhost:8000/api/login",sendMe)
        .then(res=>{
            props.setLoggedIn(true)
            props.setUser(res.data.user)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={(e) => sumbitForm(e)}>
                <div>

                    <p>Email</p>
                    <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div>

                    <p>Password</p>
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <button>login</button>

            </form>
        </div>
    );
};

export default Login;
