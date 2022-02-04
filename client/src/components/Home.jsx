import React from 'react';
import axios from 'axios';
import Login from './Login';
import Register from './Register'
import ActiveUser from './ActiveUser';
import Leaderboard from './Leaderboard';


const Home = (props) => {
    const { user, setUser, loggedIn, setLoggedIn, users,setUsersFlag, usersFlag } = props;

    return (
        <div>
            {!loggedIn ?
                <div>
                    <Login setUser={setUser} setLoggedIn={setLoggedIn} />
                    <Register setUser={setUser} setLoggedIn={setLoggedIn} setUsersFlag={setUsersFlag} usersFlag={usersFlag} />
                </div>
                : <ActiveUser setLoggedIn={setLoggedIn} user={user} setUser={setUser} setUsersFlag={setUsersFlag} usersFlag={usersFlag} />
            }
            <Leaderboard users={users}/>
        </div>
    );
}

export default Home;
