import {Trash2} from "lucide-react";
import {useContext} from "react";
import {MessageStateContext, MyFlatsharesDetailsContext} from "../Utils/Context.jsx";
import {API_URL} from "../Constants/Constants.jsx";

export const ExpendituresList = ({roommates, listClassName, currentUser}) => {

    const {setSuccessMessage, setSuccessPop, setErrorMessage, setErrorPop} = useContext(MessageStateContext);
    const {setInfosModified} = useContext(MyFlatsharesDetailsContext);

    const handleDelete = (expenditureId) => {
        fetch(`${API_URL}delete_expenditure?expenditure_id=${expenditureId}}`)
            .then(res => res.json())
            .then(data => {
                    if (data.status !== 200) {
                        setErrorMessage(data.message);
                        setErrorPop(true);
                        return;
                    }
                    setSuccessMessage(data.message);
                    setSuccessPop(true);
                    setInfosModified(current => !current);
                }
            )
    }
    return (
        <ul className={`${listClassName} w-full p-2 rounded-md mx-auto lg:w-3/4  mt-2`}>
            {roommates?.map((roommate) => {
                return roommate?.expenditures !== null && <li
                    className={` font-semibold py-2 px-4 my-4 mx-2 border border-sky-500 bg-sky-50 rounded-lg`}
                    key={roommate.roommate_id}>{roommate?.roommate_firstname + " " + roommate?.roommate_lastname + " : "}
                    {roommate?.expenditures.map(expenditure => {
                        return <form key={expenditure.expenditure_id}
                                     className={`font-normal text-sm text-sky-700 py-1`}>
                            <span key={expenditure.expenditure_id}
                                  className={`font-normal text-sm text-sky-700`}>{expenditure.expenditure_name + " : " + expenditure.expenditure_amount.toFixed(2) + " €"}</span>
                            {
                                currentUser?.roommate_role === 1 &&
                                <button type={"button"} onClick={() => {
                                    handleDelete(expenditure.expenditure_id);
                                }} className={"float-right p-0.5 text-red-500 hover:text-white rounded-md hover:bg-red-500"}>
                                    <Trash2 size={20} className={""}/>
                                </button>
                            }
                        </form>
                    })}
                </li>
            })}
        </ul>
    )
}