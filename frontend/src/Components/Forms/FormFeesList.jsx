import {Trash2} from 'lucide-react';
import {useContext} from "react";
import {MessageStateContext, MyFlatsharesDetailsContext} from "../../Utils/Context.jsx";

export const FormFeesList = ({roommates, listClassName, currentUser}) => {

    const {setSuccessMessage, setSuccessPop, errorPop,setErrorPop} = useContext(MessageStateContext);
    const {setInfosModified} = useContext(MyFlatsharesDetailsContext);

    const handleDelete = (feeId) => {
        fetch(`http://localhost:1200/delete_month_fee?id=${feeId}}`)
            .then(res => res.json())
            .then(data => {
                    if (data.status !== 200) {
                        console.error('Error :', data.data[0]);
                        return;
                    }
                    setSuccessMessage(data.message);
                    setSuccessPop(true);
                    setInfosModified(current => !current);
                }
            )
    }

    return (<>
            <div className={`${listClassName} w-full p-2 rounded-md mx-auto lg:w-3/4 mt-2`}>
                {roommates?.map((roommate) => {
                    return <div
                        className={`font-semibold py-2 px-4 my-4 mx-2 border border-teal-500 bg-teal-50 rounded-lg`}
                        key={roommate.roommate_id}>
                        <h1>{roommate?.roommate_firstname + " " + roommate?.roommate_lastname + " : "}</h1>
                        {roommate?.monthly_fees.map(fee => {
                            return <form key={fee.fee_id}
                                         className={`font-normal text-sm text-teal-700 py-1`}>
                                <span>{fee.fee_name + " : " + fee.fee_amount + " € "}</span>

                                {currentUser?.roommate_role === 1 && <button type={"button"} onClick={() => {
                                    handleDelete(fee.fee_id);
                                }}
                                         className={"float-right p-0.5 text-red-500 hover:text-white rounded-md hover:bg-red-500"}>
                                    <Trash2 size={20} className={""}/>
                                </button>}
                            </form>
                        })}
                    </div>
                })}
            </div>
        </>
    )
}