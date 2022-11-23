import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate, Link, useSearchParams } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const authCtx = useContext(AuthContext);  
  
  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      alert('please enter password');
      return;
    }
    try {
      setSearchParams(location.search);
      const token = searchParams.get("token");
      const email = searchParams.get("email");
      const data = authCtx.resetPassword(password, token, email);
      console.log("resetPasswordResp", data);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (

    <form
      onSubmit={handleSubmit}
    >
      <h4>reset password</h4>
      <label htmlFor='password' >Password:
        <input
          id='password'
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
        />
      </label>
      <button type='submit' className='btn btn-block'>
        {'New Password'}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
