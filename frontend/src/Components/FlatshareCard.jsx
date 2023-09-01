import {Link} from "react-router-dom";
import {useContext} from "react";
import {ImageLoaderContext} from "../Utils/Context.jsx";

export const FlatshareCard = ({flatshare}) => {

    const {imageLoaded,initLoader} = useContext(ImageLoaderContext);

    initLoader(`https://source.unsplash.com/400x200/?house,${flatshare.name}`);

    return (
        <div className="bg-white rounded-lg shadow-lg my-4 w-full max-w-sm">
            <Link to={`/flatshare/${flatshare.id}`}>
                {!!imageLoaded ?
                    <img src={`https://source.unsplash.com/400x200/?house,${flatshare.name}`} alt="house"
                       className=" rounded-t-lg"/>
                :
                    <div className="animate-pulse bg-gray-300 rounded-t-lg w-full h-[200px]"></div>
                }
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
                        <span className="text-gray-400">{flatshare.roommate_count}</span>
                        <span className="text-gray-600">/6</span>
                    </div>
                </div>
            </div>
        </div>
    )
}