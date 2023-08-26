import {useContext, useState} from "react";
import {useParams} from "react-router-dom";
import {MessageStateContext} from "../../Utils/Context.jsx";
import {ErrorPop} from "../Popup/ErrorPop.jsx";
import {SuccessPop} from "../Popup/SuccessPop.jsx";

export const ManagementFormRoommates = () => {

    const {
        closePopup,
        successPop,
        setSuccessPop,
        errorPop,
        setErrorPop,
        errorMessage,
        setErrorMessage,
        successMessage,
        setSuccessMessage
    } = useContext(MessageStateContext);

    const {id_flatshare} = useParams();

    const [newRoommate, setNewRoommate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:1200/add_roommate?id_flatshare=${id_flatshare}&new_roommate=${newRoommate}`)
            .then(res => res.json())
            .then(data => {
                    if (data.status !== 200) {
                        setErrorMessage(data.data[0]);
                        setErrorPop(true);
                        return;
                    }
                    setSuccessMessage(data.data[0]);
                    setSuccessPop(true);
                    setNewRoommate("");
                }
            )
    }

    return (<>
            {!!errorPop &&
                <div onClick={closePopup} className={"inset-0 flex items-end justify-center fixed mb-2 "}>
                    <ErrorPop setErrorPop={setErrorPop} message={errorMessage}/>
                </div>}
            {!!successPop &&
                <div onClick={closePopup} className={"inset-0 flex items-end justify-center fixed mb-2"}>
                    <SuccessPop setSuccessPop={setSuccessPop} message={successMessage}/>
                </div>}
            <div className={`flex flex-col items-center`}>
                <form method={"post"} onSubmit={handleSubmit}
                      className={"py-2 flex flex-col items-center border rounded-md"}>
                    <label className={"px-2 text-amber-700"} htmlFor={"roommate"}>Add a new roommate</label>
                    <input
                        type={"text"}
                        name={"new_roommate"}
                        id={"roommate"}
                        value={newRoommate}
                        placeholder={"Roommate email"}
                        onChange={(e) => setNewRoommate(e.target.value)}
                        className={`border border-gray-300 rounded-lg p-2 m-2 focus:outline-none focus:ring focus:ring-amber-400 focus:ring-opacity-40 focus:border-indigo-500`}
                    />
                    <button type={"submit"} className={"px-3 py-1 bg-amber-600 text-white rounded-md hover:bg-amber-500"}>Add</button>
                </form>
            </div>
        </>
    )
}