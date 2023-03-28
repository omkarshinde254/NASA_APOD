import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Home = () => {
    const [apod_data, setApodData] = useState({});
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('token');
        navigate('/login');
    }

    useEffect(() => {
        async function apod() {
            console.log('Calling apod api');
            const response = await fetch('http://localhost:3001/api/nasa_apod', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const data = await response.json();
            setApodData(data);
        }
        apod();



        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(atob(token.split('.')[1]));
            console.log("Decoded Token", user);
            if (user) {
                console.log(user);
            }
            else {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
        else {
            navigate('/login');
        }
    }, []);

    const usertoken = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));

    return (
        <div className="row" style={{ padding: "0px 0px 0px 0px" }}>
            <div className="col s10" style={{ padding: "2px 2px 2px 2px" }}>
                <img src={apod_data.hdurl}
                    style={{ width: "100%", height: "99vh" }}>
                </img>
            </div>
            <div className="col s2 left-align" style={{ paddingLeft: "20px" }}>
                <div className="row">
                    <h5>Hey {usertoken.name}!</h5>
                </div>

                <div className="row">
                    <h6>Today's APOD</h6>
                    <h6>Title: {apod_data.title}</h6>
                    <h6>Date: {apod_data.date}</h6>
                    <h6>CopyRight: {apod_data.copyright}</h6>
                </div>

                <div className="row right-align">
                    <div className="col s2" style={{ position: "fixed", bottom: "1vh", right: "0", width: "100%" }}>
                        <button className="btn btn-large waves-effect indigo" style={{ width: "15.5%" }} onClick={logout} >
                            Logout
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default Home;
