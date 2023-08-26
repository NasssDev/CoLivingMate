import {useParams} from "react-router-dom";

export const ModalMessage = ({message, buttonName, setPopupConfirmDelete, handleAction}) => {

    const {id_flatshare} = useParams();

    const closeModal = () => {
        setPopupConfirmDelete(false);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-3">
            <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
            <div className="bg-white shadow-lg relative rounded-xl border border-yellow-500">
                <div className="flex p-4 items-center justify-center w-full bg-yellow-400 rounded-t-xl">
                    <svg className="w-9 h-9 text-white fill-current" viewBox="0 0 40 40"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20 3.333C10.8 3.333 3.333 10.8 3.333 20c0 9.2 7.467 16.667 16.667 16.667 9.2 0 16.667-7.467 16.667-16.667C36.667 10.8 29.2 3.333 20 3.333Zm1.667 25h-3.334V25h3.334v3.333Zm0-6.666h-3.334v-10h3.334v10Z"/>
                    </svg>
                </div>
                <div className={"px-6 pb-4"}>
                    <div className="w-full text-center text-xl font-semibold text-yellow-500 py-3">Warning !</div>
                    <p className="text-gray-600 text-lg">{message}</p>
                    <div className={"flex justify-evenly"}>
                        <button className="mt-4 ml-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                                onClick={closeModal}>
                            Cancel
                        </button>
                        <button className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                                onClick={() => handleAction()}>{buttonName}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}