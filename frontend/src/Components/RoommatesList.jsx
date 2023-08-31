import {useContext, useState} from "react";
import {ModalMessage} from "./ModalMessage.jsx";
import {MessageStateContext, MyFlatsharesDetailsContext} from "../Utils/Context.jsx";
import {API_URL} from "../Constants/Constants.jsx";

export const RoommatesList = (
    {
        roommates,
        listClassName,
        id_flatshare,
        setMyFlatshare,
        currentUser
    }
) => {

    const { setSuccessPop, setSuccessMessage} = useContext(MessageStateContext);

    const {setInfosModified} = useContext(MyFlatsharesDetailsContext);

    const [popupConfirmDelete, setPopupConfirmDelete] = useState(false);
    const [emailRoommate, setEmailRoommate] = useState("");

    const handleDelete = (email_roommate) => {
        setPopupConfirmDelete(true);
        setEmailRoommate(email_roommate);
    }

    const handleConfirm = () => {
        fetch(`${API_URL}kick_roommate?email_roommate=${emailRoommate}&id_flatshare=${id_flatshare}`)
            .then(res => res.json())
            .then(data => {
                if (data.status !== 200) {
                    console.error('Error :', data.data[0]);
                    return;
                }
                setMyFlatshare(data.data[0]);
                setSuccessMessage(data.message);
                setSuccessPop(true);
                setPopupConfirmDelete(false);
                setInfosModified(current => !current);
            });
    }

    return (<>
            <ul className={` ${listClassName} mt-2 w-full p-2 rounded-md lg:w-3/4`}>
                {roommates.map((roommate, index) => {
                    return <li
                        className={`relative font-semibold py-2 my-4 mx-2 border border-amber-500 bg-amber-50 rounded-lg`}
                        key={roommate?.roommate_id}>
                        <span className={"ml-3"}>{roommate?.roommate_firstname + " " + roommate?.roommate_lastname + " : "}</span>
                        <p className={"font-normal text-sm text-center text-amber-700"}>
                            {"email : " + roommate?.roommate_email}
                            <br/>
                            {"birth date : " + roommate?.roommate_birthdate}
                            <br/>
                            {"Joined : " + roommate?.roommate_joindate}
                        </p>
                        {currentUser?.roommate_role === 1
                            && roommate?.roommate_id !== currentUser?.roommate_id
                            &&
                        <svg key={index + "svg"} onClick={() => {
                            handleDelete(roommate?.roommate_email);
                        }}
                             width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="absolute top-1 right-1 rounded-md p-0.5 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:cursor-pointer">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <line x1="17" x2="22" y1="8" y2="13"/>
                            <line x1="22" x2="17" y1="8" y2="13"/>
                        </svg>
                        }
                    </li>
                })}
            </ul>
            {!!popupConfirmDelete &&
                <ModalMessage
                    message={"Are you sure that you want to kick this roommate ?"} buttonName={"Confirm"}
                    setPopupConfirm={setPopupConfirmDelete} handleAction={handleConfirm}/>
            }
        </>
    )
}