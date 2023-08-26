import {FeesList} from "./FeesList.jsx";
import {ExpendituresList} from "./ExpendituresList.jsx";
import {ManagementFormRoommates} from "./Forms/ManagementFormRoommates.jsx";

export const ModifyExpenses = ({roommates}) => {
    return (
        <div className={`grid sm:grid-cols-3 `}>
            <div id={"roommatesManager"} className={`flex flex-col items-center`}>
                <ManagementFormRoommates />
            </div>
            <hr className="sm:hidden my-6 border-2 border-gray-300 rounded-r-lg rounded-l-lg"/>
            <div id={"FeesManager"} className={`flex flex-col sm:border-l-2 sm:border-l-gray-300 items-center`}>

            </div>
            <hr className="sm:hidden my-6 border-2 border-gray-300 rounded-r-lg rounded-l-lg"/>
            <div id={"ExpendituresManager"} className={`flex flex-col sm:border-l-2 sm:border-l-gray-300 items-center`}>

            </div>
        </div>
    )
}