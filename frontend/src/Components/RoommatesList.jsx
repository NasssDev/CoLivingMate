import {useState} from "react";
import {ModalMessage} from "./ModalMessage.jsx";

export const RoommatesList = ({roommates, listClassName}) => {

    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleConfirm = () => {
        fetch("http://localhost:1200/kick_roommate", {
            method: 'POST',
            headers: new Headers({
                "Content-type": "application/x-www-form-urlencoded"
            }),
            credentials: "include",
            body: new URLSearchParams({
                id_roommate: roommates[0].roommate_id,
                id_flatshare: roommates[0].flatshare_id
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status !== 200) {
                    console.log('en attendant');
                    return;
                }
                setConfirmDelete(false);
            })

    }

    return (<>
            <ul className={` ${listClassName} mt-2 w-full p-2 rounded-md lg:w-3/4`}>
                {roommates.map((roommate, index) => {
                    return <li
                        className={`relative font-semibold p-1 border-b border-b-gray-500 text-center last:border-b-0`}
                        key={roommate?.roommate_id}>{roommate?.roommate_firstname + " " + roommate?.roommate_lastname + " : "}
                        <p className={"font-normal text-sm text-gray-700"}>
                            {"email : " + roommate?.roommate_email}
                            <br/>
                            {"birth date : " + roommate?.roommate_birthdate}
                            <br/>
                            {"Joined : " + roommate?.roommate_joindate}
                        </p>
                        <svg key={index + "svg"} onClick={() => {
                            setConfirmDelete(true)
                        }}
                             width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="absolute top-1 right-0 rounded-md p-0.5 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:cursor-pointer">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <line x1="17" x2="22" y1="8" y2="13"/>
                            <line x1="22" x2="17" y1="8" y2="13"/>
                        </svg>
                    </li>
                })}
            </ul>
            {confirmDelete &&
                <ModalMessage message={"Are you sure that you want to kick this roommate ?"} buttonName={"Confirm"}
                              setConfirmDelete={setConfirmDelete} handleAction={handleConfirm}/>
            }
        </>
    )
}