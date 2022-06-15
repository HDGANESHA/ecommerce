
import { AiOutlineUser, AiOutlineUsergroupAdd, AiOutlineFolderOpen, AiOutlineLogin, AiOutlineMenuUnfold } from "react-icons/ai";
import Customers from "./customers";
import SidebarHead from "../component/Sidebarhead/sidebarHead";
import './dasnboardNew.css'

import React, { useState, useEffect } from "react";

function DashboardNew() {

    const [cus, setCus] = useState(null);
    const [ord, setOrd] = useState(null);
    const [user, setUser] = useState(null);

    const call1 = () => {
        fetch("http://localhost/ecommerceapi/api/countcustomer.php")
            .then((res) => res.json())
            .then(
                (result) => {
                    setCus(result);
                    console.log(cus)

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            );
    }
    const call2 = () => {
        fetch("http://localhost/ecommerceapi/api/countorders.php")
            .then((res) => res.json())
            .then(
                (result) => {
                    setOrd(result);
                    console.log(ord)

                },

                (error) => {
                    console.log(error);
                }
            );
    }
    const call3 = () => {
        fetch("http://localhost/ecommerceapi/api/countusers.php")
            .then((res) => res.json())
            .then(
                (result) => {
                    setUser(result);
                    console.log(user)

                },

                (error) => {
                    console.log(error);
                }
            );
    }

    useEffect(() => {
        console.log("checking");
       
        call1();
        call2();
        call3();

    }, []);
    
    return (<>
        <SidebarHead />
        <div className="maincon">


            <div class="row">
                <div class="column">
                    <div class="card">
                        <h3>Customers <AiOutlineUser /></h3>
                        <p>{cus}</p>

                    </div>
                </div>

                <div class="column">
                    <div class="card">
                        <h3>Orders <AiOutlineFolderOpen /></h3>
                        <p>{ord}</p>

                    </div>
                </div>

                <div class="column">
                    <div class="card">
                        <h3>Users <AiOutlineUsergroupAdd /></h3>

                        <p>{user}</p>

                    </div>
                </div>

                <div>
                    <Customers />
                </div>
            </div>
        </div>


    </>);
}

export default DashboardNew;