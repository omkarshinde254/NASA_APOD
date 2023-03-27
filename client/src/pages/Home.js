import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Home = () => {
    const navigate = useNavigate();

    function apod() {
        console.log('Calling apod api');
    }

    useEffect(() => {
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

    return (
    <div>
        <h1>Hello World</h1>
    </div>)
};

export default Home;
