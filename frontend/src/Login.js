import React from 'react'

const Login = () => {   
        return(
            <div className="login-form">
                <h1>Login Form</h1>
                <form>
                    <input type="text" name="username" placeholder="Username" required></input>
                    <input type="password" name="password" placeholder="Password" required></input>
                    <input input type="submit"></input>
                </form >
            </div>        

        )
    
};
export default Login;