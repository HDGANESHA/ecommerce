
import './Dashboard.css'
import Customers from "./customers";
import { useNavigate } from "react-router-dom";
import Sidebar from "../component/sidebar";
import { FaBlackberry } from "react-icons/fa";
function Dashboard() {
    // window.scroll(function () {
    //     navbarScroll();
    // });

    // function navbarScroll() {
    //     var y = window.scrollY;
    //     if (y > 10) {
    //         ('.header').addClass('small');
    //     } else if (y < 10) {
    //         ('.header').removeClass('small');
    //     }
    // }
    let navigate = useNavigate();
    const col = {

        fontfamily: 'sans-serif',
        // marginleft: '1000px',
        // margintop: '800px',

        letterSpacing: '3px'
    }
    const move = () => {
        localStorage.clear();
        navigate('../../');
    }
    const box = {
        boxsizing: 'border-box'
    }
    const name = localStorage.getItem('userName');
    return (
        <>
            <Sidebar />
            <div className="alfi">





                <div className="headerbox">
                   
                    <h1 style={col}>Welcome {name}</h1>

                    <button className="clkbtn" onClick={move}>Sign Out</button>

                </div>
            </div >
            <br />
            <div class="row">
                <div class="column">
                    <div class="card">
                        <h3>Customers</h3>
                        <p>4</p>

                    </div>
                </div>

                <div class="column">
                    <div class="card">
                        <h3>Orders</h3>
                        <p>10</p>

                    </div>
                </div>

                <div class="column">
                    <div class="card">
                        <h3>Users</h3>
                        <p>4</p>

                    </div>
                </div>


            </div>
            <br />

            <div >

                <Customers />
            </div>

        </>
    );
}

export default Dashboard;