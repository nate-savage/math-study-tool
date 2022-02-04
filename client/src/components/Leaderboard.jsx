import React, { useDebugValue } from 'react';


const Leaderboard = (props) => {
    const { users } = props
    // console.log(users)
    return (
        <div style={{"border-style":"solid",width:"250px","margin":"auto", "margin-top":"15px"}}>
            <h2>LEADERBOARD</h2>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>ELO</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>

                {users.map((u, i) => {
                    return (
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{u.user_name}</td>
                            <td>{u.elo}</td>
                        </tr>
                    )
                })}
            </table>
        </div>)
        ;
};

export default Leaderboard;
