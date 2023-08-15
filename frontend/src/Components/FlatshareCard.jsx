export const FlatshareCard = ({ flatshare }) => {
    return (
        <div className="bg-indigo-100 rounded-lg shadow-lg p-4 my-4">
            <h3 className="font-semibold text-lg tracking-wide">{flatshare.name}</h3>
            <p className="text-gray-500">{flatshare.address+" - "+flatshare.city+" - "+flatshare.zip_code} </p>
            <div className="mt-4">
                <span className="text-gray-700">Created at: </span>
                <span className="text-gray-500">{flatshare.start_date}</span>
            </div>
        </div>
    )
}