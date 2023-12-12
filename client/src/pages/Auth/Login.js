import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setAuthentication } from '../../components/Auth/auth';
import './Auth.css';
import Loading from '../../components/Loading/Loading';
import { Error, Success } from '../../components/Messages/messages';

export const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = userData;

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  }


  const submitHandler = async () => {
    window.scrollTo(0, 0);
    setLoading(true);
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, { email, password }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        setAuthentication(res.data, res.data.token);
        Success(res.data.successMessage);
        props.history.push('/profile');
        document.location.reload();
      }
      else {
        Error(res.data.errorMessage);
      }
    }).catch(err => {
      setLoading(false);
      console.log(err);
      Error(err.message)
  })
  };


  return (
    <>
      <div className='auth'>
        <div className="auth-inner-bubble-container">
          <h2>Login</h2>
          <p>Login with email and password</p>
          {
            loading
              ?
              <Loading />
              :
              <form onSubmit={submitHandler}>
                <div className='item'>
                  <label>Email</label>
                  <div className="input-group">
                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                    <input name='email' type="text" className="form-control" placeholder="Email" onChange={handleChange} />
                  </div>
                </div>
                <div className='item'>
                  <label>Password</label>
                  <div className="input-group">
                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                    <input name='password' type="password" className="form-control" placeholder="Password" onChange={handleChange} />
                  </div>
                </div>
                <button className='btn' type="submit">Login</button>
              </form>
          }
          <div className='end-text'>
            <div>Don't have an account?</div>
            <Link to="/signup">
              <b className='fw-bold'>Register</b>
            </Link>
          </div>
        </div>
      </div>
    </ >

  );
}
