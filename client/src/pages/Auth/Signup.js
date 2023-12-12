import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import Loading from '../../components/Loading/Loading';
import { Error, Success } from '../../components/Messages/messages';
import { Link } from 'react-router-dom';

export const Signup = (props) => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirm: '',
    });

    const { password, confirm } = userData;

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirm) {
            Error("Passwords don't match");
        } else {
            setLoading(true);
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, userData).then(res => {
                setLoading(false);
                if (res.status === 200) {
                    Success(res.data.successMessage);
                    setTimeout(() => {
                        props.history.push('/login')
                    }, 2000);
                }
                else {
                    Error(res.data.errorMessage);
                }
            }).catch(err => {
                setLoading(false);
                console.log(err);
                Error(err.message)
            })
        }
    };

    return (
        loading
            ?
            <Loading />
            :
            <>
                <div className='auth'>
                    <div className="auth-inner-bubble-container">
                        <h2>Create account</h2>
                        <form onSubmit={submitHandler}>
                            <div className='item'>
                                <label>Full Name</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-user"></i></span>
                                    <input name='fullName' type="text" className="form-control" placeholder="Full Name" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Email</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='email' type="text" className="form-control" placeholder="Email" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Username</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='username' type="text" className="form-control" placeholder="Username" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Password</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                                    <input name='password' type="password" className="form-control" placeholder="Password" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Retype Password</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                                    <input name='confirm' type="password" className="form-control" placeholder="Retype Password" onChange={handleChange} />
                                </div>
                            </div>
                            <button className='btn' type="submit">Signup</button>
                        </form>
                        <div className='end-text'>
                            <div>Already have an account?</div>
                            <Link to="/login">
                                <b className='fw-bold'>Login</b>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
    );
};
