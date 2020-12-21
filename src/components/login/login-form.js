import React, { useState } from 'react';
import './login-form.css';
export default function LoginForm(){
    const [showError, setShoeError]= useState(false)

    const Login = (e) => {
        e.preventDefault()
        setShoeError(!showError)
    }
    return(
        <form className='login-form' onSubmit={(e)=>{Login(e)}}>
            <input type='email' placeholder='Email'/>
            <input type='password' placeholder='Password'/>
            {showError && <p className='error-mesage'>*Error</p>}
            <button>LOGIN</button>
        </form>
    )
}