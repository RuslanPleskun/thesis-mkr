import React, { useEffect, useState } from "react";
import "./Profile.css"
import axios from "axios";
import { Error, Success } from "../../components/Messages/messages";
import { LogoutOutlined, UploadOutlined } from "@ant-design/icons";
import Loading from "../../components/Loading/Loading";
import { logout, setAuthentication } from "../../components/Auth/auth";

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState();
    const [userData, setUserData] = useState({
        email: '',
        username: '',
        fullName: '',
        city: '',
        country: '',
        phone: '',
        picture: {}
    });

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }
    const getUser = async () => {
        window.scrollTo(0, 0);
        setLoading(true);
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/user`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                setUserData(res.data);
            }
            else {
                Error(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err)
            Error(err.message)
        })
    };

    const submitData = async (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        setLoading(true);
        const data = new FormData();
        data.append("email", userData.email);
        data.append("fullName", userData.fullName);
        data.append("username", userData.username);
        data.append("city", userData.city);
        data.append("country", userData.country);
        data.append("phone", userData.phone);
        if (userData.picture) {
            data.append("file", userData.picture);
        }

        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/update`, data, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(async (res) => {
            setLoading(false);
            if (res.status === 200) {
                Success(res.data.successMessage);
                setAuthentication(res.data.user, localStorage.getItem("token"));
                getUser();
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

    useEffect(() => {
        getUser();

        return () => {

        }
    }, []);

    return (
        <div>
            <div className="profile">
                <a className="logout" href="/login" onClick={() => logout(() => { })}><LogoutOutlined /></a>
                <div>
                    {
                        loading ?
                            <Loading />
                            :
                            <div className="flex gap-8">
                                <div className="header">
                                    <h1 className="text-white">Account</h1>
                                    <div className="d-flex justify-content-center my-4">
                                        {
                                            file ?
                                                <img src={file && URL.createObjectURL(file)} alt="User" width="100" className="pro-img" />
                                                :
                                                <img src={userData?.picture ? userData?.picture?.url : "https://www.shareicon.net/data/512x512/2016/09/15/829453_user_512x512.png"} alt="User" width="100" className="pro-img" />
                                        }
                                    </div>
                                    <div className="d-flex justify-content-center items-center">
                                        <label htmlFor="fileInput" className="upload-button">
                                            <button className="p-2 mt-2" style={{ pointerEvents: "none" }}>
                                                <UploadOutlined /> <span>Update</span>
                                            </button>
                                        </label>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            accept="image/*"
                                            onChange={(e) => { setUserData({ ...userData, picture: e.target.files[0] }); setFile(e.target.files[0]) }}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                </div>
                                <div className="inner">
                                    <form onSubmit={submitData}>
                                        <label>Full Name</label>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                label="Full Name"
                                                value={userData?.fullName}
                                                name="fullName"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                label="Email"
                                                value={userData?.email}
                                                name="email"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>Username</label>
                                            <input
                                                type="text"
                                                label="Username"
                                                value={userData?.username}
                                                name="username"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>City</label>
                                            <input
                                                label="City"
                                                value={userData?.city}
                                                name="city"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>Country</label>
                                            <input
                                                type="text"
                                                label="Country"
                                                value={userData?.country}
                                                name="country"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>Phone</label>
                                            <input
                                                type="number"
                                                label="Phone"
                                                value={userData?.phone}
                                                name="phone"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <button className="p-2 mt-5" type="submit">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Profile;
