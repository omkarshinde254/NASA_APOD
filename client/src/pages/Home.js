import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import M from 'materialize-css';
import { saveAs } from 'file-saver';


const Home = () => {
    const baseurl = process.env.REACT_APP_BASE_URL;
    const [apod_data, setApodData] = useState({});
    const navigate = useNavigate();
    const [count, setDateCtr] = useState(() => { return 0 });
    // const [usertoken, setUserToken] = useState(null);

    // function logout() {
    //     localStorage.removeItem('token');
    //     navigate('/login');
    // }

    const options = {}
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.datepicker');
        var instances = M.Datepicker.init(elems, options);
    });

    async function download_img(url) {
        M.toast({ html: 'Downloading ...', classes: 'green black-text' })
        const name = url.split('/').pop();
        // console.log(name);
        let proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=';
        let blob = await fetch(proxyUrl + url).then((r) => r.blob());
        saveAs(blob, name);
    }

    async function apod() {
        // console.log('Calling apod api');
        let fetch_date = new Date()
        // console.log("Fetch Date", fetch_date);
        // console.log("Count", count);
        fetch_date.setDate(fetch_date.getDate() + count);
        if (fetch_date > new Date()) {
            fetch_date = new Date();
        }
        let offset = fetch_date.getTimezoneOffset();
        fetch_date.setMinutes(fetch_date.getMinutes() - offset);
        let year = fetch_date.getFullYear();
        let month = (fetch_date.getMonth() + 1).toString().padStart(2, "0");
        let day = fetch_date.getDate().toString().padStart(2, "0");
        let estfetch_date = `${year}-${month}-${day}`;
        // console.log(estfetch_date);

        // console.log("Final Fetch Date", fetch_date.toISOString().split('T')[0]);
        const response = await fetch(baseurl + '/api/nasa_apod?'
            + new URLSearchParams({ date: estfetch_date })
            , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

        const data = await response.json();
        setApodData(data);
    }

    function incrementDateCtr() {
        setDateCtr(prevCount => prevCount + 1);
        if (count > 0) {
            setDateCtr(prevCount => prevCount - prevCount);
        }
    }

    function decrementDateCtr() {
        setDateCtr(prevCount => prevCount - 1);
    }

    useEffect(() => {
        apod();
    }, [count]);

    useEffect(() => {
        if (count == 0) {
            document.getElementById('forward_date').classList.add('disabled');
        }
        else {
            document.getElementById('forward_date').classList.remove('disabled');
        }
    }, [count]);

    // async function onClickHandler(v) {
    //     if (v === 'l') {
    //         await setDateCtr(date_ctr - 1);
    //     }
    //     else if (v === 'r') {
    //         await setDateCtr(date_ctr + 1);
    //     }

    //     if (date_ctr > 0) {
    //         await setDateCtr(0);
    //     }

    //     // console.log(date_ctr)
    //     await apod();
    // }

    useEffect(() => {
        // const token = localStorage.getItem('token');
        // if (token) {
        //     const user = JSON.parse(atob(token.split('.')[1]));
        //     // console.log("Decoded Token", user);
        //     if (user) {
        //         void 0;
        //         // console.log("Returning user");
        //         // setUserToken(JSON.parse(atob(localStorage.getItem('token').split('.')[1])));
        //         // const usertoken = 
        //         // setUserToken(user);
        //         // console.log("Setting  up user state")
        //     }
        //     else {
        //         localStorage.removeItem('token');
        //         navigate('/login');
        //         return;
        //     }
        // }
        // else {
        //     navigate('/login');
        //     return;
        // }
        apod();
    }, []);
    // const usertoken = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
    // setUserToken(user);

    return (
        <div className="row" style={{ padding: "0px 0px 0px 0px" }}>
            <div className="col s10" style={{ padding: "2px 2px 2px 2px" }}>
                <img src={apod_data.url}
                    style={{ width: "100%", height: "99vh" }}
                    alt="Hmm ... Maybe Image is not available for this date."
                >
                </img>
            </div>
            <div className="col s2 left-align" style={{ paddingLeft: "20px" }}>
                <div className="row">
                    <h5 className="pink-text center-align">-- Welcome to --</h5>
                </div>
                <div className="row">
                    <h6 className="font-bold indigo-text">Astronomy Picture of the Day</h6>
                    {/* <div className="divider"></div> */}
                    <input type="text" class="datepicker" />
                    <br></br>
                    <div className="row">
                        <div className="col s6 center-align">
                            <button className="btn waves-effect pink" style={{ width: "70%" }}
                                onClick={(e) => decrementDateCtr()}
                            // onClick={apod}
                            >
                                <i className="material-icons" style={{ fontSize: "25px" }}>chevron_left</i>
                            </button>
                        </div>
                        <div className="col s6 center-align">
                            <button className="btn waves-effect pink" style={{ width: "70%" }}
                                onClick={(e) => incrementDateCtr()}
                                id="forward_date"
                            // onClick={apod}
                            >
                                <i className="material-icons" style={{ fontSize: "25px" }}>chevron_right</i>
                            </button>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <h6> <div className="font-bold">Title: </div> {apod_data.title}</h6>
                    <h6> <div className="font-bold">Date: </div> {apod_data.date}</h6>
                    <h6> <div className="font-bold">CopyRight: </div> {apod_data.copyright}</h6>
                </div>

                <div className="row right-align">
                    <div className="col s2" style={{ position: "fixed", bottom: "10vh", right: "0", width: "100%" }}>
                        <button className="btn btn-large waves-effect orange" style={{ width: "15.5%" }}
                            onClick={() => download_img(apod_data.hdurl)}
                        >
                            Download HD <i className="material-icons" style={{ fontSize: "20px" }}>cloud_download</i>
                        </button>
                    </div>
                </div>

                <div className="row right-align">
                    <div className="col s2" style={{ position: "fixed", bottom: "1vh", right: "0", width: "100%" }}>
                        <button className="btn btn-large waves-effect green" style={{ width: "15.5%" }}
                            onClick={() => download_img(apod_data.url)} >
                            Download <i className="material-icons" style={{ fontSize: "20px" }}>file_download</i>
                        </button>
                    </div>
                </div>


                {/* <div className="row right-align">
                    <div className="col s2" style={{ position: "fixed", bottom: "1vh", right: "0", width: "100%" }}>
                        <button className="btn btn-large waves-effect indigo" style={{ width: "15.5%" }} onClick={logout} >
                            Logout
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    )
};

export default Home;
