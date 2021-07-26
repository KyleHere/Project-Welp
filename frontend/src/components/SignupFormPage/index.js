import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupForm.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  // const [showErrors, setShowErrors] = useState(false);

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    else if(password !== confirmPassword){
      return setErrors(['Confirm Password field must be the same as the Password field']);
    }
    // if()
  };


  return (
  <div className='formContainer'>
    <div className='signupForm'>
      <form
        onSubmit={handleSubmit}
        className='signupInfo'
      >
          <input
            className='signupInput'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
           placeholder='Email'
          />
          <input
            className='signupInput'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder='Username'
            />
          <input
            className='signupInput'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
            />
          <input
            className='signupInput'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder='Confirm Password'
            />
        <div className='signupSubmitDiv'>
          <button className='signupSubmit' type="submit">Sign Up</button>
        </div>
        <div>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
        </div>
      </form>
    </div>
  </div>
  );
}

export default SignupFormPage;
