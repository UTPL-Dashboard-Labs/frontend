import React, { useState } from 'react';
import './login-form.css';
export default function LoginForm(){
    const [showError, setShoeError]= useState(false)
    return(
        <form className='login-form'>
            <input type='email' placeholder='Email'/>
            <input type='password' placeholder='Password'/>
            {showError && <p className='error-mesage'>*Error</p>}
            <button>LOGIN</button>
        </form>
    )
}