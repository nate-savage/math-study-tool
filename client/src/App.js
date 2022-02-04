import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Switch, Route, Link, BrowserRouter, Redirect } from 'react-router-dom';
import Home from './components/Home';

function App() {
  const [user,setUser]=useState({})
  const[loggedIn,setLoggedIn] = useState(false)
  const [users,setUsers]=useState([])
  const[usersFlag,setUsersFlag]=useState(0)
  useEffect(()=>{
    axios.get("http://localhost:8000/api/users")
    .then(res=>{
      let arr = res.data.users
      arr.sort((a, b) => {
        if(a.elo>b.elo){
          return -1
        }
        else{
          return 1
        }
      })
      setUsers(res.data.users)
      // console.log(users)
      // console.log("hi")
      
    })
    .catch(err=>{console.log(err)})
  },[usersFlag])
  return (
    <BrowserRouter>
      <Switch>
        <div className="App">

        <Route exact path="/">
          <h1>Welcome to Math Learning</h1>
          <Home user={user} setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} users={users} setUsersFlag={setUsersFlag} usersFlag={usersFlag}/>

        </Route>
        <Route exact path="/test">
          <h1>test</h1>
        </Route>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
