import {useContext, useState} from "react";
import {MessageStateContext, MyFlatsharesDetailsContext} from "../../Utils/Context.jsx";

export const ManagementFormFees = ({roommates, setRoommates, id_flatshare}) => {

    const {
        setSuccessPop,
        setErrorPop,
        setErrorMessage,
        setSuccessMessage
    } = useContext(MessageStateContext);

    const {setInfosModified} = useContext(MyFlatsharesDetailsContext);

    const [newFee, setNewFee] = useState({
        fee_name: "",
        fee_amount: "",
        fee_date: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:1200/create_month_fee?id_flatshare=${id_flatshare}&fee_name=${newFee.fee_name}&fee_amount=${newFee.fee_amount}&fee_date=${newFee.fee_date}`)
            .then(res => res.json())
            .then(data => {
                    if (data.status !== 200) {
                        console.error('Error during creation of fee ');
                        return;
                    }
                    setNewFee({
                        fee_name: "",
                        fee_amount: "",
                        fee_date: ""
                    })
                    setSuccessMessage(data.message);
                    setSuccessPop(true);
                    setInfosModified(current => !current);
                }
            )
    }

    const handleChange = (e) => {
        setNewFee(current => ({
            ...current,
            [e.target.name]: e.target.value
        }))
    }

    return (<>
            <div className={`flex flex-col items-center px-2`}>
                <form method={"post"} onSubmit={handleSubmit}
                      className={"py-2 flex flex-col items-center border rounded-md"}>
                    <h1 className={"px-2 text-teal-700"}>Create a new fee</h1>
                    <div className={"px-1 flex flex-row items-center"}>
                        <div className={"px-1"}>
                            <input
                                required
                                type={"text"}
                                name={"fee_name"}
                                id={"feename"}
                                value={newFee.fee_name}
                                placeholder={"Name"}
                                onChange={handleChange}
                                className={`w-full border border-gray-300 rounded-lg p-2 my-2 focus:outline-none focus:ring focus:ring-teal-400 focus:ring-opacity-40 focus:border-indigo-500`}
                            />
                        </div>
                        <div className={"px-1"}>
                            <input
                                required
                                type={"number"}
                                min={1}
                                name={"fee_amount"}
                                id={"feeamount"}
                                value={newFee.fee_amount}
                                placeholder={"Amount"}
                                onChange={handleChange}
                                className={`w-full border border-gray-300 rounded-lg p-2 my-2 focus:outline-none focus:ring focus:ring-teal-400 focus:ring-opacity-40 focus:border-indigo-500`}
                            />
                        </div>
                        <div className={"px-1"}>
                            <input
                                required
                                type={"text"}
                                inputMode={"numeric"}
                                pattern="^(0?[1-9]|1\d|2[0-8])$"
                                title="Day between 1 and 28."
                                name={"fee_date"}
                                id={"feedate"}
                                value={newFee.fee_date}
                                placeholder={"Day"}
                                onChange={handleChange}
                                className={`w-full border border-gray-300 rounded-lg p-2 my-2 focus:outline-none focus:ring focus:ring-teal-400 focus:ring-opacity-40 focus:border-indigo-500`}
                            />
                        </div>
                    </div>
                    <button type={"submit"}
                            className={"px-3 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-500"}>Create
                    </button>
                </form>
            </div>
        </>
    )
}