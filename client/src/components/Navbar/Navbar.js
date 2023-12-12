import React from 'react'
import "./Navbar.css"
import logo from "../../assets/logo.png"
import { Link, NavLink } from "react-router-dom";
import { AppstoreOutlined, DatabaseFilled, PlusCircleFilled, ProfileFilled, SettingFilled } from "@ant-design/icons";

const Navbar = () => {
    return (
        <nav>
            <Link to="/" className='logo'>
                <img src={logo} alt="Logo" />
            </Link>
            <div className="list">
                <NavLink activeClassName='activeLink' exact to="/">
                    <span><AppstoreOutlined /></span>
                    <span>Dashboard</span>
                </NavLink>
                <NavLink activeClassName='activeLink' to="/records">
                    <span><DatabaseFilled /></span>
                    <span>Records</span>
                </NavLink>
                <NavLink activeClassName='activeLink' to="/add-record">
                    <span><PlusCircleFilled /></span>
                    <span>Add Record</span>
                </NavLink>
                <NavLink activeClassName='activeLink' to="/profile">
                    <span><ProfileFilled /></span>
                    <span>Account</span>
                </NavLink>
                <NavLink activeClassName='activeLink' to="/settings">
                    <span><SettingFilled /></span>
                    <span>Settings</span>
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar
