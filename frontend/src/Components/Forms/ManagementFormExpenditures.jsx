import {useContext, useState} from "react";
import {MessageStateContext, MyFlatsharesDetailsContext} from "../../Utils/Context.jsx";
import {API_URL} from "../../Constants/Constants.jsx";

export const ManagementFormExpenditures = ({ id_flatshare}) => {

    const {
        setSuccessPop,
        setErrorPop,
        setErrorMessage,
        setSuccessMessage
    } = useContext(MessageStateContext);

    const {setInfosModified} = useContext(MyFlatsharesDetailsContext);

    const [newExpenditure, setNewExpenditure] = useState({
        expenditure_name: "",
        expenditure_amount: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API_URL}create_expenditure?id_flatshare=${id_flatshare}&id_creator=${sessionStorage.userId}&expenditure_name=${newExpenditure.expenditure_name}&amount=${newExpenditure.expenditure_amount}`)
            .then(res => res.json())
            .then(data => {
                    if (data.status !== 200) {
                        setErrorMessage(data.message);
                        setErrorPop(true);
                        return;
                    }
                    setNewExpenditure({
                        expenditure_name: "",
                        expenditure_amount: "",
                    })
                    setSuccessMessage(data.message);
                    setSuccessPop(true);
                    setInfosModified(current => !current);
                }
            )
    }

    const handleChange = (e) => {
        setNewExpenditure(current => ({
            ...current,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className={`flex flex-col items-center px-2`}>
            <form method={"post"} onSubmit={handleSubmit}
                  className={"py-2 flex flex-col items-center border rounded-md"}>
                <h1 className={"px-2 text-sky-700"}>Create a new Expenditure</h1>
                <div className={"px-1 flex flex-row items-center"}>
                    <div className={"px-1"}>
                        <input
                            required
                            type={"text"}
                            name={"expenditure_name"}
                            id={"expenditurename"}
                            value={newExpenditure.expenditure_name}
                            placeholder={"Name"}
                            onChange={handleChange}
                            className={`w-full border border-gray-300 rounded-lg p-2 my-2 focus:outline-none focus:ring focus:ring-sky-400 focus:ring-opacity-40 focus:border-sky-500`}
                        />
                    </div>
                    <div className={"px-1"}>
                        <input
                            required
                            type={"number"}
                            min={1}
                            name={"expenditure_amount"}
                            id={"expenditureamount"}
                            value={newExpenditure.expenditure_amount}
                            placeholder={"Amount"}
                            onChange={handleChange}
                            className={`w-full border border-gray-300 rounded-lg p-2 my-2 focus:outline-none focus:ring focus:ring-sky-400 focus:ring-opacity-40 focus:border-sky-500`}
                        />
                    </div>
                </div>
                <button type={"submit"}
                        className={"px-3 py-1 bg-sky-600 text-white rounded-md hover:bg-sky-500"}>Create
                </button>
            </form>
        </div>
    )
}