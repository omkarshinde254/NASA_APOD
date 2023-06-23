import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';
import MyDatePicker from "../DatePicker";
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { ArrowSmDownIcon } from '@heroicons/react/solid';
import { CloudDownloadIcon } from '@heroicons/react/solid';
import nasalogo from "../img/nasa.png"
// import { FiDownload } from "react-icons/fi";


const ApodHome = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [apodData, setApodData] = useState({ "T": "M" });
    const [count, setDateCtr] = useState(() => { return 0 });
    const [loading, setLoading] = useState(false);

    async function download_img(url) {
        // M.toast({ html: 'Downloading ...', classes: 'green black-text' })
        const name = url.split('/').pop();
        // console.log(name);
        let proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=';
        // let proxyUrl = 'https://thingproxy.freeboard.io/fetch/';
        let blob = await fetch(proxyUrl + url).then((r) => r.blob());
        saveAs(blob, name);
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

    // To disable forward arrow when date is current date
    useEffect(() => {
        if (count == 0) {
            document.getElementById('incDate').classList.add('disabled-button');
        }
        else {
            document.getElementById('incDate').classList.remove('disabled-button');
        }
    }, [count]);


    // Api Call
    async function apod() {
        try {
            let fetch_date = new Date()
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
            const response = await fetch(baseUrl + '/api/nasa_apod?'
                + new URLSearchParams({ date: estfetch_date })
                , {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

            const data = await response.json();
            if (data.status == 'error')
                alert("NASA API looks down.. Please try again later.");

            setApodData(data);
            // console.log("Apod Data",data);
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { apod(); }, [count]);

    return (
        <div className="flex h-screen bg-[#222831]">
            {/* Part 1 || Image || */}
            <div className="flex-none flex-grow-0 flex-shrink-0 w-10/12 p-0.5">
                <img src={apodData.url} alt="Image might not be available for this date" className="w-full h-full" />
            </div>

            {/* Part 2 || Other Stuff || */}
            <div className="flex-none flex-grow-0 flex-shrink-0 w-2/12 border-s border-l-[#393E46]">
                {/* Logo and Title */}
                <img src={nasalogo} alt="NASA" className="w-auto h-fit pt-4 pl-10 pr-10" />
                {/* <p className="antialiased text-xl font-bold text-center text-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Astronomy Picture of Day</p> */}
                {/* <p className="antialiased text-xl font-bold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Astronomy Picture of Day</p> */}
                <p className="font-mono antialiased text-xl font-bold text-center text-[#EEEEEE]">Astronomy Picture of Day</p>

                {/* Command Center */}
                <hr className="w-9/10 border-[#393E46] mx-2 mt-6 pb-1" />
                <p className="font-mono antialiased text-xl font-bold text-center text-[#EEEEEE] pb-2">Command Center</p>
                {/* Date Picker */}
                <div className="pl-2 pr-2"> <MyDatePicker /> </div>
                {/* arrow icon */}
                <div className="grid grid-cols-2 pt-2">
                    <div className="flex justify-center">
                        <button className="rounded-l-lg rounded-r-lg bg-blue-400 w-20 h-10 flex items-center justify-center bg-[#00ADB5]" onClick={(e) => decrementDateCtr()} >
                            <div> <ChevronLeftIcon className="w-6 h-6 text-[#393E46]" /></div>
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <button id="incDate" className="rounded-l-lg rounded-r-lg bg-blue-400 w-20 h-10 flex items-center justify-center bg-[#00ADB5]" onClick={(e) => incrementDateCtr()}>
                            <div> <ChevronRightIcon className="w-6 h-6 text-[#393E46]" /></div>
                        </button>
                    </div>
                </div>
                {/* Arrows done */}

                {/* Description Text */}
                {/* <div> <span className="font-bold">Title: </span>{apodData.title}</div> */}
                {/* <div> <span className="font-bold">CopyRight: </span>{apodData.copyright}</div> */}
                {/* <div> <span className="font-bold">Date: </span>{apodData.date}</div> */}

                {/* Yellow title floating in left */}
                <div> <span className="font-mono antialiased absolute left-0 top-0 pl-2 pt-2 text-[#FFFF00] text-3xl">{apodData.title} </span> </div>

                <hr className="w-9/10 border-[#393E46] mx-2 mt-4" />
                <p className="font-mono antialiased text-xl font-bold text-center text-[#EEEEEE] pb-2 pt-1">Description:</p>
                <div className="h-56 w-9/10 mx-2">
                    <p className="w-9/10 h-56 antialiased text-base text-[#EEEEEE] overflow-y-auto">Astronomy Picture of Dayaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                </div>
                {/* Description Done */}

                {/* Download Button */}
                <div className="flex-col absolute bottom-0 pl-1/2 w-1/6 pb-2">
                    <hr className="w-9/10 border-[#393E46] mx-2 pb-1" />
                    <p className="font-mono antialiased text-xl font-bold text-center text-[#EEEEEE] pb-2">Download Records</p>
                    <div className="flex item-center justify-center">
                        <button className="rounded-lg w-60 h-10 flex items-center justify-center mb-2 font-semibold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg hover:bg-gradient-to-r hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500"
                            onClick={() => download_img(apodData.hdurl)}>

                            Download HD <CloudDownloadIcon className="w-6 h-6 pl-1 pt-1" />
                        </button>

                    </div>
                    <div className="flex item-center justify-center">
                        <button className="rounded-lg w-60 h-10 flex items-center justify-center mb-2 font-semibold bg-green-500 text-white hover:bg-green-600"
                            onClick={() => download_img(apodData.url)}>
                            Download <CloudDownloadIcon className="w-6 h-6 pl-1 pt-1" />
                        </button>
                    </div>
                    <hr className="w-9/10 border-[#393E46] mx-2 pt-1 -mb-2" />
                </div>
                {/* Download Button Done */}
            </div>
        </div>
    );
}



// const ApodHome = () => {
//     const baseurl = process.env.REACT_APP_BASE_URL;
//     const [apod_data, setApodData] = useState({});
//     const [count, setDateCtr] = useState(() => { return 0 });

//     async function download_img(url) {
//         M.toast({ html: 'Downloading ...', classes: 'green black-text' })
//         const name = url.split('/').pop();
//         // console.log(name);
//         let proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=';
//         let blob = await fetch(proxyUrl + url).then((r) => r.blob());
//         saveAs(blob, name);
//     }

//     async function apod() {
//         // console.log('Calling apod api');
//         let fetch_date = new Date()
//         // console.log("Fetch Date", fetch_date);
//         // console.log("Count", count);
//         fetch_date.setDate(fetch_date.getDate() + count);
//         if (fetch_date > new Date()) {
//             fetch_date = new Date();
//         }
//         let offset = fetch_date.getTimezoneOffset();
//         fetch_date.setMinutes(fetch_date.getMinutes() - offset);
//         let year = fetch_date.getFullYear();
//         let month = (fetch_date.getMonth() + 1).toString().padStart(2, "0");
//         let day = fetch_date.getDate().toString().padStart(2, "0");
//         let estfetch_date = `${year}-${month}-${day}`;
//         // console.log(estfetch_date);

//         // console.log("Final Fetch Date", fetch_date.toISOString().split('T')[0]);
//         const response = await fetch(baseurl + '/api/nasa_apod?'
//             + new URLSearchParams({ date: estfetch_date })
//             , {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             })

//         const data = await response.json();
//         setApodData(data);
//     }

//     function incrementDateCtr() {
//         setDateCtr(prevCount => prevCount + 1);
//         if (count > 0) {
//             setDateCtr(prevCount => prevCount - prevCount);
//         }
//     }

//     function decrementDateCtr() {
//         setDateCtr(prevCount => prevCount - 1);
//     }

//     useEffect(() => {
//         apod();
//     }, [count]);

//     useEffect(() => {
//         if (count == 0) {
//             document.getElementById('forward_date').classList.add('disabled');
//         }
//         else {
//             document.getElementById('forward_date').classList.remove('disabled');
//         }
//     }, [count]);

//     // async function onClickHandler(v) {
//     //     if (v === 'l') {
//     //         await setDateCtr(date_ctr - 1);
//     //     }
//     //     else if (v === 'r') {
//     //         await setDateCtr(date_ctr + 1);
//     //     }

//     //     if (date_ctr > 0) {
//     //         await setDateCtr(0);
//     //     }

//     //     // console.log(date_ctr)
//     //     await apod();
//     // }

//     useEffect(() => {
//         // const token = localStorage.getItem('token');
//         // if (token) {
//         //     const user = JSON.parse(atob(token.split('.')[1]));
//         //     // console.log("Decoded Token", user);
//         //     if (user) {
//         //         void 0;
//         //         // console.log("Returning user");
//         //         // setUserToken(JSON.parse(atob(localStorage.getItem('token').split('.')[1])));
//         //         // const usertoken = 
//         //         // setUserToken(user);
//         //         // console.log("Setting  up user state")
//         //     }
//         //     else {
//         //         localStorage.removeItem('token');
//         //         navigate('/login');
//         //         return;
//         //     }
//         // }
//         // else {
//         //     navigate('/login');
//         //     return;
//         // }
//         apod();
//     }, []);
//     // const usertoken = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
//     // setUserToken(user);

//     return (
//         <div className="row" style={{ padding: "0px 0px 0px 0px" }}>
//             <div className="col s10" style={{ padding: "2px 2px 2px 2px" }}>
//                 <img src={apod_data.url}
//                     style={{ width: "100%", height: "99vh" }}
//                     alt="Hmm ... Maybe Image is not available for this date."
//                 >
//                 </img>
//             </div>
//             <div className="col s2 left-align" style={{ paddingLeft: "20px" }}>
//                 <div className="row">
//                     <h5 className="pink-text center-align">-- Welcome to --</h5>
//                 </div>
//                 <div className="row">
//                     <h6 className="font-bold indigo-text">Astronomy Picture of the Day</h6>
//                     {/* <div className="divider"></div> */}
//                     <input type="text" class="datepicker" />
//                     <br></br>
//                     <div className="row">
//                         <div className="col s6 center-align">
//                             <button className="btn waves-effect pink" style={{ width: "70%" }}
//                                 onClick={(e) => decrementDateCtr()}
//                             // onClick={apod}
//                             >
//                                 <i className="material-icons" style={{ fontSize: "25px" }}>chevron_left</i>
//                             </button>
//                         </div>
//                         <div className="col s6 center-align">
//                             <button className="btn waves-effect pink" style={{ width: "70%" }}
//                                 onClick={(e) => incrementDateCtr()}
//                                 id="forward_date"
//                             // onClick={apod}
//                             >
//                                 <i className="material-icons" style={{ fontSize: "25px" }}>chevron_right</i>
//                             </button>
//                         </div>
//                     </div>
//                     <div className="divider"></div>
//                     <h6> <div className="font-bold">Title: </div> {apod_data.title}</h6>
//                     <h6> <div className="font-bold">Date: </div> {apod_data.date}</h6>
//                     <h6> <div className="font-bold">CopyRight: </div> {apod_data.copyright}</h6>
//                 </div>

//                 <div className="row right-align">
//                     <div className="col s2" style={{ position: "fixed", bottom: "10vh", right: "0", width: "100%" }}>
//                         <button className="btn btn-large waves-effect orange" style={{ width: "15.5%" }}
//                             onClick={() => download_img(apod_data.hdurl)}
//                         >
//                             Download HD <i className="material-icons" style={{ fontSize: "20px" }}>cloud_download</i>
//                         </button>
//                     </div>
//                 </div>

//                 <div className="row right-align">
//                     <div className="col s2" style={{ position: "fixed", bottom: "1vh", right: "0", width: "100%" }}>
//                         <button className="btn btn-large waves-effect green" style={{ width: "15.5%" }}
//                             onClick={() => download_img(apod_data.url)} >
//                             Download <i className="material-icons" style={{ fontSize: "20px" }}>file_download</i>
//                         </button>
//                     </div>
//                 </div>


//                 {/* <div className="row right-align">
//                     <div className="col s2" style={{ position: "fixed", bottom: "1vh", right: "0", width: "100%" }}>
//                         <button className="btn btn-large waves-effect indigo" style={{ width: "15.5%" }} onClick={logout} >
//                             Logout
//                         </button>
//                     </div>
//                 </div> */}
//             </div>
//         </div>
//     )
// };

export default ApodHome;
