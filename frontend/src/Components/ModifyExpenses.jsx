import {RoommatesList} from "./RoommatesList.jsx";
import {FeesList} from "./FeesList.jsx";
import {ExpendituresList} from "./ExpendituresList.jsx";
import {useOutletContext} from "react-router-dom";
import {FormModifyRoommates} from "./Forms/FormModifyRoommates.jsx";

export const ModifyExpenses = () => {
    const [roommates, setRoommates] = useOutletContext();
    return (
        <div className={`grid sm:grid-cols-3 `}>
            <div className={`flex flex-col items-center`}>
                <FormModifyRoommates ListClassName={''} roommates={roommates}/>
            </div>
            <hr className="sm:hidden my-6 border-2 border-gray-300 rounded-r-lg rounded-l-lg"/>
            <div className={`flex flex-col sm:border-l-2 sm:border-l-gray-300 items-center`}>
                <h1 className="font-semibold text-lg text-indigo-800 tracking-wide">Monthly fees
                    :</h1>
                {roommates.monthly_fees != null ?
                    <FeesList ListClassName={'text-center'} roommates={roommates}/> :
                    <p className="m-auto text-xl text-gray-500">No fees yet !</p>}
            </div>
            <hr className="sm:hidden my-6 border-2 border-gray-300 rounded-r-lg rounded-l-lg"/>
            <div className={`flex flex-col sm:border-l-2 sm:border-l-gray-300 items-center`}>
                <h1 className="font-semibold text-lg text-indigo-800 tracking-wide">Expenditures
                    :</h1>
                {roommates.expenditures != null ?
                    <ExpendituresList ListClassName={'text-center'} roommates={roommates}/> :
                    <p className="m-auto text-xl text-gray-500">No expenditures yet !</p>}
            </div>
        </div>
    )
}