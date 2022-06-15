
import { AiOutlineUser, AiOutlineUsergroupAdd, AiOutlineFolderOpen, AiOutlineLogin, AiOutlineMenuUnfold } from "react-icons/ai";

import '../Sidebarhead/sidebarHead.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactDOM from 'react-dom'
import Customers from '../../pages/customers'
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons';
function SidebarHead() {
    let navigate = useNavigate();
    const use = () => {
        navigate('../../pages/users');
    }
    const cat = () => {
        navigate('../../pages/categories');
    }
    const pr = () => {
        navigate('../../pages/profileNew');
    }
    const dashe = () => {
        navigate('../../pages/dashboardNew');
    }
    const move = () => {
        localStorage.clear();
        navigate('../../');
    }

    return (<>
        <div className="whole">
            <input type="checkbox" id="nav-toggle" />

            <div className="sidebars">
                <div classclassName="sidebars-brand">
                    <h2><span className="lab la-accusoft"></span> Eshopee</h2>
                </div>
                <div className="sidebars-menu">
                    <ul>
                        <li onClick={dashe}>

                            <a href="" className="active"><span className="las la-igloo"> <AiOutlineMenuUnfold /></span>

                                <span>Dashboard</span></a>
                        </li>
                        <li onClick={use}>

                            <a href=""><span className="las la-users"><AiOutlineUsergroupAdd /></span>
                                <span>Users</span></a>
                        </li>
                        <li onClick={cat}>

                            <a href=""><span className="las la-clipboard-list"><AiOutlineFolderOpen /></span>
                                <span>Categories</span></a>
                        </li>
                        <li onClick={pr}>

                            <a href=""><span className="las la-user-circle"><AiOutlineUser /></span>
                                <span>Profile</span></a>
                        </li>
                        <li onClick={move}>

                            <a href=""><span><LogoutOutlined /></span>
                                <span>Logout</span></a>
                        </li>

                    </ul>
                </div>
            </div>
            <div className="main-content">
                <header className="headerside">
                    <h2>
                        <label for="nav-toggle">
                            <span className="las la-bars"></span>
                        </label>
                        <AiOutlineMenuUnfold id="btnmov" />
                        <br></br>


                        AdminApp
                    </h2>
                    <div className="search-wrapper">
                        <span className="las la-search"></span>
                        <input type="search" placeholder="Search here" />
                    </div>
                    <div className="user-wrapper">
                        <AiOutlineUser />
                        <div>
                            <h4>{localStorage.getItem('userName')}</h4>
                            <small>Admin</small>
                        </div>
                    </div>
                </header>

            </div>
        </div>
    </>);
}

export default SidebarHead;