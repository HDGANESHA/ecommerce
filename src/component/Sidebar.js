import React from 'react';
import { RiMenuLine, RiLayoutGridFill, RiChat4Fill, RiTeamFill, RiTaskFill, RiPieChart2Fill } from 'react-icons/ri';
import './Sidebar.css';
import { useNavigate } from "react-router-dom";
function Sidebar() {
    let navigate = useNavigate();

    const dash = () => {
        navigate('../../pages/dashboard');
    }
    const use = () => {
        navigate('../../pages/users');
    }
    const cat = () => {
        navigate('../../pages/categories');
    }
    const pro = () => {
        navigate('../../pages/products');
    }
    const pr = () => {
        navigate('../../pages/profile');
    }


    return (
        <div className="Sidebar">
            <div className="sidebar-header">
                <RiMenuLine className="sidebar-icon" />
                <h1 className="sidebar-logo">Admin</h1>
            </div>
            <div className="sidebar-items">
                <div className="item">
                    <RiLayoutGridFill className="sidebar-icon" />
                    <span className="sidebar-text" onClick={dash}>Dashboard</span>
                </div>
                <div className="item">
                    <RiChat4Fill className="sidebar-icon" />
                    <span className="sidebar-text" onClick={cat}>Categories</span>
                </div>
                <div className="item">
                    <RiTeamFill className="sidebar-icon" />
                    <span className="sidebar-text" onClick={use}>Users</span>
                </div>
                <div className="item">
                    <RiTaskFill className="sidebar-icon" />
                    <span className="sidebar-text" onClick={pro}>Products</span>
                </div>
                <div className="item">
                    <RiPieChart2Fill className="sidebar-icon" />
                    <span className="sidebar-text" onClick={pr}>Profile</span>
                </div>
            </div>
        </div>
    );
}
export default Sidebar;