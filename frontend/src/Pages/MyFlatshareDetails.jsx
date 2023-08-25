import React, {useEffect, useState} from "react";
import {RoommatesList} from "../Components/RoommatesList.jsx";
import {FeesList} from "../Components/FeesList.jsx";
import {ExpendituresList} from "../Components/ExpendituresList.jsx";
import {Link, Outlet, useParams} from "react-router-dom";

export const MyFlatshareDetails = () => {

    const {id_flatshare} = useParams();

    const [myFlatshare, setMyFlatshare] = useState([]);

    const [selectedImage, setSelectedImage] = useState(`https://source.unsplash.com/600x300/?house,${myFlatshare?.flat_share_name || "house"}`);

    const [roommateNumber, setRoommateNumber] = useState(0);

    const [roommates, setRoommates] = useState([]);

    const images = [
        `https://source.unsplash.com/600x300/?house,${myFlatshare?.flat_share_name}`,
        `https://source.unsplash.com/600x300/?bedroom,${myFlatshare?.flat_share_name}`,
        `https://source.unsplash.com/600x300/?big kitchen,${myFlatshare?.flat_share_name}`,
        `https://source.unsplash.com/600x300/?full living room,${myFlatshare?.flat_share_name}`,
        `https://source.unsplash.com/600x300/?luxury bathroom,${myFlatshare?.flat_share_name}`
    ];

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    useEffect(() => {
        fetch(`http://localhost:1200/select_infos?id_flatshare=${id_flatshare}`)
            .then(res => res.json())
            .then(data => {
                    const roommatesArray = JSON.parse(data.data[0].roommates);
                    setMyFlatshare(data.data[0]);
                    setRoommateNumber(roommatesArray.length);
                    setRoommates(roommatesArray);
                console.log("BUUG :",roommatesArray);
                }
            )
    }, []);


    return (
        <div className="h-full min-h-screen bg-white">
            <h1 className="text-3xl text-indigo-500">My Flat Share Details</h1>
            <div className="mt-4">
                <h1 className="font-semibold text-xl tracking-wide">{myFlatshare?.flat_share_name}</h1>
                <div className="flex flex-col md:flex-row items-end mt-4">
                    <img src={selectedImage} alt="house"
                         className="w-full rounded-md border border-gray-300 md:w-1/2 mx-auto md:mx-0 md:mr-4 mb-4 md:mb-0"/>
                    <div className="flex flex-wrap justify-center">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`thumbnail-${index}`}
                                className={`w-20 h-20 object-cover border-2 cursor-pointer m-1 ${selectedImage === image ? 'border-indigo-500' : ''}`}
                                onClick={() => handleImageClick(image)}
                            />
                        ))}
                    </div>
                </div>
                <div className={"py-4"}>
                    <img src="/img/localisation.svg" alt="localisation" className={`float-left`}/>
                    <span
                        className="text-gray-500 ml-2">{myFlatshare?.flat_share_address + " - " + myFlatshare?.flat_share_city + " - " + myFlatshare?.flat_share_zip_code} </span>
                    <div className="mt-4 flex justify-between">
                        <div>
                            <span className="text-gray-700">Joined: </span>
                            <span className="text-gray-500">{myFlatshare?.flat_share_start_date}</span>
                        </div>
                        <div>
                            <img src="/img/roommate.svg" alt="roommate"
                                 className="w-10 h-10 rounded-full float-left mr-2"/>
                            <span className="text-gray-400 text-2xl">{roommateNumber}</span>
                            <span className="text-gray-600 text-2xl">/6</span>
                        </div>
                    </div>
                </div>
                <hr className=" border-2 border-indigo-300 rounded-r-lg rounded-l-lg"/>
                <div className="py-4">
                    <div className="flex flex-row flex-wrap">
                        <div className="h-full w-full flex flex-col relative">
                            <div className="absolute right-0 ">
                                <Link to={"modifyexpenses"}>
                                    <div className={"group flex relative"}>
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor"
                                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                             className="text-gray-600 hover:text-indigo-500 hover:cursor-pointer">
                                            <line x1="21" x2="14" y1="4" y2="4"/>
                                            <line x1="10" x2="3" y1="4" y2="4"/>
                                            <line x1="21" x2="12" y1="12" y2="12"/>
                                            <line x1="8" x2="3" y1="12" y2="12"/>
                                            <line x1="21" x2="16" y1="20" y2="20"/>
                                            <line x1="12" x2="3" y1="20" y2="20"/>
                                            <line x1="14" x2="14" y1="2" y2="6"/>
                                            <line x1="8" x2="8" y1="10" y2="14"/>
                                            <line x1="16" x2="16" y1="18" y2="22"/>
                                        </svg>
                                        <span
                                            className="group-hover:opacity-100 transition-opacity bg-gray-100 px-1 text-sm text-indigo-700 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 m-3 mx-auto">
                                        Modify
                                    </span>
                                    </div>
                                </Link>
                            </div>
                            <div className={`grid sm:grid-cols-3 `}>
                                <div className={`flex flex-col items-center`}>
                                    <h1 className="font-semibold text-lg text-indigo-800 tracking-wide">Roommates list
                                    </h1>
                                    <RoommatesList ListClassName={''} roommates={roommates}/>
                                </div>
                                <hr className="sm:hidden my-6 border-2 border-gray-300 rounded-r-lg rounded-l-lg"/>
                                <div className={`flex flex-col sm:border-l-2 sm:border-l-gray-300 items-center`}>
                                    <h1 className="font-semibold text-lg text-indigo-800 tracking-wide">Monthly fees
                                    </h1>
                                    {roommates.some((roommate) => roommate.monthly_fees !== null) ?
                                        <FeesList ListClassName={'text-center'} roommates={roommates}/> :
                                        <p className="m-auto text-xl text-gray-500">No fees yet !</p>}
                                </div>
                                <hr className="sm:hidden my-6 border-2 border-gray-300 rounded-r-lg rounded-l-lg"/>
                                <div className={`flex flex-col sm:border-l-2 sm:border-l-gray-300 items-center`}>
                                    <h1 className="font-semibold text-lg text-indigo-800 tracking-wide">Expenditures
                                    </h1>
                                    {roommates.some((roommate) => roommate.expenditures !== null) ?
                                        <ExpendituresList ListClassName={'text-center'} roommates={roommates}/> :
                                        <p className="m-auto text-xl text-gray-500">No expenditures yet !</p>}
                                </div>
                            </div>
                            <Outlet context={[roommates, setRoommates]}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}