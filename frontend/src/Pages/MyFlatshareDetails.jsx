import React, {useContext, useEffect, useState} from "react";
import {RoommatesList} from "../Components/RoommatesList.jsx";
import {ExpendituresList} from "../Components/ExpendituresList.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {ManagementFormRoommates} from "../Components/Forms/ManagementFormRoommates.jsx";
import {ManagementFormFees} from "../Components/Forms/ManagementFormFees.jsx";
import {FormFeesList} from "../Components/Forms/FormFeesList.jsx";
import {MessageStateContext, MyFlatsharesDetailsContext} from "../Utils/Context.jsx";
import {ManagementFormExpenditures} from "../Components/Forms/ManagementFormExpenditures.jsx";
import {ModalMessage} from "../Components/ModalMessage.jsx";
import {RoomImageGallery} from "../Components/RoomImageGallery.jsx";
import {FlatshareInfosCard} from "../Components/FlatshareInfosCard.jsx";
import {HeaderMyFlatshareDetails} from "../Components/HeaderMyFlatshareDetails.jsx";


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

    const images = [
        `https://source.unsplash.com/600x300/?house,${myFlatshare?.flat_share_name}`,
        `https://source.unsplash.com/600x300/?bedroom,${myFlatshare?.flat_share_name}`,
        `https://source.unsplash.com/600x300/?big kitchen,${myFlatshare?.flat_share_name}`,
        `https://source.unsplash.com/600x300/?full living room,${myFlatshare?.flat_share_name}`,
        `https://source.unsplash.com/600x300/?luxury bathroom,${myFlatshare?.flat_share_name}`
    ];

    const [selectedImage, setSelectedImage] = useState(images[0]);

    const [popupConfirmLeave, setPopupConfirmLeave] = useState(false);

    const [popupConfirmDeleteFlatshare, setPopupConfirmDeleteFlatshare] = useState(false);

    const [dataLoaded, setDataLoaded] = useState(false);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    useEffect(() => {
        fetch(`http://localhost:1200/select_infos?id_flatshare=${id_flatshare}`)
            .then(res => res.json())
            .then(data => {
                    if (data.status !== 200) {
                        setErrorPop(true);
                        setErrorMessage(data.data[0]);
                        return;
                    }
                    const roommatesArray = JSON.parse(data.data[0].roommates);
                    setMyFlatshare(data.data[0]);
                    setRoommateNumber(roommatesArray.length);
                    setRoommates(roommatesArray);
                    setDataLoaded(true);
                }
            )
    }, [infosModified]);

    useEffect(() => {
        setCurrentUser(roommates.find((roommate) => roommate.roommate_id === Number(sessionStorage.userId)));
        setSelectedImage(images[0]);
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

    const handleDeleteFlatshare = () => {
        fetch(`http://localhost:1200/delete_flatshare?id_flatshare=${id_flatshare}`)
            .then(res => res.json())
            .then(data => {
                if (data.status !== 200) {
                    setErrorPop(true);
                    setErrorMessage(data.data[0]);
                    return;
                }
                setSuccessPop(true);
                setSuccessMessage(`You successfully deleted the flatshare : ${myFlatshare.flat_share_name} !`);
                navigate('/myflatshares');
            })
    }

    const handleConfirmDeleteFlatshare = () => {
        setPopupConfirmDeleteFlatshare(false);
        handleDeleteFlatshare();
    }

    return (
        !!dataLoaded && (
            <div className="h-full min-h-screen bg-white">

                <HeaderMyFlatshareDetails setPopupConfirmLeave={setPopupConfirmLeave}/>
                <div className="mt-4">
                    <h1 className="font-semibold text-xl tracking-wide">{myFlatshare?.flat_share_name}</h1>
                    <RoomImageGallery images={images} selectedImage={selectedImage} handleImageClick={handleImageClick}/>
                    <FlatshareInfosCard currentFlatshare={myFlatshare} roommates={roommates}/>
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
                                            currentUser?.roommate_role === 1
                                            && <ManagementFormRoommates/>
                                        }
                                    </div>
                                    <hr className="sm:hidden my-6 border-2 border-gray-300 rounded-r-lg rounded-l-lg"/>
                                    <div className={`flex flex-col sm:border-l-2 sm:border-l-gray-300 items-center`}>
                                        <h1 className="font-semibold text-lg text-indigo-800 tracking-wide">Monthly fees
                                        </h1>
                                        {
                                            roommates.some((roommate) => roommate.monthly_fees !== null)
                                            && <FormFeesList currentUser={currentUser} roommates={roommates}/>
                                        }
                                        {
                                            roommates.some((roommate) => roommate.monthly_fees === null)
                                            && <p className="m-auto py-6 text-xl text-gray-500">No fees yet !</p>
                                        }
                                        {
                                            currentUser?.roommate_role === 1
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
                                            <p className="m-auto py-6 text-xl text-gray-500">No expenditures yet !</p>}
                                        {
                                            currentUser?.roommate_role === 1
                                            &&
                                            <ManagementFormExpenditures id_flatshare={id_flatshare}/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-2 flex justify-end">
                        <button onClick={() => setPopupConfirmDeleteFlatshare(true)}
                                className={"p-3 rounded-md bg-red-600 hover:bg-red-500 text-white"}>Delete Flatshare
                        </button>
                    </div>
                </div>

                {!!popupConfirmLeave &&
                    <ModalMessage
                        message={"Are you sure that you want to leave the flat share ?"} buttonName={"Leave"}
                        setPopupConfirm={setPopupConfirmLeave} handleAction={handleConfirmLeave}/>
                }
                {!!popupConfirmDeleteFlatshare &&
                    <ModalMessage
                        message={"Are you sure that you want to delete the flat share ?"} buttonName={"Delete"}
                        setPopupConfirm={setPopupConfirmDeleteFlatshare} handleAction={handleConfirmDeleteFlatshare}/>
                }

            </div>)
        )
}