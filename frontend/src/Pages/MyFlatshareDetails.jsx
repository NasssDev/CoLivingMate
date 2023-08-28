import React, {useContext, useEffect, useState} from "react";
import {RoommatesList} from "../Components/RoommatesList.jsx";
import {ExpendituresList} from "../Components/ExpendituresList.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {ManagementFormRoommates} from "../Components/Forms/ManagementFormRoommates.jsx";
import {ManagementFormFees} from "../Components/Forms/ManagementFormFees.jsx";
import {FormFeesList} from "../Components/Forms/FormFeesList.jsx";
import {MessageStateContext, MyFlatsharesDetailsContext} from "../Utils/Context.jsx";
import {ManagementFormExpenditures} from "../Components/Forms/ManagementFormExpenditures.jsx";
import { DoorOpen } from 'lucide-react';
import {ModalMessage} from "../Components/ModalMessage.jsx";


export const MyFlatshareDetails = () => {

    const {infosModified} = useContext(MyFlatsharesDetailsContext);

    const {
        setSuccessPop,
        setErrorPop,
        setErrorMessage,
        setSuccessMessage,
    } = useContext(MessageStateContext);

    const navigate = useNavigate();

    const {id_flatshare} = useParams();

    const [myFlatshare, setMyFlatshare] = useState([]);

    const [roommateNumber, setRoommateNumber] = useState(0);

    const [roommates, setRoommates] = useState([]);

    const [currentUser, setCurrentUser] = useState({});

    const [images] = useState([
        `https://source.unsplash.com/600x300/?house,${myFlatshare?.flat_share_name || "house"}`,
        `https://source.unsplash.com/600x300/?bedroom,${myFlatshare?.flat_share_name}`,
        `https://source.unsplash.com/600x300/?big kitchen,${myFlatshare?.flat_share_name}`,
        `https://source.unsplash.com/600x300/?full living room,${myFlatshare?.flat_share_name}`,
        `https://source.unsplash.com/600x300/?luxury bathroom,${myFlatshare?.flat_share_name}`
    ]);

    const [selectedImage, setSelectedImage] = useState(images[0]);

    const [popupConfirmLeave, setPopupConfirmLeave] = useState(false);

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
                }
            )
    }, [infosModified]);

    useEffect(() => {
        setCurrentUser(roommates.find((roommate) => roommate.roommate_id === Number(sessionStorage.userId)));
    }, [roommates]);

    const handleLeaveFlatshare = () => {
        fetch(`http://localhost:1200/kick_roommate?id_flatshare=${id_flatshare}&email_roommate=${currentUser.roommate_email}`)
            .then(res => res.json())
            .then(data => {
                if (data.status !== 200) {
                    setErrorPop(true);
                    setErrorMessage(data.data[0]);
                    return;
                }
                setSuccessPop(true);
                setSuccessMessage(`You successfully left the flatshare : ${myFlatshare.flat_share_name} !`);
                navigate('/myflatshares');
            })
    }

    const handleConfirmLeave = () => {
        setPopupConfirmLeave(false);
        handleLeaveFlatshare();
    }

    return (
        <div className="h-full min-h-screen bg-white">
            <div className={"relative"}>
                <h1 className="text-3xl text-indigo-500">My Flat Share Details</h1>
                <span onClick={() => setPopupConfirmLeave(true)}
                    className={"py-2 px-1 absolute right-0 top-0 sm:top-1.5 sm:py-0 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:cursor-pointer rounded-lg "}>
                    <span className={"hidden sm:block float-left"}>Leave</span><DoorOpen className={"float-right"} />
                </span>
            </div>
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
                            <div className={`grid sm:grid-cols-3 `}>
                                <div className={`flex flex-col items-center`}>
                                    <h1 className="font-semibold text-lg text-indigo-800 tracking-wide">Roommates
                                        list
                                    </h1>
                                    <RoommatesList ListClassName={''} id_flatshare={id_flatshare}
                                                   currentUser={currentUser} setMyFlatshare={setMyFlatshare}
                                                   roommates={roommates}/>
                                    {
                                        currentUser !== null
                                        && currentUser?.roommate_role === 1
                                        && <ManagementFormRoommates/>
                                    }
                                </div>
                                <hr className="sm:hidden my-6 border-2 border-gray-300 rounded-r-lg rounded-l-lg"/>
                                <div className={`flex flex-col sm:border-l-2 sm:border-l-gray-300 items-center`}>
                                    <h1 className="font-semibold text-lg text-indigo-800 tracking-wide">Monthly fees
                                    </h1>
                                    {
                                        roommates.some((roommate) => roommate.monthly_fees !== null)
                                        && currentUser !== null
                                        && <FormFeesList currentUser={currentUser} roommates={roommates}/>
                                    }
                                    {
                                        roommates.some((roommate) => roommate.monthly_fees === null)
                                        && <p className="m-auto text-xl text-gray-500">No fees yet !</p>
                                    }
                                    {
                                        currentUser !== null
                                        && currentUser?.roommate_role === 1
                                        && <ManagementFormFees id_flatshare={id_flatshare}/>
                                    }

                                </div>
                                <hr className="sm:hidden my-6 border-2 border-gray-300 rounded-r-lg rounded-l-lg"/>
                                <div className={`flex flex-col sm:border-l-2 sm:border-l-gray-300 items-center`}>
                                    <h1 className="font-semibold text-lg text-indigo-800 tracking-wide">Expenditures
                                    </h1>
                                    {roommates.some((roommate) => roommate.expenditures !== null) ?
                                        <ExpendituresList currentUser={currentUser} ListClassName={'text-center'}
                                                          roommates={roommates}/> :
                                        <p className="m-auto text-xl text-gray-500">No expenditures yet !</p>}
                                    {
                                        currentUser !== null
                                        && currentUser?.roommate_role === 1
                                        &&
                                        <ManagementFormExpenditures id_flatshare={id_flatshare} roommates={roommates}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!!popupConfirmLeave &&
                <ModalMessage
                    message={"Are you sure that you want to leave the flat share ?"} buttonName={"Leave"}
                    setPopupConfirm={setPopupConfirmLeave} handleAction={handleConfirmLeave}/>
            }
        </div>
    )
}