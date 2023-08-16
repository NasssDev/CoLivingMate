import {Link} from "react-router-dom";

export const FlatshareCard = ({flatshare}) => {

    return (
        <div className="bg-indigo-50 rounded-lg shadow-lg my-4 w-full max-w-sm">
            <Link to={`/flatshare/${flatshare.id}`}>
                <img src={`https://source.unsplash.com/400x200/?house,${flatshare.name}`} alt="house"
                     className=" rounded-t-lg"/>
            </Link>
            <div className={"px-4 py-2"}>
                <h3 className="font-semibold text-lg tracking-wide">{flatshare.name}</h3>
                <p className="text-gray-500">{flatshare.address + " - " + flatshare.city + " - " + flatshare.zip_code} </p>
                <div className="mt-4 flex justify-between">
                    <div>
                        <span className="text-gray-700">From: </span>
                        <span className="text-gray-500">{flatshare.start_date}</span>
                    </div>
                    <div>
                        <img src="/img/roommate.svg" alt="roommate" className="w-6 h-6 rounded-full float-left mr-2"/>
                        <span className="text-gray-400">{Math.floor(Math.random() * 5) + 1}</span>
                        <span className="text-gray-600">/6</span>
                    </div>
                </div>
            </div>
        </div>
    )
}