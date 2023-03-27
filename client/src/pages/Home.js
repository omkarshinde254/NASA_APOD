import React, { useEffect } from "react";
// import jwt from 'jsonwebtoken';
import { useNavigate } from "react-router-dom";

function app () {
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    );
}

/*
function app () {
    const navigate = useNavigate();

    function apod() {
        console.log('Calling apod api');
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwt.decode(token);
            if (user){
                console.log(user);
            }
            else {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    }, []);


    <div>
      <h1>Hello World</h1>
    </div>

}
*/
export default app;
