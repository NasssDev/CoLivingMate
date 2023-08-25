export const ModalMessage = ({message, buttonName, setConfirmDelete, handleAction}) => {

    const closeModal = () => {
        setConfirmDelete(false);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
            <div className="bg-white shadow-lg p-6 relative rounded-2xl">
                <p className="text-gray-600">{message}</p>
                <div className={"flex justify-between"}>
                    <button className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                            onClick={handleAction}>{buttonName}</button>
                    <button className="mt-4 ml-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                            onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}