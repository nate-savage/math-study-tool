import React, { useState } from 'react';
import axios from 'axios';
import MathProblem from './MathProblem';

const ActiveUser = (props) => {
    const { user, setLoggedIn,setUser ,usersFlag,setUsersFlag} = props
    
    const logout = () => {
        axios.get("http://localhost:8000/api/logout")
        .then(res => {
                setLoggedIn(false)
                setUser({})
                // console.log(res.data)
                // console.log("logged out")

            })
            .catch(err => {
                console.log(err)
            })
        }

        return (
            <div>
                <button onClick={logout}>Logout</button>
                <p>hi {user.user_name}</p>
                <p>your elo is {user.elo}</p>
                <p>try a problem!</p>
                <MathProblem user={user} setUser={setUser} usersFlag={usersFlag} setUsersFlag={setUsersFlag}/>

            </div>
        );
    };

    export default ActiveUser;
